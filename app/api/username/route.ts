import {NextRequest} from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User"

//Get /api/username?u=join/
//Public API Route. No auth required.
// Called by the username onboarding page on every keystroke (debounced).

export async function GET(req: NextRequest) {
    const username = req.nextUrl.searchParams.get('u')?.toLowerCase().trim()


    //====================Validation========================//
    if (!username || username.length<3){
        return Response.json(
            {available: false, error:"Too short - minimum three characters" },
            {status:400}
        )
    }

    if (username.length > 30) {
        return Response.json(
            { available: false, error: 'Too long — maximum 30 characters' },
            { status: 400 }
        )
    }

    if (!/^[a-z0-9_-]+$/.test(username)) {
        return Response.json(
            { available: false, error: 'Letters, numbers, _ and - only' },
            { status: 400 }
        )
    }

    // =====================Database Check==========================//
    await connectDB();

    // User.exists() returns the _id if found, null if not.
    // Faster than findOne() — we only need a boolean, not the full document.
    const exists = await User.exists({ username })

    return Response.json({ available: !exists })
}
