// lib/uploadAvatar.ts

// Handles the full avatar upload flow:
// 1. Get signed credentials from POST /api/upload
// 2. Upload file directly to Cloudinary
// 3. Save the resulting URL via PATCH /api/profile/avatar
// Returns the new avatarSrc URL on success, throws on failure.

export async function uploadAvatar(file: File): Promise<string> {
    // ── Step 1: Get signed credentials ────────────────────────────────────────
    const credsRes = await fetch('/api/upload', { method: 'POST' })
    if (!credsRes.ok) throw new Error('Failed to get upload credentials')

    const { signature, timestamp, cloudName, apiKey, folder } =
        await credsRes.json()

    // ── Step 2: Upload directly to Cloudinary ──────────────────────────────────
    const formData = new FormData()
    formData.append('file',      file)
    formData.append('api_key',   apiKey)
    formData.append('timestamp', String(timestamp))
    formData.append('signature', signature)
    formData.append('folder',    folder)

    const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: 'POST', body: formData }
    )

    if (!uploadRes.ok) throw new Error('Cloudinary upload failed')

    const { secure_url } = await uploadRes.json()

    // ── Step 3: Save URL to MongoDB ────────────────────────────────────────────
    const saveRes = await fetch('/api/profile/avatar', {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ avatarUrl: secure_url }),
    })

    if (!saveRes.ok) throw new Error('Failed to save avatar URL')

    return secure_url
}