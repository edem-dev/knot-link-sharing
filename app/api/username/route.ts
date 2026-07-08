import {NextRequest} from 'next/server'
import {createClient} from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
    const raw = request.nextUrl.searchParams.get('username')

// Normalize the user's input to lowercase
    const username = raw?.toLowerCase().trim() ?? ''

// Validate the input before touching the database.
    if (username.length < 3) {
        return Response.json(
            { available: false, error: 'Too short — minimum 3 characters' },
            { status: 400 }
        )
    }
    if (username.length > 30) {
        return Response.json(
            { available: false, error: 'Too long — maximum 30 characters' },
            { status: 400 }
        )
    }
    if (!/^[a-z0-9_-]+$/.test(username)) {
        return Response.json(
            { available: false, error: 'Only letters, numbers, _ and - allowed' },
            { status: 400 }
        )
    }

//     Check the database
    const supabase = await createClient()

    const {data, error} = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .maybeSingle()

    if(error){
        return Response.json(
            { available: false, error: 'Something went wrong when checking availability' },
            { status: 500 }
        )
    }
//     Data is null-> No one owns this username-> No one owns it
return Response.json({ available: data === null })
}