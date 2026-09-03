import {cache} from "react";
import {notFound} from "next/navigation";
import type {Metadata} from "next";
import {createClient} from "@/lib/supabase/server";
import PublicProfilePage from "@/components/sectional/UserSectionals/PublicProfilePage";




//----- Cached data fetcher for the profile page -----//
const getProfile = cache(async (username: string) => {
    const supabase = await createClient();
    const {data} = await supabase
        .from('profiles')
        .select('*, links(*)')
        .eq('username', username)
        .order('sort_order', {referencedTable: 'links'})
        .single()

    return data
})

//--------- Types ----------------------------------//
interface Props {
    params: Promise <{username: string}>
}

//---- SEO Metadata---------------------------------------//
export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {username: rawUsername} = await params
    const username = rawUsername.toLowerCase()
    const profile = await getProfile(username)

    if (!profile) return {title: 'Profile not Found | Knotted'}

    const displayName = profile.display_name || profile.username

    return {
        title: `${displayName} | Knotted`,
        description: profile.bio || `Check out ${displayName}'s Knotted page.`,
        openGraph: {
            title: `${displayName} | Knotted`,
            description: profile.bio || `Check out ${displayName}'s Knotted page.`,
            images: profile.avatar_url ? [profile.avatar_url] : [],
        },
    }
}

//------- Page Components ----------------------------------//
export default async function PublicProfile({params}: Props) {

    const { username: rawUsername } = await params
    const username = rawUsername.toLowerCase()

    const profile = await getProfile(username)

    if (!profile) notFound()

    const supabase = await createClient()
    const {data: {user}} = await supabase.auth.getUser()

    if (!user || user.id !== profile.id){
        try {
            await supabase.rpc("increment_profile_view", {profile_id_input:profile.id})
        }catch (err){
            console.error('Failed to increment profile view:', err)
        }
    }

    // ── Filter active links ────────────────────────────────────────────────────
    // RLS handles this for anonymous visitors automatically — but the owner
    // visiting their own public page while signed in would see all links
    // through RLS (including inactive ones). Filtering explicitly here
    // guarantees the public view always shows only active links, regardless
    // of who's visiting.
    const activeLinks = profile.links
        .filter((link) => link.is_active)
        .map((link) => ({
            id:    link.id,
            title: link.title,
            href:  link.url,
            // icon and highlighted not yet supported — post-MVP feature
        }))

    return(
            <PublicProfilePage
                name={profile.display_name || profile.username}
                username={`@${username}`}
                bio={profile.bio || undefined}
                avatarSrc={profile.avatar_url || undefined}
                links={activeLinks}
                showBranding={profile.role === 'free'}
            />
    )
}