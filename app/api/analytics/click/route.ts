import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// PUBLIC route — anonymous visitors call this when they click a link on
// someone else's profile. Does NOT need proxy.ts protection, and must
// stay OFF the protected-routes matcher there — same category as
// GET /api/username.
export async function POST(request: NextRequest) {
    let body: { linkId?: string }
    try {
        body = await request.json()
    } catch {
        return Response.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const linkId = body.linkId
    if (!linkId || typeof linkId !== 'string') {
        return Response.json({ error: 'linkId is required' }, { status: 400 })
    }

    const supabase = await createClient()

    // Look up the REAL profile_id — public SELECT via the existing "public
    // read" RLS policy on `links`. This is what stops a bad-faith caller
    // from POSTing an arbitrary profile_id and polluting someone else's stats.
    const { data: link, error: linkError } = await supabase
        .from('links')
        .select('id, profile_id')
        .eq('id', linkId)
        .maybeSingle()

    if (linkError || !link) {
        // Best-effort analytics, not a critical operation — a bad linkId
        // shouldn't surface as a loud error to a public visitor.
        return Response.json({ recorded: false }, { status: 200 })
    }

    const { error: insertError } = await supabase
        .from('link_clicks')
        .insert({ link_id: link.id, profile_id: link.profile_id })

    if (insertError) {
        console.error('[analytics/click] insert failed:', insertError.message)
        return Response.json({ recorded: false }, { status: 200 })
    }

    return Response.json({ recorded: true })
}