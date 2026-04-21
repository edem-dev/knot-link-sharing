// app/api/profile/avatar/route.ts
import { auth } from '@clerk/nextjs/server'
import connectDB from '@/lib/mongodb'
import User from '@/lib/models/User'

// PATCH /api/profile/avatar
// Updates only the avatar URL after a successful Cloudinary upload.
// This is separate from PUT /api/profile because avatar uploads happen
// immediately on file select — independent of the "Publish Changes" flow.
export async function PATCH(req: Request) {
    const { userId } = await auth()
    if (!userId) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { avatarUrl } = await req.json() as { avatarUrl: string }

    if (!avatarUrl || typeof avatarUrl !== 'string') {
        return Response.json({ error: 'avatarUrl is required' }, { status: 400 })
    }

    await connectDB()

    await User.findOneAndUpdate(
        { clerkUserId: userId },
        { $set: { avatarUrl } }
    )

    // Return as avatarSrc so the UI can directly update its state:
    // const { avatarSrc } = await res.json()
    // setAvatarSrc(avatarSrc)
    return Response.json({ success: true, avatarSrc: avatarUrl })
}