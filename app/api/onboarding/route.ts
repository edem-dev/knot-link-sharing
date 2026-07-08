import {NextRequest} from "next/server";
import {createClient} from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
    const supabase = await createClient();


//----------------------------Authenticate ------------------------//
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if(authError || !user){
        return Response.json(
            { error: 'You must be logged in to claim this username' },
            { status: 401 }
        )
    }

//------------------------- Parse the body-----------------------------//
    let body:{username?:string}
    try {
        body = await request.json()
    }catch {
        return Response.json({error: 'Invalid request body'}, {status: 400})
    }

//-----------------------Normalize and Validate -----------------------//
    const username = body.username?.toLowerCase().trim() ?? ''

    if (
        username.length < 3 ||
        username.length > 30 ||
        !/^[a-z0-9_-]+$/.test(username)
    ){
        return Response.json({error: 'Invalid username format'}, {status: 400})
    }

//---------------------- Idempotency check--------------------------------//
    const {data: existingProfile} = await supabase
        .from('profiles')
        .select('username')
        .eq('id',user.id)
        .maybeSingle()

    if (existingProfile){
        return Response.json({success:true, username: existingProfile.username})
    }
    //-----------------------Pre-fill avatar url ---------------------//
    const displayName = (user.user_metadata?.full_name as string | undefined) ?? ''
    const avatarUrl   = (user.user_metadata?.avatar_url as string | undefined) ?? ''

//---------------------- Insert the new user profiles -------------//
    const {error: insertError} = await supabase.from('profiles').insert({
        id: user.id,
        username,
        display_name: displayName,
        avatar_url: avatarUrl,
    })

    if (insertError){
        if (insertError.code === '23505'){
            return Response.json({error: 'This username is already taken'}, {status: 409})
        }
        console.error(
            'Error inserting new profile:',
            insertError.message
        )
        return Response.json({error: 'Something went wrong when saving your profile'}, {status: 500})
    }

//-------------------Mark onboarding to be done---------------------//
    await supabase.auth.updateUser({
        data: {onboarding_complete: true},
    })

    return Response.json({ success: true, username }, { status: 201 })
}