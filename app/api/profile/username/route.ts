import { NextRequest} from "next/server";
import {createClient} from "@/lib/supabase/server";

export async function PATCH(request: NextRequest){
    const supabase = await createClient()

//     Authenticate
    const {
        data: {user},
        error: authError,
    } = await supabase.auth.getUser()

    if(!user || authError){
        return Response.json({eror:"Unauthorized"}, {status: 401})
    }

//     Parse the body of the response
    let body: {username?: string}
    try {
        body = await request.json()
    }catch {
        return Response.json({error: "Invalid Request body"},{status: 400})
    }

    const raw = body.username
    const username = raw?.toLowerCase().trim() ?? ''

//     Validate
    if (username.length < 3) {
        return Response.json(
            { error: 'Too short — minimum 3 characters' },
            { status: 400 }
        )
    }
    if (username.length > 30) {
        return Response.json(
            { error: 'Too long — maximum 30 characters' },
            { status: 400 }
        )
    }
    if (!/^[a-z0-9_-]+$/.test(username)) {
        return Response.json(
            { error: 'Only letters, numbers, _ and - allowed' },
            { status: 400 }
        )
    }

//     Update the username is "unique" constraint on user profiles
    const { data, error } = await supabase
        .from('profiles')
        .update({ username })
        .eq('id', user.id)
        .select('username')
        .single()

    if (error) {
        if (error.code === '23505') {
            return Response.json(
                { error: 'That username is already taken' },
                { status: 409 }
            )
        }
        return Response.json(
            { error: 'Could not update username' },
            { status: 500 }
        )
    }

    return Response.json({username:data.username})
}