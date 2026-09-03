// app/auth/callback/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            // Code exchanged successfully — session cookie is now set.
            // Fetch the user to check their onboarding flag.
            const { data: { user } } = await supabase.auth.getUser()

            const isOnboarded = user?.user_metadata?.onboarding_complete === true

            const destination = isOnboarded ? '/dashboard' : '/onboarding'

            return NextResponse.redirect(`${origin}${destination}`)
        }
    }

    // Code missing or exchange failed — send back to sign-in with an error flag
    return NextResponse.redirect(`${origin}/signin?error=auth-failed`)
}