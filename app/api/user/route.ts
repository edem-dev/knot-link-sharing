// app/api/user/route.ts
import { auth } from '@clerk/nextjs/server'
import connectDB from '@/lib/mongodb'
import User from '@/lib/models/User'

// POST /api/user
// Called once per user — at the end of the onboarding flow.
// This is the exact moment Clerk and MongoDB are linked by clerkUserId.
export async function POST(req: Request) {
    const { userId } = await auth()
    if (!userId) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { username } = await req.json()

    if (!username) {
        return Response.json({ error: 'Username is required' }, { status: 400 })
    }

    await connectDB()

    // Guard 1 — user already has a MongoDB document.
    // Handles the case where the user refreshes the onboarding page after
    // already submitting. Return the existing doc so the UI can redirect.
    const existing = await User.findOne({ clerkUserId: userId })
    if (existing) {
        return Response.json(existing, { status: 200 })
    }

    // Guard 2 — username taken (race condition between availability
    // check and form submit — two users picking the same name at once).
    const taken = await User.findOne({ username: username.toLowerCase() })
    if (taken) {
        return Response.json({ error: 'Username already taken' }, { status: 409 })
    }

    // Create the document — this is the moment the two systems link.
    // clerkUserId is the bridge: every protected API route uses it to
    // find this document → User.findOne({ clerkUserId: userId })
    const user = await User.create({
        clerkUserId:  userId,
        username:     username.toLowerCase(),
        displayName:  '',
        bio:          '',
        avatarUrl:    '',
        role:         'free',
        links:        [],
    })

    return Response.json(user, { status: 201 })
}