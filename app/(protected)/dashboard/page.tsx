import { createClient } from '@/lib/supabase/server'
import { redirect }     from 'next/navigation'
import DashboardClient  from '@/components/sectional/DashboardSectionals/DashboardClient'

// SERVER COMPONENT — queries Supabase directly before any HTML is sent.
// Cannot define event handlers or use hooks — DashboardClient owns those.




export default async function DashboardPage() {
    const supabase = await createClient()

    // ── Verify session ────────────────────────────────────────────────────────
    // getUser() re-validates against Supabase Auth — not just the cookie value.
    // proxy.ts should have already redirected unauthenticated users, but this
    // is a second, server-authoritative check.
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) redirect('/signin')

    // ── Fetch profile + links in one round trip ───────────────────────────────
    const { data: profile } = await supabase
        .from('profiles')
        .select('*, links(*)')
        .eq('id', user.id)
        .order('sort_order', { referencedTable: 'links' })
        .single()

    // Authenticated but no profile row — onboarding was never completed.
    // proxy.ts catches most of these via the metadata flag, but the database
    // row is the authoritative source.
    if (!profile) redirect('/onboarding')

    // ── Map DB shape → UI shape ───────────────────────────────────────────────
    // display_name → name,  avatar_url → avatarSrc
    // email comes from auth user (not stored in profiles table)
    // bio was missing from the original version — added here
    const initialProfile = {
        name:      profile.display_name,
        bio:       profile.bio,
        email:     user.email ?? '',
        avatarSrc: profile.avatar_url,
        role:      profile.role as 'free' | 'pro',
    }

    const initialLinks = profile.links.map((link) => ({
        id:       link.id,
        title:    link.title,
        url:      link.url,
        isActive: true,
    }))

    // onPublish is intentionally NOT passed here — DashboardClient
    // defines it itself as a fetch() call to PUT /api/profile.
    return (
        <DashboardClient
            initialProfile={initialProfile}
            initialLinks={initialLinks}
            username={profile.username}
        />
    )
}