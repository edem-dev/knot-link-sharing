import {createClient} from "@/lib/supabase/server";
import {createAdminClient} from "@/lib/supabase/admin";
import {request} from "node:http";

export async function DELETE(request: Request){
    const supabase = await createClient()

    // ======== Authenticate the user ======================
    const {
        data:{user},
        error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user){
        return Response.json({error: 'Unauthorized'}, {status: 401})
    }

//     validate the request body
    let body: { confirmUsername?: string }
    try {
        body = await request.json()
    } catch {
        return Response.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single()

    if (profileError || !profile) {
        return Response.json({ error: 'Profile not found' }, { status: 404 })
    }

    if (body.confirmUsername !== profile.username) {
        return Response.json(
            { error: 'Confirmation text did not match your username' },
            { status: 400 }
        )
    }

//     ============Admin client=====================
    const admin = createAdminClient()
    //========Step 1: Clean up avatar ================//
    const {data:avatarFiles} = await admin.storage
        .from('avatars')
        .list(user.id)

    if (avatarFiles && avatarFiles.length > 0){
        const paths = avatarFiles.map((file)=>`${user.id}/${file.name}`)
        const {error: removeError} = await admin.storage
            .from('avatars')
            .remove(paths)

        if (removeError){
            console.error('[account deletion] avatar clean up failed:', removeError)
        }
    }

    //=========Step 2: delete entire profile row of user=======//
    const { error: deleteProfileError } = await admin
        .from('profiles')
        .delete()
        .eq('id', user.id)

    if (deleteProfileError) {
        return Response.json(
            { error: 'Could not delete profile data' },
            { status: 500 }
        )
    }

    //=========Step 3: delete the auth user no return=======//
    const { error: deleteUserError } = await admin.auth.admin.deleteUser(user.id)

    if (deleteUserError) {
        // Profile data is already gone but the auth user survived — an
        // inconsistent state. Log loudly; this needs manual follow-up.
        console.error('[account deletion] auth user deletion failed:', deleteUserError.message)
        return Response.json(
            {
                error:
                    'Account data was removed but sign-in could not be fully deleted. Contact support.',
            },
            { status: 500 }
        )
    }

    return Response.json({ success: true })
}