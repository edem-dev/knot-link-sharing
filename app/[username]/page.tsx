// app/[username]/page.tsx
import { notFound } from 'next/navigation'
import connectDB from '@/lib/mongodb'
import User from '@/lib/models/User'
// import { PublicProfilePage } from '@/components/sectional/PublicProfilePage'
import PublicProfilePage from "@/components/sectional/UserSectionals/PublicProfilePage";

export default async function PublicProfile({
                                                params,
                                            }: {
    params: Promise<{ username: string }>  // ← now a Promise
}) {
    const { username } = await params       // ← must be awaited

    await connectDB()

    const user = await User
        .findOne({ username: username.toLowerCase() })
        .lean()

    if (!user) notFound()

    const typedUser = user as {
        displayName: string
        username:    string
        role:        string
        bio:         string
        avatarUrl:   string
        links:       { _id: any; title: string; url: string; order: number; isActive: boolean }[]
    }

    return (
        <PublicProfilePage
            name={typedUser.displayName || typedUser.username}
            tagline={typedUser.role}
            bio={typedUser.bio}
            avatarSrc={typedUser.avatarUrl}
            links={typedUser.links
                .filter(l => l.isActive)
                .sort((a, b) => a.order - b.order)
                .map(link => ({
                    id:    link._id.toString(),
                    title: link.title,
                    href:  link.url,
                }))}
            showBranding={typedUser.role === 'free'}
            stats={{
                likes:  '0',
                shares: '0',
            }}
        />
    )
}

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ username: string }>  // ← now a Promise
}) {
    const { username } = await params       // ← must be awaited

    await connectDB()
    const user = await User
        .findOne({ username: username.toLowerCase() })
        .lean() as { displayName?: string; bio?: string } | null

    if (!user) return { title: 'Not found | Knotted' }

    return {
        title:       `${user.displayName || username} | Knotted`,
        description: user.bio || `Check out ${username}'s Knotted page.`,
    }
}