import { BarChart2, Eye, LayoutDashboard, Settings } from 'lucide-react'
import type { LinkRowData } from '@/types'

export const NAV_ITEMS = [
    { href: '/dashboard', label: 'Dashboard',    Icon: LayoutDashboard },
    { href: '/profile',   label: 'View my route', Icon: Eye             },
    { href: '/analytics', label: 'Analytics',    Icon: BarChart2       },
    { href: '/settings',  label: 'Settings',     Icon: Settings        },
] as const

export type NavHref = (typeof NAV_ITEMS)[number]['href']

export interface DashboardPageProps {
    initialProfile?: {
        name: string
        bio: string
        role?: string
        avatarSrc?: string
    }
    initialLinks?: LinkRowData[]
    username?: string
    onPublish?: (data: {
        name: string
        bio: string
        links: LinkRowData[]
    }) => void
    publishLoading?: boolean
    className?: string
    onAvatarEdit?: () => void
    avatarUploading?: boolean
}
