import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database.types'

const MAX_BYTES     = 5 * 1024 * 1024  // 5MB input limit
const ACCEPTED_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/avif',
]

// ── Client-side compression ───────────────────────────────────────────────────
// Runs entirely in the browser using the Canvas API — no extra service needed.
// Converts any accepted image format to JPEG, scales it to fit within
// maxDimension × maxDimension, and compresses at the given quality.
//
// Why JPEG output regardless of input format?
//   - JPEG compresses photos far better than PNG for avatars
//   - GIF/WebP/AVIF converted to JPEG loses animation/transparency but
//     avatar use cases don't need those features
//   - contentType is always 'image/jpeg' so Supabase stores it correctly
//
// Typical result: a 1MB PNG becomes a 30–80KB JPEG — 10–30× smaller
async function compressImage(
    file: File,
    maxDimension = 400,
    quality      = 0.82
): Promise<File> {
    return new Promise((resolve, reject) => {
        const img       = new window.Image()
        const objectUrl = URL.createObjectURL(file)

        img.onload = () => {
            // Always release the object URL — avoids memory leaks
            URL.revokeObjectURL(objectUrl)

            // Scale down proportionally so neither dimension exceeds maxDimension.
            // If the image is already smaller, don't upscale — keep original size.
            let { width, height } = img

            if (width > maxDimension || height > maxDimension) {
                if (width >= height) {
                    height = Math.round((height / width) * maxDimension)
                    width  = maxDimension
                } else {
                    width  = Math.round((width / height) * maxDimension)
                    height = maxDimension
                }
            }

            const canvas = document.createElement('canvas')
            canvas.width  = width
            canvas.height = height

            const ctx = canvas.getContext('2d')
            if (!ctx) return reject(new Error('Canvas 2D context unavailable'))

            // White background before drawing — prevents transparent PNG areas
            // from becoming black when converted to JPEG (which has no alpha channel)
            ctx.fillStyle = '#ffffff'
            ctx.fillRect(0, 0, width, height)
            ctx.drawImage(img, 0, 0, width, height)

            canvas.toBlob(
                (blob) => {
                    if (!blob) return reject(new Error('Canvas compression failed'))
                    resolve(
                        new File([blob], `avatar_${Date.now()}.jpg`, {
                            type: 'image/jpeg',
                        })
                    )
                },
                'image/jpeg',
                quality
            )
        }

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl)
            reject(new Error('Failed to load image for compression'))
        }

        img.src = objectUrl
    })
}

// ── Main export ───────────────────────────────────────────────────────────────
export async function uploadAvatar(file: File): Promise<string> {
    // ── Validate ──────────────────────────────────────────────────────────────
    if (!ACCEPTED_TYPES.includes(file.type)) {
        throw new Error(
            `Unsupported file type: ${file.type}. Please upload a JPEG, PNG, GIF, WebP, or AVIF.`
        )
    }

    if (file.size > MAX_BYTES) {
        throw new Error(
            `File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Maximum is 5MB.`
        )
    }

    // ── Compress before upload ─────────────────────────────────────────────────
    // Max 400×400px, 82% JPEG quality.
    // 400px is sharp enough for any avatar at 2× pixel density (retina).
    // Typical reduction: 1MB photo → 40–90KB.
    const compressed = await compressImage(file, 400, 0.82)

    // ── Authenticate ──────────────────────────────────────────────────────────
    const supabase = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    )

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
        throw new Error('Not authenticated — please sign in again.')
    }

    // ── Build path ────────────────────────────────────────────────────────────
    // Always .jpg now — compression guarantees JPEG output regardless of input.
    const filePath = `${user.id}/${Date.now()}.jpg`

    // ── Upload ────────────────────────────────────────────────────────────────
    const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, compressed, {
            upsert:       true,
            cacheControl: '3600',
            contentType:  'image/jpeg',  // always JPEG after compression
        })

    if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`)
    }

    // ── Get public URL ────────────────────────────────────────────────────────
    const {
        data: { publicUrl },
    } = supabase.storage.from('avatars').getPublicUrl(filePath)

    // ── Persist URL to database ───────────────────────────────────────────────
    // PATCH route now uses .select().single() so silent failures surface as
    // real errors — if this fetch succeeds, the DB was actually updated.
    const res = await fetch('/api/profile/avatar', {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ avatarUrl: publicUrl }),
    })

    if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(`Failed to save avatar URL: ${body.error ?? 'unknown error'}`)
    }

    return publicUrl
}