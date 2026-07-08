import { createClient} from '@/lib/supabase/server'
import {request} from "node:http";

//PATCH /api/profile/avatar -> This updates the profile row with the user's avatar

export async function PATCH(request: Request) {
    const supabase = await createClient()
//================== Authenticate the user ======================

    const {
        data: {user},
        error: authError
    } = await supabase.auth.getUser()

    if (authError || !user) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
//================== Parse the resqueted body======================
    let body: { avatarUrl?: unknown }

    try{
        body = await request.json()
    }catch {
        return Response.json({ error: 'Invalid request body' }, { status: 400 })
    }

//==========================Validate=================================
    const {avatarUrl} = body

    if (!avatarUrl || typeof avatarUrl !== 'string' || avatarUrl.trim() === '') {
        return Response.json(
            { error: 'avatarUrl must be a non-empty string' },
            { status: 400 }
        )
    }

//==========================Update the url=================================
    const {data: updatedProfile, error:updateError} = await supabase
        .from('profiles')
        .update({avatar_url: avatarUrl.trim()})
        .eq('id', user.id)
        .select('avatar_url')
        .single()

    if (updateError || !updatedProfile) {
        console.error('[PATCH /api/profile/avatar] Update failed:', updateError)
        return Response.json(
            { error: 'Could not update avatar' },
            { status: 500 }
        )
    }

//======================== Response==============================
    return Response.json({ success: true, avatarSrc: updatedProfile.avatar_url})

}
