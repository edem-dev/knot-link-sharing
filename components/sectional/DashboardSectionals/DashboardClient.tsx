'use client'

import { useRef, useState, useEffect } from 'react'
import { uploadAvatar } from '@/lib/uploadAvatar'
import DashboardPage from '@/components/sectional/DashboardSectionals/DashboardPage'
import MobileDashboardPage from '@/components/sectional/DashboardSectionals/MobileDashboardPage'
import type { LinkRowData } from '@/types'
import {useRouter} from "next/navigation"
import {useToast} from "@/hooks/useToast";
import Toast from "@/components/atomic/Toast";
// ── Types ─────────────────────────────────────────────────────────────────────

interface InitialProfile {
    name:      string
    bio:       string       // ← was missing from original interface
    email:     string
    avatarSrc: string
    role:      'free' | 'pro'
}

interface DashboardClientProps {
    initialProfile: InitialProfile
    initialLinks:   LinkRowData[]
    username:       string
}

type PublishState = 'idle' | 'loading' | 'success' | 'error'

// ── useIsMobile ───────────────────────────────────────────────────────────────
// MUST live outside the component at module level.
// Defining it inside the component body violates React's Rules of Hooks —
// custom hooks that contain useState/useEffect must be declared at the
// top level of a module, never nested inside another function or component.
function useIsMobile(breakpoint = 768): boolean {
    // Server render defaults to false (desktop) — no hydration mismatch.
    // Switches to true once the browser reports a narrow viewport.
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < breakpoint)
        check()

        const observer = new ResizeObserver(check)
        observer.observe(document.documentElement)
        return () => observer.disconnect()
    }, [breakpoint])

    return isMobile
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function DashboardClient(
    {
        initialProfile,
        initialLinks,
        username,
    }: DashboardClientProps) {
    const isMobile = useIsMobile()

    // Avatar state lives here — updates immediately after upload without
    // requiring a full route refresh.
    const [avatarSrc, setAvatarSrc] = useState(initialProfile.avatarSrc)
    const [uploading, setUploading] = useState(false)
    const [avatarError, setAvatarError] = useState('')
    const {toast, show:showToast, dismiss:dismissToast} = useToast()
    const router = useRouter();
    const fileInputRef              = useRef<HTMLInputElement>(null)

    // publishState drives the button label + disabled state.
    // 'success' and 'error' both auto-reset to 'idle' after 3 seconds.
    const [publishState, setPublishState] = useState<PublishState>('idle')

    // ── Avatar handlers ───────────────────────────────────────────────────────
    const handleAvatarEdit = () => fileInputRef.current?.click()

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        setAvatarError('')

        try {
            const newUrl = await uploadAvatar(file)
            setAvatarSrc(newUrl)

            // Force the server component to re-run so initialProfile.avatarSrc
            // gets updated in the server-rendered data. Means if the user manually
            // reloads AFTER this, the server sends the correct avatarSrc from the DB.
            router.refresh()

        } catch (err) {
            const message = err instanceof Error ? err.message : 'Upload failed'
            console.error('[Avatar] Upload failed:', message)
            setAvatarError(message)
        } finally {
            setUploading(false)
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    // ── Publish handler ───────────────────────────────────────────────────────
    // Defined HERE in the client component — not passed from the server page.
    // Plain functions cannot cross the server/client boundary in Next.js App
    // Router (only Server Actions marked with 'use server' can).
    // fetch() here keeps it simple and consistent with the rest of the API layer.
    const handlePublish = async (data: {
        name:  string
        bio:   string
        links: LinkRowData[]
    }) => {
        setPublishState('loading')

        try {
            const res = await fetch('/api/profile', {
                method:  'PUT',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify(data),
            })

            if (res.ok) {
                setPublishState('success')
                showToast('Changes published successfully', 'success')  // ← NEW
            } else {
                const body = await res.json().catch(() => ({}))
                setPublishState('error')
                showToast(body.error ?? 'Could not save changes. Try again.', 'error')  // ← NEW
            }
        } catch {
            setPublishState('error')
            showToast('Network error — check your connection.', 'error')  // ← NEW
        }

        setTimeout(() => setPublishState('idle'), 3_000)
    }

    const Component = isMobile ? MobileDashboardPage : DashboardPage


    return (
        <>
            {/* Hidden file input — triggered programmatically by Avatar onEdit */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                aria-hidden="true"
            />

            {avatarError && (
                <div
                    role="alert"
                    className={[
                        'fixed top-4 left-1/2 -translate-x-1/2 z-50',
                        'bg-red-50 border border-red-200 text-red-700',
                        'text-sm font-body px-4 py-3 rounded-2xl shadow-md',
                        'max-w-sm text-center',
                    ].join(' ')}
                >
                    {avatarError}
                </div>
            )}

            {
                toast && (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        variant={toast.variant}
                        onDismiss={dismissToast}
                    />
                )}

                <Component
                    initialProfile={{ ...initialProfile, avatarSrc }}
                    initialLinks={initialLinks}
                    username={username}
                    onPublish={handlePublish}
                    publishLoading={publishState === 'loading'}
                    onAvatarEdit={handleAvatarEdit}
                    avatarUploading={uploading}
                />

        </>
    )
}