'use client';

//====================Lucide React Imports=====================//
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {createClient} from "@/lib/supabase/client";

import {
    X, LogOut,
    LayoutDashboard, Eye, BarChart2, Settings,
    Link2, Plus,
    TrendingUp, Users, MousePointerClick, Globe, MenuIcon,
} from 'lucide-react';

//====================Components=====================//
//====================== Molecular Components ======================//
import UserSidebarProfile from "@/components/molecular/UserSidebarProfile";
import PageURLBanner from "@/components/molecular/PageURLBanner";
import AvatarMenuDropdown from "@/components/molecular/AvatarMenuDropdown";
import EditableLinkRow from "@/components/molecular/EditableLinkRow";
import AddLinkModal from "@/components/molecular/AddLinkModal";
import FormField from "@/components/molecular/Formfield";
import LinkCountBadge from "@/components/molecular/LinkCountBadge";

//====================== Atomic Components ======================//
import KnottedLogo from "@/components/atomic/KnottedLogo";
import Button from "@/components/atomic/Button";
import Avatar from "@/components/atomic/Avatar";
import Input from "@/components/atomic/Input";
import Textarea from "@/components/atomic/Textarea";

//===================== Shared Types =========================//
import { LinkRowData } from "@/components/molecular/EditableLinkRow";
import { clsx } from 'clsx';

// =======================Clerk Sign out====================//


// ================ Nav Items =============================//
const NAV_ITEMS = [
    { href: '/dashboard', label: 'Dashboard',    Icon: LayoutDashboard },
    { href: '/profile',   label: 'View route', Icon: Eye             },
    { href: '/analytics', label: 'Analytics',    Icon: BarChart2       },
    { href: '/settings',  label: 'Settings',     Icon: Settings        },
] as const;

// Derived union type from NAV_ITEMS
type NavHref = (typeof NAV_ITEMS)[number]['href'];

//==================== Mobile Dashboard Interface ======================//
import {DashboardPageProps} from "@/components/sectional/DashboardSectionals/DashboardPage";
import Link from "next/link";

//=======================================================================//
//=======================================================================//
//==== Shared Panel Components (extracted from this file & DashboardPage) //
//=======================================================================//
// AnalyticsPanel, SettingsPanel and ViewPanel previously lived inline
// here AND in DashboardPage.tsx with identical code. They are now shared
// components imported below.
import AnalyticsPanel from "@/components/sectional/DashboardSectionals/AnalyticsPanel";
import SettingsPanel from "@/components/sectional/DashboardSectionals/SettingsPanel";
import ViewPanel from "@/components/sectional/DashboardSectionals/ViewPanel";
import {useRouter} from "next/navigation";

//=======================================================================//
//=============== Main Component: Mobile Dashboard Page =================//
//=======================================================================//

