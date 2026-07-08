import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
    // This response object is what we eventually return. Supabase may need
    // to attach refreshed cookies to it, so we build it up as we go.
    let supabaseResponse = NextResponse.next({ request })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    // Mirror any cookie writes onto both the incoming request
                    // (so this same request sees the updated session) and onto
                    // the outgoing response (so the browser receives it).
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    )
                    supabaseResponse = NextResponse.next({ request })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // CRITICAL: do not add logic between createServerClient and getUser().
    // getUser() both validates the session against Supabase and refreshes
    // the access token cookie if it's near expiry. Skipping this call is
    // the most common cause of users being randomly logged out.
    const {
        data: { user },
    } = await supabase.auth.getUser()

    const { pathname } = request.nextUrl

    const isProtectedPath =
        pathname.startsWith('/dashboard') || pathname.startsWith('/onboarding')

    // ── Rule 1 — no session, trying to reach a protected route ──────────────
    if (isProtectedPath && !user) {
        const url = request.nextUrl.clone()
        url.pathname = '/signin'
        return NextResponse.redirect(url)
    }

    // ── Rule 2 — has a session, route based on onboarding status ────────────
    // TEMPORARY: reads the user_metadata flag set after username claim.
    // Once the `profiles` table exists (Phase 2), this should instead check
    // for the existence of a profiles row — the metadata flag is a stand-in
    // until then, since it lives on the same Supabase auth user object.
    if (user) {
        const onboardingComplete = user.user_metadata?.onboarding_complete === true

        if (pathname.startsWith('/dashboard') && !onboardingComplete) {
            const url = request.nextUrl.clone()
            url.pathname = '/onboarding'
            return NextResponse.redirect(url)
        }

        if (pathname.startsWith('/onboarding') && onboardingComplete) {
            const url = request.nextUrl.clone()
            url.pathname = '/dashboard'
            return NextResponse.redirect(url)
        }
    }

    return supabaseResponse
}

export const config = {
    // Run on everything except static assets and Next.js internals —
    // matcher syntax is unchanged from the old middleware.ts convention.
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}