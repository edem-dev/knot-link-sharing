import {createClient} from '@/lib/supabase/server'

//Write the GET function to get the api request.

export async function GET() {
    const supabase = await createClient()

// Authenticate------------------------------------------
    const {
        data:{user},
        error: authError
    } = await supabase.auth.getUser()

    if(authError || !user){
        return Response.json(
            {error: 'Unathorized'},
            {status:401})
    }

// Fetch profile + Links
    const { data:profile, error:profileError} = await supabase
        .from('profiles')
        .select('*, links(*)')
        .eq('id', user.id)
        .order('sort_order', {referencedTable: 'links'})
        .single()

//     Autheniticate and vaidate
    if (profileError || !profile){
        return Response.json(
            {error: ' Profile not found'},
            {status: 401}
        )
    }

//  Map the DB shap to the UI shape
    return Response.json({
        name: profile.display_name,
        bio: profile.bio,
        username: profile.username,
        avatarSrc: profile.avatar_url,
        role: profile.role,
        links: profile.links.map((link) =>({
            id:link.id,
            title: link.title,
            url: link.url
        }))
    })
}

//Write the PUT function to get the api request.
// ── PUT /api/profile ─────────────────────────────────────────────────────────
// Bulk publish — replaces the full profile + links array in one request.
// Called when the user clicks "Publish Changes" in the dashboard.
export async function PUT(request: Request){
    const supabase = await createClient()

//     Authenticate -----------------------
    const {
        data: {user},
        error: authError
    } = await supabase.auth.getUser()

    if (authError || ! user){
        return Response.json(
            {error:'Unauthorized'},
            {status:401}
        )
    }

//     Parse the body to the right format------------------------------
    let body:{
        name?:string
        bio?:string
        links?: {id:string; title: string; url: string}[]
    }

    try {
        body = await  request.json()
    }catch {
        return Response.json({error: ' Invalid request format/body'}, {status: 401})
    }

    const {name = '', bio = '', links = [] } = body

// Validate -------------------------------------------------
    if (typeof name !== 'string' || name.length > 60) {
        return Response.json(
            { error: 'Display name must be 60 characters or fewer' },
            { status: 400 }
        )
    }

    if (typeof bio !== 'string' || bio.length > 160) {
        return Response.json(
            { error: 'Bio must be 160 characters or fewer' },
            { status: 400 }
        )
    }

    if (!Array.isArray(links)) {
        return Response.json({ error: 'Links must be an array' }, { status: 400 })
    }

//     Update profile fields -----------------------------------
    // Only display_name and bio — username and role are not editable here.
    const { error: profileError } = await supabase
        .from('profiles')
        .update({
            display_name: name.trim(),
            bio:          bio.trim(),
        })
        .eq('id', user.id)

    if (profileError){
        return Response.json({ error: 'Could not update profile' }, { status: 500 })
    }

// Delete all existing links------------------
    const { error: deleteError } = await supabase
        .from('links')
        .delete()
        .eq('profile_id', user.id)

    if (deleteError) {
        return Response.json({ error: 'Could not update links' }, { status: 500 })
    }

    // Insert new links ---------------------------
    if (links.length > 0) {
        const linksToInsert = links.map((link, index) => ({
            profile_id: user.id,
            title: link.title.trim(),
            url: link.url.trim(),
            sort_order: index,
            // DELIBERATELY no `id` field — we let gen_random_uuid() generate
            // fresh IDs. The client-side `id` in the payload is a temporary
            // React key, not a database identity we want to preserve.
        }))

        const {error: insertError} = await supabase
            .from('links')
            .insert(linksToInsert)

        if (insertError) {
            return Response.json({error: 'Could not save links'}, {status: 500})
        }
    }

    return Response.json({success: true})
}