const MobileDashboardPage: React.FC<DashboardPageProps> = (
    {
        initialProfile = { name: 'Michael Kumah', bio: '', role: 'Knotted Creator', avatarSrc: '' },
        initialLinks = [],
        username = 'michaelkumah',
        onPublish,
        publishLoading,
        className = '',
        onAvatarEdit,
        avatarUploading,
        userEmail,
        onSignOut,

    }) => {



    //========================Handle Sign out===========================//


    const [drawerOpen, setDrawerOpen] = useState(false);

    //================ Avatar Dropdown Menu State =====================//
    // Controls visibility of the small user menu (username + email + sign out)
    // rendered from the sticky navbar Avatar.
    const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

    const handleAvatarMenuToggle = useCallback(() => {
        setAvatarMenuOpen((prev) => !prev);
    }, []);

    const handleAvatarMenuClose = useCallback(() => {
        setAvatarMenuOpen(false);
    }, []);

    // =============================Supabase sign put handler=============================

    //================Active Panel State==========================//
    const [activePath, setActivePath] = useState<NavHref>('/dashboard');

    //=================Profile State ==========================//
    const [name, setName] = useState(initialProfile.name);
    const [bio, setBio] = useState(initialProfile.bio);

    //===============Links State ======================//
    const [links, setLinks] = useState<LinkRowData[]>(initialLinks);
    const [addOpen, setAddOpen] = useState(false);

    //=================== Refs ================================//
    const drawerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    // FIX 1: Track whether this is the initial mount so the focus effect
    // does NOT steal focus on route load (which caused the flash-open glitch).
    const isMounted = useRef(false);

    //==================== useEffect==============================//

    // Baseline the "unsaved changes" comparison runs against. Seeded from
    // props on first render, then advanced locally once a publish attempt
    // finishes (see the effect below). We deliberately don't compare
    // directly against initialProfile/initialLinks on every render — those
    // only change if the parent re-fetches and re-passes new props after a
    // save, which this component can't rely on or control.
    const [savedSnapshot, setSavedSnapshot] = useState({
        name: initialProfile.name,
        bio: initialProfile.bio,
        links: initialLinks,
    })

    const isDirty = useMemo(() => {
        // Check if name or bio has changed from the last saved snapshot
        const profileChanged =
            name !== savedSnapshot.name ||
            bio  !== savedSnapshot.bio

        // Check if links have changed - compare length first (fast), then content
        const linksChanged =
            links.length !== savedSnapshot.links.length ||
            links.some((link, i) => {
                const original = savedSnapshot.links[i]
                return (
                    !original ||
                    link.title !== original.title ||
                    link.url   !== original.url
                )
            })

        return profileChanged || linksChanged
    }, [name, bio, links, savedSnapshot])
    // useMemo re-computes only when these values change.
    // This is important on mobile - we don't want expensive comparisons
    // running on every render.

    // Captures exactly what was submitted the moment "Publish" was clicked,
    // so if the user keeps typing while the request is in flight, those
    // in-flight edits don't get silently marked "saved" when it resolves.
    const pendingSnapshotRef = useRef<typeof savedSnapshot | null>(null)

    // Tracks the previous publishLoading value so we can detect the
    // true -> false transition ("a publish attempt just finished") instead
    // of reacting on every render where publishLoading happens to be false.
    const wasPublishingRef = useRef(false)

    useEffect(() => {
        const isLoadingNow = !!publishLoading
        if (wasPublishingRef.current && !isLoadingNow && pendingSnapshotRef.current) {
            setSavedSnapshot(pendingSnapshotRef.current)
            pendingSnapshotRef.current = null
        }
        wasPublishingRef.current = isLoadingNow
    }, [publishLoading])

    const handlePublishClick = useCallback(() => {
        pendingSnapshotRef.current = { name, bio, links }
        onPublish?.({ name, bio, links })
    }, [name, bio, links, onPublish])






    //==================== Nav Click Handler==============================//
    const handleNavClick = useCallback((href: NavHref) => {
        setActivePath(href);
        setDrawerOpen(false);
    }, []);

    //==================== Link Handlers ==================================//
    const handleLinkChange = useCallback(
        (id: string, field: 'title' | 'url', value: string) => {
            setLinks((prev) =>
                prev.map((l) => (l.id === id ? { ...l, [field]: value } : l))
            );
        },
        []
    );

    const handleLinkDelete = useCallback((id: string) => {
        setLinks((prev) => prev.filter((l) => l.id !== id));
    }, []);

    const handleAddLink = useCallback((newLink: Omit<LinkRowData, 'id'>) => {
        setLinks((prev) => [...prev, { ...newLink, id: crypto.randomUUID() }]);
        setAddOpen(false);
    }, []);

    //============== Derived Values =============================//
    const activeLabel = NAV_ITEMS.find((item) => item.href === activePath)?.label ?? 'Dashboard';
    const showFab = activePath === '/dashboard';

    //==================Supabase signout handler=============//
    const router = useRouter();
    const supabase = createClient()
    async function handleSignOut() {
        const { error } = await supabase.auth.signOut()

        if (error) console.error("Error signing out:", error.message)

        router.push('/signin')
        router.refresh()
    }

    //==================Render: Mobile dashboard=============//
    return (
        <div
            className={clsx(
                'min-h-screen relative bg-slate-50 dark:bg-slate-950',
                'flex flex-col',
                className
            )}
        >

            {/*================Sticky Navbar ==================*/}
            <header
                className={clsx(
                    'sticky top-0 z-30',
                    'bg-white dark:bg-slate-900',
                    'border-b border-slate-100 dark:border-slate-800',
                    'flex items-center justify-between px-4 py-2 relative'
                )}
                role="banner"
            >
                <div className="flex items-center gap-2">

                    <KnottedLogo size="sm" asMobile={true} logoText={true} />
                </div>

                <div className="relative flex items-center gap-2">
                    <span className="text-sm font-display font-semibold text-slate-600 dark:text-slate-300">
                        {activeLabel}
                    </span>
                    <Avatar
                        name={initialProfile.name}
                        src={initialProfile.avatarSrc}
                        size="sm"
                        onClick={handleAvatarMenuToggle}
                        ariaLabel="Open user menu"
                    />
                </div>

                    {/*================ User Avatar Dropdown ==================*/}
                    <AvatarMenuDropdown
                        open={avatarMenuOpen}
                        onClose={handleAvatarMenuClose}
                        username={username}
                        email={userEmail}
                        avatarSrc={initialProfile.avatarSrc}
                        onSignOut={handleSignOut}
                        className={'absolute top-4 right-4'}
                    />
            </header>
            {/*================Sticky Navbar ==================*/}
            {/*================Publish changes when ui chges ==================*/}
            {showFab && isDirty && (
                <div className="sticky bottom-0 px-4 pb-2 pt-3  flex-col gap-3">


                    {isDirty && (
                        <div
                            className={[
                                'flex items-center justify-between gap-3',
                                'px-4 py-3',
                                'bg-white dark:bg-slate-900',
                                'border border-brand-200 dark:border-brand-800',
                                'rounded-full shadow-sm',
                                // Subtle brand-tinted border signals this is an action item
                            ].join(' ')}
                        >
                            {/* Unsaved indicator */}
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-2 h-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0"
                                    aria-hidden="true"
                                />
                                <span className="text-xs font-display font-semibold text-slate-600 dark:text-slate-400">
                                    Unsaved changes
                                </span>
                            </div>

                            {/*

        */}
                            <Button
                                variant="primary"
                                size="sm"
                                loading={publishLoading}
                                onClick={handlePublishClick}
                                type="button"
                                className="shrink-0"
                            >
                                Publish
                            </Button>
                        </div>
                    )}

                </div>
            )}
            {/*================ Publish chnges when ui chnges==================*/}

            {/*================== Main Content =====================*/}
            <main
                className={clsx(
                    'flex-1 px-4 py-5 flex flex-col gap-5 overflow-y-auto',
                    // Reserve extra room only when the unsaved-changes publish bar
                    // can appear, so it doesn't cover the last bit of content.
                    showFab && isDirty ? 'pb-24' : 'pb-8'
                )}
                aria-label="Main content area for mobile dashboard"
            >
                <PageURLBanner
                    url={`knottted.vercel.app/${username}`}
                    subLabel="Share your link with your audience"
                />

                {/*â”€â”€ /dashboard panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€*/}
                {activePath === '/dashboard' && (
                    <>
                        <section
                            className={clsx(
                                'bg-white dark:bg-slate-900',
                                'rounded-3xl border border-slate-100',
                                'dark:border-slate-800 p-6'
                            )}
                            aria-labelledby="mobile-profile-heading"
                        >
                            <div className="flex mb-5 justify-center">
                                <Avatar
                                    name={initialProfile.name}
                                    src={initialProfile.avatarSrc}
                                    size="2xl"
                                    editable={true}
                                    onEdit={onAvatarEdit}
                                />
                            </div>

                            <h2
                                id="mobile-profile-heading"
                                className="font-display font-bold text-base text-slate-800 dark:text-white text-center mb-1"
                            >
                                Profile Info
                            </h2>
                            <p className="font-body text-xs text-slate-400 dark:text-slate-500 text-center mb-5">
                                Update your public appearance
                            </p>

                            <div className="flex flex-col gap-4">
                                <FormField label="Display Name" htmlFor="mobile-profile-name">
                                    <Input
                                        id="mobile-profile-name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Your name"
                                    />
                                </FormField>
                                <FormField label="Bio" htmlFor="mobile-profile-bio">
                                    <Textarea
                                        id="mobile-profile-bio"
                                        value={bio}
                                        rows={4}
                                        maxLength={160}
                                        currentLength={bio.length}
                                        onChange={(e) => setBio(e.target.value)}
                                        placeholder="Tell the world about yourself"
                                    />
                                </FormField>
                            </div>
                        </section>

                        <section
                            className={clsx(
                                'bg-white dark:bg-slate-900',
                                'rounded-3xl border border-slate-100',
                                'dark:border-slate-800 px-5 py-5'
                            )}
                            aria-labelledby="mobile-links-heading"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2
                                    id="mobile-links-heading"
                                    className="font-display font-bold text-base text-slate-800 dark:text-white flex items-center gap-2"
                                >
                                    <Link2 className="w-5 h-5 text-brand-500" aria-hidden="true" />
                                    Active Links
                                </h2>
                                <LinkCountBadge count={links.length} />
                            </div>

                            <div className="flex flex-col gap-2">
                                {links.map((link) => (
                                    <EditableLinkRow
                                        key={link.id}
                                        link={link}
                                        onChange={handleLinkChange}
                                        onDelete={handleLinkDelete}
                                    />
                                ))}

                                {links.length === 0 && (
                                    <p className="text-sm font-body text-slate-400 dark:text-slate-500 text-center py-4">
                                        No links yet â€” tap the button below to add your first one!
                                    </p>
                                )}
                            </div>

                            {/*
                              Add-new-link action â€” moved out of the floating FAB and
                              into the section it actually acts upon. Keeps the bottom
                              of the screen reserved for navigation + publish only.
                            */}
                            <Button
                                variant="outline"
                                size="lg"
                                fullWidth
                                leftIcon={<Plus className="w-5 h-5" aria-hidden="true" />}
                                onClick={() => setAddOpen(true)}
                                type="button"
                                className="mt-4 border-dashed"
                            >
                                Add new link
                            </Button>
                        </section>
                    </>
                )}

                {/*â”€â”€ /analytics panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€*/}
                {activePath === '/analytics' && <AnalyticsPanel />}

                {/*â”€â”€ /settings panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€*/}
                {activePath === '/settings' && <SettingsPanel />}

                {/*â”€â”€ /profile panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€*/}
                {activePath === '/profile' && (
                    <ViewPanel
                        username={username}
                        links={links}
                        name={name}
                        avatarSrc={initialProfile.avatarSrc}
                    />
                )}
            </main>



            <AddLinkModal
                isOpen={addOpen}
                onClose={() => setAddOpen(false)}
                onAdd={handleAddLink}
            />

            {/*================ Bottom Navigation ==================*/}
            {/*
              Sticky wrapper — same pattern as the publish bar above.
              It stays in the flex-column flow (so it never hides content)
              but pins to the viewport bottom while scrolling.
              `pointer-events-none` on the wrapper lets taps pass through
              the empty gutter around the pill; the nav re-enables them.
            */}
            <div
                className={clsx(
                    'sticky bottom-2 z-30 pointer-events-none',
                    'px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2'
                )}
            >
                <nav
                    aria-label="Primary mobile navigation"
                    className={clsx(
                        'pointer-events-auto',
                        // Centered floating pill
                        'mx-auto w-full max-w-lg',
                        'flex items-stretch justify-around gap-1',
                        'px-3 py-1.5',
                        // Fully rounded, frosted-glass surface
                        'rounded-full',
                        'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md',
                        'border border-slate-200 dark:border-slate-800/70',
                        'shadow-[0_8px_32px_-8px_rgba(15,23,42,0.35)]'
                    )}
                >
                    {NAV_ITEMS.map(({ href, label, Icon }) => {
                        const isActive = activePath === href;
                        return (
                            <button
                                key={href}
                                type="button"
                                onClick={() => handleNavClick(href)}
                                aria-current={isActive ? 'page' : undefined}
                                aria-label={label}
                                className={clsx(
                                    // Tap target â€” comfortably hits the 44px minimum
                                    'group relative flex-1 min-h-[3.25rem]',
                                    'flex flex-col items-center justify-center gap-1',
                                    'rounded-full',
                                    'transition-[color,transform] duration-200 ease-out',
                                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900',
                                    'active:scale-[0.94]',
                                    isActive
                                        ? 'text-brand-600 dark:text-brand-400'
                                        : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'
                                )}
                            >
                                {/* Icon backplate â€” a brand-tinted pill that smoothly grows under the active tab */}
                                <span
                                    className={clsx(
                                        'relative flex items-center justify-center',
                                        'h-9 w-12 rounded-full',
                                        'transition-all duration-200 ease-out',
                                        isActive
                                            ? 'bg-brand-100/80 dark:bg-brand-500/15 scale-100'
                                            : 'bg-transparent scale-90 group-hover:bg-slate-100 dark:group-hover:bg-slate-800/60'
                                    )}
                                >
                                    <Icon
                                        className={clsx(
                                            'transition-all duration-200',
                                            isActive ? 'w-[15px] h-[15px]' : 'w-5 h-5'
                                        )}
                                        aria-hidden="true"
                                        strokeWidth={isActive ? 2.4 : 2}
                                    />
                                </span>


                            </button>
                        );
                    })}
                </nav>
            </div>
            {/*================ Bottom Navigation ==================*/}
        </div>
    );
};

export default MobileDashboardPage;
