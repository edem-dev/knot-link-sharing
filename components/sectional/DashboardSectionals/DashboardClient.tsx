// app/(protected)/dashboard/DashboardClient.tsx
'use client'

import { useRef, useState } from 'react'
import { uploadAvatar } from '@/lib/uploadAvatar'
import DashboardPage from '@/components/sectional/DashboardSectionals/DashboardPage'
import MobileDashboardPage from '@/components/sectional/DashboardSectionals/MobileDashboardPage'

interface Props {
    initialProfile: {
        name:      string
        bio:       string
        role:      string
        avatarSrc: string
    }
    initialLinks: { id: string; title: string; url: string }[]
    username:     string
    isMobile:     boolean
    onPublish: (data: {
        name:  string
        bio:   string
        links: { id: string; title: string; url: string }[]
    }) => Promise<void>
}

export default function DashboardClient({
                                            initialProfile,
                                            initialLinks,
                                            username,
                                            isMobile,
                                            onPublish,
                                        }: Props) {
    // Track avatar src locally so it updates immediately after upload
    // without requiring a full page refresh
    const [avatarSrc, setAvatarSrc]     = useState(initialProfile.avatarSrc)
    const [uploading, setUploading]     = useState(false)
    const fileInputRef                  = useRef<HTMLInputElement>(null)

    // Triggered by the Avatar component's onEdit pencil button
    const handleAvatarEdit = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        try {
            const newUrl = await uploadAvatar(file)
            setAvatarSrc(newUrl)
        } catch (err) {
            console.error('[Avatar] Upload failed:', err)
        } finally {
            setUploading(false)
            // Reset so the same file can be selected again if needed
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
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

            <Component
                initialProfile={{ ...initialProfile, avatarSrc }}
                initialLinks={initialLinks}
                username={username}
                onPublish={onPublish}
                onAvatarEdit={handleAvatarEdit}
                avatarUploading={uploading}
            />
        </>
    )
}