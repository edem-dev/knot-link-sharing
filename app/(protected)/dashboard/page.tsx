// app/(protected)/dashboard/page.tsx
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import connectDB from '@/lib/mongodb'
import User from '@/lib/models/User'
import DashboardClient from '@/components/sectional/DashboardSectionals/DashboardClient'

export default async function DashboardPage() {
    const { userId } = await auth()
    if (!userId) redirect('/sign-in')

    await connectDB()
    const user = await User.findOne({ clerkUserId: userId }).lean()
    if (!user) redirect('/username')

    const typedUser = user as {
        displayName: string
        bio:         string
        role:        string
        avatarUrl:   string
        username:    string
        links:       { _id: any; title: string; url: string; order: number }[]
    }

    const initialProfile = {
        name:      typedUser.displayName,
        bio:       typedUser.bio,
        role:      typedUser.role,
        avatarSrc: typedUser.avatarUrl,
    }

    const initialLinks = typedUser.links
        .sort((a, b) => a.order - b.order)
        .map(link => ({
            id:    link._id.toString(),
            title: link.title,
            url:   link.url,
        }))

    async function handlePublish({
                                     name,
                                     bio,
                                     links,
                                 }: {
        name:  string
        bio:   string
        links: { id: string; title: string; url: string }[]
    }) {
        'use server'

        const { userId } = await auth()
        if (!userId) return

        const linksWithOrder = links.map((link, index) => ({
            title: link.title,
            url:   link.url,
            order: index,
        }))

        await connectDB()
        await User.findOneAndUpdate(
            { clerkUserId: userId },
            { $set: { displayName: name, bio, links: linksWithOrder } },
            { new: true }
        )

        revalidatePath('/dashboard')
        revalidatePath(`/${typedUser.username}`)
    }

    const headersList = await headers()
    const userAgent   = headersList.get('user-agent') ?? ''
    const isMobile    = /mobile|android|iphone|ipad/i.test(userAgent)

    return (
        <DashboardClient
            initialProfile={initialProfile}
            initialLinks={initialLinks}
            username={typedUser.username}
            isMobile={isMobile}
            onPublish={handlePublish}
        />
    )
}