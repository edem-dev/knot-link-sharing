import {auth} from "@clerk/nextjs/server";
import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// POST /api/upload
// Generates a short-lived signed upload credential set so the client
// can upload directly to Cloudinary without exposing the API secret.
//
// Flow:
// 1. Client calls POST /api/upload → receives { signature, timestamp, cloudName, apiKey }
// 2. Client uploads file directly to Cloudinary using those credentials
// 3. Cloudinary validates the signature server-side and returns { secure_url }
// 4. Client calls PATCH /api/profile/avatar with { avatarUrl: secure_url }
// 5. UI updates Avatar component src immediately
//
// The API secret never leaves the server at any point in this flow.

export async function POST(){
    const {userId} = await auth();
    if (!userId){
        return Response.json({error:"Unauthorized"},{status:401})
    }

    const timestamp = Math.round(Date.now() / 1000);

    const signature = cloudinary.utils.api_sign_request(
        {timestamp, folder: "knotted-avatars"},
        process.env.CLOUDINARY_API_SECRET!
    )

    return Response.json({
        signature,
        timestamp,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey:    process.env.CLOUDINARY_API_KEY,
        folder:    "knotted-avatars",
    })
}

