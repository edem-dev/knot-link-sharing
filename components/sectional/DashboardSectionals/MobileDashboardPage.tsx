'use client';

//====================Lucide React Imports=====================//
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

import {
    X, LogOut,
    LayoutDashboard, Eye, BarChart2, Settings,
    Link2, Plus,
    TrendingUp, Users, MousePointerClick, Globe, MenuIcon,
} from 'lucide-react';

//====================Components=====================//
//====================== Molecular Components ======================//
import UserSidebarProfile from "@/components/molecular/UserSidebarProfile";
import SidebarNavItem from "@/components/molecular/SidebarNavItem";
import PageURLBanner from "@/components/molecular/PageURLBanner";
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
import { useClerk } from '@clerk/nextjs'

// ================ Nav Items =============================//
const NAV_ITEMS = [
    { href: '/dashboard', label: 'Dashboard',    Icon: LayoutDashboard },
    { href: '/profile',   label: 'View my page', Icon: Eye             },
    { href: '/analytics', label: 'Analytics',    Icon: BarChart2       },
    { href: '/settings',  label: 'Settings',     Icon: Settings        },
] as const;

// Derived union type from NAV_ITEMS
type NavHref = (typeof NAV_ITEMS)[number]['href'];

//==================== Mobile Dashboard Interface ======================//
import {DashboardPageProps} from "@/components/sectional/DashboardSectionals/DashboardPage";
import Link from "next/link";

//=======================================================================//
//==================== Internal Panel Components ======================//
//=======================================================================//

