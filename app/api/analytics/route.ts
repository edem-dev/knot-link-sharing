import { createClient } from '@/lib/supabase/server'

// PROTECTED — owner-only. Feeds the dashboard AnalyticsPanel.
export async function GET() {
    const supabase = await createClient()

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('view_count')
        .eq('id', user.id)
        .single()

    if (profileError || !profile) {
        return Response.json({ error: 'Profile not found' }, { status: 404 })
    }

    // link_clicks(count) — PostgREST's embedded-resource aggregate syntax,
    // via the FK from link_clicks.link_id → links.id. Returns [{ count: N }]
    // per link, computed server-side rather than fetching every click row.
    // Includes inactive links too — historical performance is still useful
    // to the owner even for a link they've since hidden.
    const { data: links, error: linksError } = await supabase
        .from('links')
        .select('id, title, link_clicks(count)')
        .eq('profile_id', user.id)
        .order('sort_order')

    if (linksError) {
        return Response.json({ error: 'Could not load link stats' }, { status: 500 })
    }

    const linkStats = (links ?? []).map((link) => ({
        id:     link.id,
        title:  link.title,
        clicks: link.link_clicks?.[0]?.count ?? 0,
    }))

    const totalClicks = linkStats.reduce((sum, l) => sum + l.clicks, 0)

    return Response.json({
        totalViews: profile.view_count,
        totalClicks,
        links: linkStats.sort((a, b) => b.clicks - a.clicks),
    })
}