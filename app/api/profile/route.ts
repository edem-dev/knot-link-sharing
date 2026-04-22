import { auth } from '@clerk/nextjs/server'
import connectDB from '@/lib/mongodb'
import User from '@/lib/models/User'


//GET api/profile
//Fetches the authenticated user full profile and links.
//This si called serverside from the dashboard to hydrate the initial
// hardcoded props

export async function GET(){
    const {userId} = await auth();
        if (!userId){
            return Response.json({error:"Unauthorized"},{status:401})
        }

//===================Connect to the DB====================//
    await connectDB();

    const user = await User.findOne({clerkUserId:userId}).lean()
    //.lean() converts the document to a plain JS object.
    // This is faster and lighter - we only need to read the data not
    // modify it.

    if (!user){
        return Response.json({error:"User Profile not found"},{status:404})
    }

    //=================== Field mapping======================//
    // MongoDB stores: displayName, avatarUrl
    // UI components expect: name, avatarSrc
    // This response is the translation layer between the two.
    return Response.json({
        name:      user.displayName,
        bio:       user.bio,
        username:  user.username,
        avatarSrc: user.avatarUrl,
        role:      user.role,
        links: (user.links as { _id: any; title: string; url: string; order: number }[])
            .sort((a, b) => a.order - b.order)
            .map(link => ({
                id:    link._id.toString(),
                title: link.title,
                url:   link.url,
            })),
    })
}

// PUT /api/profile
// Bulk update — replaces the full profile and links array in one
// atomic operation. Called when the user clicks "Publish Changes"

export async function PUT(req:Request){
    const { userId } = await auth()
    if (!userId) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, bio, links, role, avatarUrl } = await req.json() as {
        name:       string
        bio:        string
        links:      { id: string; title: string; url: string }[]
        role?:      string
        avatarUrl?: string
    }
    // Derive `order` from array position.
    // The UI sends links in the exact order the user sees them,
    // including any drag-to-reorder changes.
    // We trust the array order and assign sequential values.

    const linksWithOrder = links.map((link, index) => ({
        title: link.title,
        url:   link.url,
        order: index,
    }))

    await connectDB();

    console.log('[PUT] Looking for userId:', userId)
    const exists = await User.findOne({ clerkUserId: userId }).lean()
    console.log('[PUT] User found before update:', exists)

    const user = await User.findOneAndUpdate(
        {clerkUserId:userId},
        {
            $set: {
                displayName: name,
                bio,
                links:       linksWithOrder,
                ...(role && { role }),
                ...(avatarUrl && { avatarUrl }),
            },
        },
        {new:true}
    )

    if (!user) {
        return Response.json({ error: 'User not found' }, { status: 404 })
    }

    return Response.json({success: true})
}