//======================Analytics panel================================//
const AnalyticsPanel: React.FC = () => {
    const overviewStats = [
        { label: 'Total Views',  value: '12,847', delta: '+12% this week', Icon: Globe             },
        { label: 'Link Clicks',  value: '3,291',  delta: '+8% this week',  Icon: MousePointerClick },
        { label: 'Followers',    value: '1,024',  delta: '+24 this week',  Icon: Users             },
        { label: 'Top Link CTR', value: '34.2%',  delta: 'Portfolio',      Icon: TrendingUp        },
    ];

    const topLinks = [
        { title: 'Portfolio Website', clicks: 892, pct: 72 },
        { title: 'Latest Case Study', clicks: 421, pct: 34 },
        { title: 'YouTube Channel',   clicks: 210, pct: 17 },
    ];

    return (
        <div className="flex flex-col gap-6">
            <section
                className={clsx(
                    'bg-white dark:bg-slate-900',
                    'rounded-3xl border border-slate-100',
                    'dark:border-slate-800 p-6'
                )}
            >
                <h2
                    id="analytics-overview-heading"
                    className={clsx(
                        'font-display font-bold text-base',
                        'text-slate-800 dark:text-white',
                        'flex items-center gap-2 mb-6'
                    )}
                >
                    <BarChart2 className="w-5 h-5 text-brand-500" aria-hidden="true" />
                    Overview
                </h2>

                <div className="grid grid-cols-2 gap-4">
                    {overviewStats.map(({ label, value, delta, Icon }) => (
                        <div
                            key={label}
                            className={clsx(
                                'flex flex-col gap-2',
                                'bg-slate-50 dark:bg-slate-800',
                                'rounded-2xl p-4'
                            )}
                        >
                            <div className="flex items-center gap-2">
                                <Icon className="w-5 h-5 text-brand-500 dark:text-brand-400" aria-hidden="true" />
                                <span
                                    className={clsx(
                                        'font-display font-semibold text-xs',
                                        'uppercase tracking-widest text-slate-500 dark:text-slate-400'
                                    )}
                                >
                                    {label}
                                </span>
                            </div>
                            <p className={clsx('font-display font-extrabold text-2xl', 'text-slate-900 dark:text-white')}>
                                {value}
                            </p>
                            <p className="text-xs font-body text-slate-400 dark:text-slate-500">{delta}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section
                aria-labelledby="analytics-top-links-heading"
                className={clsx(
                    'bg-white dark:bg-slate-900',
                    'rounded-3xl border border-slate-100',
                    'dark:border-slate-800 p-6'
                )}
            >
                <h2
                    id="analytics-top-links-heading"
                    className={clsx('font-display font-bold text-base', 'text-slate-800 dark:text-white mb-6')}
                >
                    Top Links
                </h2>
                <div className="flex flex-col gap-4">
                    {topLinks.map(({ title, clicks, pct }) => (
                        <div key={title}>
                            <div className="flex items-center justify-between mb-2">
                                <span
                                    className={clsx(
                                        'text-sm font-body font-medium',
                                        'text-slate-700 dark:text-slate-200',
                                        'truncate'
                                    )}
                                >
                                    {title}
                                </span>
                                <span className="text-sm font-body text-slate-500 flex-shrink-0 ml-3">
                                    {clicks} clicks
                                </span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-brand-600 rounded-full transition-all duration-500"
                                    style={{ width: `${pct}%` }}
                                    role="progressbar"
                                    aria-valuenow={pct}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-label={`${title}: ${pct}% of clicks`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

//======================Settings panel================================//
const SettingsPanel: React.FC = () => (
    <div className="flex flex-col gap-6">
        <section
            className={clsx(
                'bg-white dark:bg-slate-900',
                'rounded-3xl border border-slate-100',
                'dark:border-slate-800 p-6'
            )}
        >
            <h2
                id="settings-heading"
                className="font-display font-bold text-base text-slate-800 dark:text-white flex items-center gap-2 mb-6"
            >
                <Settings className="w-5 h-5 text-brand-500" aria-hidden="true" />
                Account Settings
            </h2>

            <div className="flex flex-col gap-4">
                <FormField label="Email Address" htmlFor="settings-email">
                    <Input
                        id="settings-email"
                        type="email"
                        value=""
                        defaultValue="alex@example.com"
                        placeholder="Your email address"
                        autoComplete="email"
                    />
                </FormField>

                <FormField label="Username" htmlFor="settings-username">
                    <Input
                        id="settings-username"
                        type="text"
                        defaultValue="alexrivers"
                        prefix="knottted.vercel.app/"
                        placeholder="yourname"
                        autoComplete="off"
                        spellCheck={false}
                    />
                </FormField>

                <Button
                    variant="primary"
                    size="md"
                    type="button"
                    onClick={() => {/* TODO: PATCH /api/settings */}}
                >
                    Save Changes
                </Button>
            </div>
        </section>

        <section
            className={clsx(
                'bg-white dark:bg-slate-900',
                'rounded-3xl border border-red-100',
                'dark:border-red-900/50 p-6'
            )}
            aria-labelledby="danger-zone-heading"
        >
            <h2
                id="danger-zone-heading"
                className="font-display font-bold text-base text-red-600 dark:text-red-400 mb-2"
            >
                Danger Zone
            </h2>
            <p className="font-body text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Permanently delete your account and all your data. This cannot be undone.
            </p>

            <Button
                variant="danger"
                size="md"
                type="button"
                onClick={() => {/* TODO: open confirmation Modal → DELETE /api/account */}}
            >
                Delete Account
            </Button>
        </section>
    </div>
);

//======================View panel================================//
interface ViewPagePanelProps {
    username:   string;
    links:      LinkRowData[];
    name:       string;
    avatarSrc?: string;
}

const ViewPanel: React.FC<ViewPagePanelProps> = ({ username, links, name, avatarSrc }) => {
    return (
        <div
            className={clsx(
                'bg-white dark:bg-slate-900',
                'rounded-3xl border border-slate-100',
                'dark:border-slate-800 p-6'
            )}
            aria-labelledby="view-page-heading"
        >
            <div className="flex items-center justify-between mb-6">
                <h2
                    id="view-page-heading"
                    className={clsx(
                        'font-display font-bold text-base',
                        'text-slate-800 dark:text-white',
                        'flex items-center gap-2'
                    )}
                >
                    <Eye className="w-5 h-5 text-brand-500" aria-hidden="true" />
                    Your Public Page
                </h2>
                <Link
                    href={`https://knottted.vercel.app/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx(
                        'inline-flex items-center gap-2',
                        'px-3 py-1.5',
                        'text-sm font-medium',
                        'text-brand-600 bg-brand-50 dark:bg-brand-900/50',
                        'rounded-full'
                    )}
                >
                    Open in new tab →
                </Link>
            </div>

            <div className="flex flex-col items-center py-8 border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-950">
                <Avatar name={name} src={avatarSrc} size="2xl" className="mb-4" />
                <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white mb-1">
                    {name}
                </h3>
                {/*<p className="font-display font-bold text-xs tracking-widest uppercase text-brand-600 dark:text-brand-400 mb-6">*/}
                {/*    Knotted Creator*/}
                {/*</p>*/}

                <div className="w-full max-w-xs flex flex-col gap-2 px-4">
                    {links.length > 0
                        ? links.map((link) => (
                            <div
                                key={link.id}
                                className={clsx(
                                    'flex items-center',
                                    'justify-between px-4 py-3 bg-white',
                                    'dark:bg-slate-900 rounded-xl border',
                                    'border-slate-200 dark:border-slate-700'
                                )}
                            >
                                <span className="text-sm font-display font-medium text-slate-800 dark:text-white truncate">
                                    {link.title || 'Untitled link'}
                                </span>
                                <span className="text-slate-400 ml-2 shrink-0 text-sm">→</span>
                            </div>
                        ))
                        : (
                            <p className="text-sm font-body text-slate-400 text-center py-4">
                                No links yet — add some in the Dashboard tab.
                            </p>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

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
        avatarUploading

    }) => {

    //======================Drawer State==========================//
    // BUG FIX: Initial state was conceptually fine (false = closed), but the
    // focus useEffect was firing on mount and calling triggerRef.current?.focus()
    // unconditionally. On some mobile browsers this caused a scroll/repaint that
    // made the off-screen drawer flash into view momentarily on load.
    // Fix: guard the focus effect so it only runs when drawerOpen *changes*
    // after the initial mount (using a `mounted` ref), and add `aria-hidden` +
    // `inert` + `visibility` toggling to fully remove the drawer from the
    // paint/accessibility tree when closed.

    //========================Handle Sign out===========================//

    const {signOut } = useClerk();

    const [drawerOpen, setDrawerOpen] = useState(false);

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
    // does NOT steal focus on page load (which caused the flash-open glitch).
    const isMounted = useRef(false);

    //==================== useEffect==============================//

    // 1. Add a `isDirty` derived value — true when local state differs from initial data.
//    Add this AFTER your existing state declarations inside MobileDashboardPage:

    const isDirty = useMemo(() => {
        // Check if name or bio has changed from the initial values passed in
        const profileChanged =
            name !== initialProfile.name ||
            bio  !== initialProfile.bio

        // Check if links have changed — compare length first (fast), then content
        const linksChanged =
            links.length !== initialLinks.length ||
            links.some((link, i) => {
                const original = initialLinks[i]
                return (
                    !original ||
                    link.title !== original.title ||
                    link.url   !== original.url
                )
            })

        return profileChanged || linksChanged
    }, [name, bio, links, initialProfile, initialLinks])
// useMemo re-computes only when these values change.
// This is important on mobile — we don't want expensive comparisons
// running on every render.


    // useEffect-1: Escape key closes the drawer
    useEffect(() => {
        if (!drawerOpen) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setDrawerOpen(false);
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [drawerOpen]);

    // useEffect-2: Body scroll lock when drawer is open
    useEffect(() => {
        document.body.style.overflow = drawerOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [drawerOpen]);

    // FIX 2: Guard focus management so it does NOT run on initial mount.
    // Previously the `else` branch ran immediately on first render (drawerOpen=false),
    // calling triggerRef.current?.focus() which caused a jarring scroll-to-top /
    // repaint on mobile — making the drawer appear briefly open on load.
    useEffect(() => {
        // Skip the very first render; only manage focus on subsequent open/close.
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        if (drawerOpen) {
            const firstFocusable = drawerRef.current?.querySelector<HTMLElement>(
                'button, a, input, [tabindex]:not([tabindex="-1"])'
            );
            firstFocusable?.focus();
        } else {
            triggerRef.current?.focus();
        }
    }, [drawerOpen]);

    // FIX 3: Sync the `inert` attribute on the drawer element.
    // `inert` makes the entire subtree invisible to assistive tech and non-interactive
    // when closed — this is the most robust way to prevent the drawer from being
    // "reachable" (via keyboard or screen reader) while off-screen.
    useEffect(() => {
        const el = drawerRef.current;
        if (!el) return;
        if (drawerOpen) {
            el.removeAttribute('inert');
        } else {
            el.setAttribute('inert', '');
        }
    }, [drawerOpen]);

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

    //==================Render: Mobile dashboard=============//
    return (
        <div
            className={clsx(
                'min-h-screen bg-slate-50 dark:bg-slate-950',
                'flex flex-col',
                className
            )}
        >
            {/*================Slide-In Drawer System ==================*/}

            {/*── 1. Backdrop ────────────────────────────────────────────
                FIX 4: Added `invisible` when closed so the backdrop div is fully
                removed from the paint layer (not just opacity-0).
                `invisible` sets visibility:hidden which — unlike opacity:0 — also
                hides the element from most browser hit-testing, preventing ghost
                click interception on the content behind it.
            */}
            <div
                className={clsx(
                    'fixed inset-0 z-40',
                    'bg-slate-900/50 dark:bg-black/60 backdrop-blur-sm',
                    'transition-opacity duration-300',
                    drawerOpen
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none invisible'
                )}
                onClick={() => setDrawerOpen(false)}
                aria-hidden="true"
            />

            {/*── 2. Drawer Panel ────────────────────────────────────────
                FIX 5: Added `invisible` / `visible` toggling in parallel with
                the translate classes. This ensures the drawer is:
                  • Visually absent (not just off-screen) when closed
                  • Not reachable by keyboard tabbing (paired with `inert` above)
                  • Not announced by screen readers while closed
                The transition-[transform,visibility] ensures visibility changes
                are still synced with the sliding animation.
            */}
            <div
                ref={drawerRef}
                className={clsx(
                    'fixed top-0 left-0 h-full w-72 z-50',
                    'bg-white dark:bg-slate-950',
                    'border-r border-slate-100 dark:border-slate-800',
                    'flex flex-col px-4 py-6',
                    'shadow-2xl shadow-black/20',
                    // Animation
                    'transform transition-[transform,visibility] duration-300 ease-out',
                    'will-change-transform',
                    // FIX: toggle both position AND visibility together
                    drawerOpen
                        ? 'translate-x-0 visible'
                        : '-translate-x-full invisible'
                )}
                aria-modal="true"
                aria-label="Navigation menu"
                role="dialog"
            >
                <div className="flex justify-end mb-4">
                    <button
                        type="button"
                        onClick={() => setDrawerOpen(false)}
                        className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        aria-label="Close menu"
                    >
                        <X className="w-6 h-6" aria-hidden="true" />
                    </button>
                </div>

                <UserSidebarProfile
                    name={initialProfile.name}
                    role={initialProfile.role ?? 'Creator'}
                    avatarSrc={initialProfile.avatarSrc}
                    className="mb-6"
                />

                <nav className="flex flex-col gap-1 flex-1" aria-label="Mobile navigation">
                    {NAV_ITEMS.map(({ href, label, Icon }) => (
                        <SidebarNavItem
                            key={href}
                            icon={<Icon className="w-4 h-4" />}
                            label={label}
                            href={href}
                            active={activePath === href}
                            onClick={() => handleNavClick(href)}
                        />
                    ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                    <Button
                        variant="danger"
                        type="button"
                        fullWidth
                        onClick={() => signOut({ redirectUrl: '/' })}
                        leftIcon={<LogOut className="w-4 h-4" aria-hidden="true" />}
                    >
                        Sign Out
                    </Button>
                </div>
            </div>
            {/*================Slide-In Drawer System ==================*/}

            {/*================Sticky Navbar ==================*/}
            <header
                className={clsx(
                    'sticky top-0 z-30',
                    'bg-white dark:bg-slate-900',
                    'border-b border-slate-100 dark:border-slate-800',
                    'flex items-center justify-between px-4 py-2'
                )}
                role="banner"
            >
                <div className="flex items-center gap-2">
                    <button
                        ref={triggerRef}
                        type="button"
                        onClick={() => setDrawerOpen(true)}
                        aria-expanded={drawerOpen}
                        aria-haspopup="dialog"
                        aria-label="Open Navigation Menu"
                        className={clsx(
                            'w-8 h-8 rounded-lg',
                            'flex items-center justify-center',
                            'text-slate-500 dark:text-slate-400',
                            'hover:text-slate-900 dark:hover:text-white',
                            'hover:bg-slate-100 dark:hover:bg-slate-800',
                            'transition-colors duration-150',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600'
                        )}
                    >
                        <MenuIcon className="w-6 h-6" aria-hidden="true" />
                    </button>

                    <KnottedLogo size="sm" asMobile={true} />
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm font-display font-semibold text-slate-600 dark:text-slate-300">
                        {activeLabel}
                    </span>
                    <Avatar
                        name={initialProfile.name}
                        src={initialProfile.avatarSrc}
                        size="sm"
                    />
                </div>
            </header>
            {/*================Sticky Navbar ==================*/}

            {/*================== Main Content =====================*/}
            <main
                className={clsx(
                    'flex-1 px-4 py-5 flex flex-col gap-5 overflow-y-auto',
                    showFab ? 'pb-28' : 'pb-8'
                )}
                aria-label="Main content area for mobile dashboard"
            >
                <PageURLBanner
                    url={`knottted.vercel.app/${username}`}
                    subLabel="Share your link with your audience"
                />

                {/*── /dashboard panel ───────────────────────────────────*/}
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
                                        No links yet — tap the button below to add your first one!
                                    </p>
                                )}
                            </div>
                        </section>
                    </>
                )}

                {/*── /analytics panel ───────────────────────────────────*/}
                {activePath === '/analytics' && <AnalyticsPanel />}

                {/*── /settings panel ────────────────────────────────────*/}
                {activePath === '/settings' && <SettingsPanel />}

                {/*── /profile panel ─────────────────────────────────────*/}
                {activePath === '/profile' && (
                    <ViewPanel
                        username={username}
                        links={links}
                        name={name}
                        avatarSrc={initialProfile.avatarSrc}
                    />
                )}
            </main>

            {/*==============Sticky FAB========================*/}
            {/*// 3. Replace the sticky FAB section with the dirty-aware version:*/}

            {/* ── Sticky action area ───────────────────────────────────────────────── */}
            {showFab && (
                <div className="sticky bottom-0 px-4 pb-6 pt-3 bg-gradient-to-t from-slate-100 dark:from-slate-950 to-transparent flex flex-col gap-3">

                    {/*
      Unsaved changes bar — only rendered when isDirty is true.

      This follows the standard mobile UX pattern: don't clutter the screen
      with a publish button until there's actually something to publish.
      The bar slides into view the moment the user makes any change.

      CSS transition on the bar itself gives the slide-in feel.
      We use conditional rendering (not opacity/translate) here because
      the bar takes up space — we want the FAB to move up when it appears.
    */}
                    {isDirty && (
                        <div
                            className={[
                                'flex items-center justify-between gap-3',
                                'px-4 py-3',
                                'bg-white dark:bg-slate-900',
                                'border border-brand-200 dark:border-brand-800',
                                'rounded-2xl shadow-sm',
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
          ── ATOM: Button — Publish Changes ───────────────────────────────
          size="sm" → compact, fits inside the unsaved changes bar.
          variant="primary" → brand-600 purple, stands out against the bar.
          loading={publishLoading} → spinner during the async save.
        */}
                            <Button
                                variant="primary"
                                size="sm"
                                loading={publishLoading}
                                onClick={() => onPublish?.({ name, bio, links })}
                                type="button"
                                className="flex-shrink-0"
                            >
                                Publish
                            </Button>
                        </div>
                    )}

                    {/*
      ── ATOM: Button — Add new link FAB ──────────────────────────────────
      Unchanged from the original — always visible on /dashboard panel.
    */}
                    <Button
                        variant="primary"
                        size="xl"
                        fullWidth
                        leftIcon={<Plus className="w-5 h-5" />}
                        onClick={() => setAddOpen(true)}
                        type="button"
                    >
                        Add new link
                    </Button>

                </div>
            )}

            <AddLinkModal
                isOpen={addOpen}
                onClose={() => setAddOpen(false)}
                onAdd={handleAddLink}
            />
        </div>
    );
};

export default MobileDashboardPage;