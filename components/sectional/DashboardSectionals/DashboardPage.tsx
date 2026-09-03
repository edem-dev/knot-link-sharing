'use client';
import React, {useCallback, useState} from 'react';
import {createClient} from "@/lib/supabase/client";

import Link from "next/link";

//Sectional Components---------------------------------------------------//
import DashboardSidebar from "@/components/sectional/DashboardSectionals/DashboardSidebar";
import AnalyticsPanel from "@/components/sectional/DashboardSectionals/AnalyticsPanel";
import SettingsPanel from "@/components/sectional/DashboardSectionals/SettingsPanel";
import ViewPanel from "@/components/sectional/DashboardSectionals/ViewPanel";

//--Molecular Components -------------------------------------------------//
import FormField from "@/components/molecular/Formfield";
import EditableLinkRow from "@/components/molecular/EditableLinkRow";
import AddLinkModal from "@/components/molecular/AddLinkModal";

//--Atomic Components ----------------------------------------------------//
import Avatar from "@/components/atomic/Avatar";
import Button from "@/components/atomic/Button";
import Input from "@/components/atomic/Input";
import Textarea from "@/components/atomic/Textarea";

// Imported interfaces
import type { LinkRowData } from "@/types";

//Lucide Icons Import
import {
    BarChart2,
    Eye,
    LayoutDashboard,
    Plus,
    PlusIcon,
    Settings,
    User,
} from "lucide-react";
import PageURLBanner from "@/components/molecular/PageURLBanner";
import {useRouter} from "next/navigation";

//==========================Drag and drop==========================//
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
    sortableKeyboardCoordinates,
    arrayMove,
} from '@dnd-kit/sortable';
//==========================Drag and drop==========================//

//Nav Items --------------------------------------------------------------//
const NAV_ITEMS = [
    { href: '/dashboard', label: 'Dashboard',    Icon: LayoutDashboard },
    { href: '/profile',   label: 'View my route', Icon: Eye             },
    { href: '/analytics', label: 'Analytics',    Icon: BarChart2       },
    { href: '/settings',  label: 'Settings',     Icon: Settings        },
] as const;

// Derived types of NAV_ITEMS this creates an array from the 'hrefs of NAV_ITEMS' and
//new hrefs are auto automatically added

type NavHref = (typeof  NAV_ITEMS)[number]["href"]

//--Dashboard Page Props------------------------------------------------------//
export interface DashboardPageProps{
    // Profile data that is loaded server-side. The route mounts it to the client
    //via useState
    initialProfile?: {
        name:string;
        bio:string;
        role?:string;
        avatarSrc?:string;
    }

    //Links that are loaded from the db passed the use state as initail value
    initialLinks?: LinkRowData[];

    username?:string;

    //This is a function that ic called when the user clicks 'Publish Changes'
    onPublish?: (
        data:{
            name:string;
            bio:string;
            links:LinkRowData[];
        }
    ) => void;

    //When this prop is true the 'Publish Changes' button changes to a spinner icon.
    publishLoading?:boolean;

    //An extra tailwind class for additional styling
    className?:string;
    //Avatar uploading props
    onAvatarEdit?:    () => void       // â† add this
    avatarUploading?: boolean

    //=========== User identity / session ============================//
    // Email address shown inside the avatar dropdown menu (mobile navbar).
    userEmail?: string;
    // Called when the user clicks "Sign Out" inside the avatar dropdown.
    onSignOut?: () => void;
}

// ------------------------------------------------------------------------
//Internal Panels components and interfaces. Can be created exteranlly but for now they
//are created here
//--------------------------------------------------------------------------

//===========================Editor Panel ==========================================//
interface EditorPanelProps{
    name: string;
    setName:(value:string) => void;
    bio: string;
    setBio: (value:string) => void;
    links: LinkRowData[];
    onLinkChange: (id:string, field:"title" | "url" , value:string)=> void;
    onLinkDelete: (id:string)=> void;
    onaLinkToggleActive: (id:string)=> void;
    onLinksReorder: (activeId: string, overId: string) => void
    onAddOpen:()=> void;
    avatarName:string;
    avatarSrc?:string;
    onAvatarEdit?:    () => void;
    avatarUploading?: boolean;
}

//Editor panel component-----------------------------------------------------------//
const EditorPanel: React.FC<EditorPanelProps> = ({
    name,
    setName,
    bio,
    setBio,
    links,
    onLinkChange,
    onLinkDelete,
    onaLinkToggleActive,
    onLinksReorder,
    onAddOpen,
    avatarName,
    avatarSrc,
    onAvatarEdit,
    avatarUploading

}) => {

    //================== What counts as starting a drag===================//
    const sensors = useSensors(
        useSensor(PointerSensor,{
            activationConstraint: {distance: 8},
        }),
        useSensor(KeyboardSensor,{
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    //================== What counts as starting a drag===================//

    //================== Drag handler===================//
    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        if (!over || active.id === over.id) return;
        onLinksReorder(String(active.id), String(over.id))
    }
    //================== Drag handler===================//


    return (
        <div className={"flex flex-col gap-6"}>
            {/*==Profile section=====================================================*/}
            <section
                className={[
                    'bg-white dark:bg-slate-900',
                    'rounded-3xl border border-slate-100',
                    'dark:border-slate-800 px-6 py-4',
                ].join(" ")}
                aria-label={"Profile-section-heading"}
            >
                {/*//=====================Profile heading ========================//*/}
                <h2
                    className={[
                        'font-display font-bold text-base',
                        'text-slate-800 dark:text-white',
                        'flex items-center gap-2 mb-4',
                    ].join(" ")}
                >
                    <User className={"w-5 h-5 text-brand-500"} aria-hidden={"true"}/>
                    Profile Section
                </h2>
                <div className={"flex gap-4"}>
                    {/*//=====================Avatar: Display Image ========================//*/}
                    <Avatar
                        name={avatarName}
                        src={avatarSrc}
                        alt={avatarName}
                        size={"2xl"}
                        editable={true}
                        className={"shrink-0"}
                        onEdit={onAvatarEdit}
                    />

                    <div className={"flex-1 flex flex-col gap-4"}>
                        {/*//====================Form Field: Display Name======================*/}
                        <FormField
                            label={"Display Name"}
                            htmlFor={"display-name"}
                        >
                            <Input
                                id={"display-name"}
                                type={"text"}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={"Your name"}
                            />
                        </FormField>

                        {/*//====================Form Field: Bio======================    */}
                        <FormField label={"Bio"} htmlFor={"bio"}>
                            <Textarea
                                id={"bio"}
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder={"Tell th world about yourself..."}
                                rows={4}
                                maxLength={160}
                                currentLength={bio.length}
                            />
                        </FormField>
                    </div>
                </div>
            </section>

        {/*======================Links amd Socials=============================*/}
            <section
                className={[
                    'bg-white dark:bg-slate-900',
                    'rounded-3xl border border-slate-100',
                    'dark:border-slate-800 p-6',
                ].join(' ')}
                aria-labelledby={"links-section-heading"}
            >
                <div className={"flex items-center justify-between mb-5"}>
                    <h2
                        className={[
                            'font-display font-bold text-base',
                            'text-slate-800 dark:text-white',
                            'flex items-center gap-2',
                        ].join(' ')}
                        id={"links-section-heading"}
                    >
                        Links &amp; Socials
                    </h2>

                    <Button
                        variant={"secondary"}
                        size={"sm"}
                        leftIcon={<Plus className={"w-3.5 h-3.5"}/>}
                        onClick={onAddOpen}
                        type={"button"}
                    >
                        Add Link
                    </Button>
                </div>

                <div className={"flex flex-col gap-3"}>
                {/*================== Editable Link Row====================*/}
                    <DndContext
                        id={"dashboard-links"}
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={links.map((l) => l.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {links.map((link) => (
                                <EditableLinkRow
                                    key={link.id}
                                    link={link}
                                    onChange={onLinkChange}
                                    onDelete={onLinkDelete}
                                    onToggleActive={onaLinkToggleActive}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>

                {/*=================== Empty State: ADD zone=================*/}
                    <button
                        type={"button"}
                        onClick={onAddOpen}
                        aria-label={"Add Link new link to you route"}
                        className={[
                            'flex flex-col items-center justify-center gap-2 w-full py-8',
                            'border-2 border-dashed border-slate-200 dark:border-slate-700',
                            'rounded-2xl',
                            'text-slate-400 hover:text-brand-600 dark:hover:text-brand-400',
                            'hover:border-brand-300 dark:hover:border-brand-700',
                            'transition-all duration-150',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600',
                        ].join(' ')}
                    >
                        <Plus className={"w-6 h-6"} aria-hidden={"true"}/>
                        <span className={"text-sm font-body"}>Add new link to your page</span>
                    </button>
                </div>
            </section>
        </div>
    )}
//===========================Editor Panel ==========================================//

//===========================Removed Panels =========================================//
// `AnalyticsPanel`, `SettingsPanel` and `ViewPanel` were previously declared inline
// in this file AND in MobileDashboardPage.tsx (identical code). They have been
// extracted into shared components in this same folder:
//   - ./AnalyticsPanel.tsx
//   - ./SettingsPanel.tsx
//   - ./ViewPanel.tsx
// They are imported at the top of this file.
//===================================================================================//





// =================================================================//
//=========== Main Component: Dashboard Page=======================//
// =================================================================//




const DashboardPage:React.FC<DashboardPageProps> = (
    {
        initialProfile = {name: 'Michael Kumah', bio: '', role: 'Knotted Creator', avatarSrc: ''},
        initialLinks = [],
        username: initialUsername = 'michaelkumah',
        onPublish,
        publishLoading = false,
        className = '',
        onAvatarEdit,
        avatarUploading,
        userEmail,
    }) => {




    //================== Active Panel State==========================//
    const [activePath, setActivePath] = useState<NavHref>("/dashboard")

    //================= Profile State ===============================//
    const [name, setName] = useState(initialProfile.name)
    const [bio, setBio] = useState(initialProfile.bio)

    //==================Links State ==================================//
    const [links, setLinks] = useState<LinkRowData[]>(initialLinks)
    const [addOpen, setAddOpen] = useState(false)

    //==================Username State ==================================//
    const [username, setUsername] = useState(initialUsername)

    //=================Url copy State ================================//
    const [urlCopied, setUrlCopied] = useState(false)

    //================ Link Change Handlers ==========================//
    //useCallback is used to prevent constant re-renders of the components
    const handleLinkChange = useCallback(
        (id:string, field: 'title' | 'url', value:string) =>{
            setLinks((prev) =>
                prev.map((l) => l.id === id ? {...l, [field]: value} : l)
            )
        },
        []
    );

    const handleLinkDelete = useCallback(
        (id:string) => {
            setLinks((prev) => prev.filter((l) => l.id !== id))
        },
        []
    );

    const handleLinkReorder = useCallback((activeId: string, overId: string) => {
        setLinks((prev) => {
            const oldIndex = prev.findIndex((l) => l.id === activeId);
            const newIndex = prev.findIndex((l) => l.id === overId);
            if (oldIndex === -1 || newIndex === -1) return prev;   // safety guard
            return arrayMove(prev, oldIndex, newIndex);
        });
    }, []);

    const handleLinkToggleActive = useCallback(
        (id: string) => {
            setLinks((prev) =>
                prev.map((l) => (l.id === id ? { ...l, isActive: !l.isActive } : l))
            )
        },
        []
    );

    const handleAddLink = useCallback(
        (newLink: Omit<LinkRowData, 'id'>) => {
            // Omit<LinkRowData, 'id'> â†’ AddLinkModal passes { title, url } without id.
            // crypto.randomUUID() generates a cryptographically random UUID string.
            // id generation lives HERE â€” the single place that owns the links state.
            setLinks((prev) => [
                ...prev,
                { ...newLink, id: crypto.randomUUID() , isActive: newLink.isActive ?? true},
            ]);
            setAddOpen(false);
        },
        []
    );
    //================ username save Handlers ==========================//
    const handleUsernameSaved = useCallback((newUsername: string) => {
        setUsername(newUsername)
    }, [])


    //====================== Handle URL Copy=========================//
    const handleCopyUrl = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(`https://knottted.vercel.app/${username}`);
        } catch { /* silent fail â€” URL is visible on screen */ }
        setUrlCopied(true);
        setTimeout(() => setUrlCopied(false), 2000);
    }, [username]); // [getusername] IS a dep â€” changing it changes the URL to copy
    //====================== Handle URL Copy=========================//

    //======================PANEL ROUTING==================================//
    const renderPanel = ():React.ReactNode => {
        switch (activePath) {
            case "/dashboard":
                return (
                    <EditorPanel
                        name={name}
                        setName={setName}
                        bio={bio}
                        setBio={setBio}
                        links={links}
                        onLinkChange={handleLinkChange}
                        onLinkDelete={handleLinkDelete}
                        onaLinkToggleActive={handleLinkToggleActive}
                        onLinksReorder={handleLinkReorder}
                        onAddOpen={() => setAddOpen(true)}
                        avatarName={initialProfile.name}
                        avatarSrc={initialProfile.avatarSrc || undefined}
                        onAvatarEdit={onAvatarEdit}
                        avatarUploading={avatarUploading}
                    />
                );
                case "/analytics": return <AnalyticsPanel />;
                case "/settings": return (
                    <SettingsPanel
                        name={name}
                        setName={setName}
                        bio={bio}
                        setBio={setBio}
                        username={username}
                        onUsernameSaved={handleUsernameSaved}
                        userEmail={userEmail}
                    />
                );
                case "/profile": return (
                    <ViewPanel
                        username={username}
                        links={links}
                        name={name}
                        bio={bio}
                        avatarSrc={initialProfile.avatarSrc || undefined}
                    />
                );
                default: return null;
        }
    };

    //======================Derived values from active path==========================//
    const activeLabel =
        NAV_ITEMS.find((item)=> item.href=== activePath)?.label ?? 'Dashboard';

    // Record<NavHref, string> â†’ TypeScript enforces ALL four keys are present.
    // Better than a switch or if/else â€” adding a new panel causes a TS error
    // reminding you to add its subtitle too.
    const panelSubtitles: Record<NavHref, string> = {
        '/dashboard': 'Personalize your digital identity',
        '/profile':   'Preview your public Knotted route',
        '/analytics': 'Track your audience and engagement',
        '/settings':  'Manage your account preferences',
    };
    //======================PANEL ROUTING==================================//


    //======================Sign-out handler==================================//
    const router = useRouter();
    const supabase = createClient()
    async function handleSignOut() {
        const { error } = await supabase.auth.signOut()

        if (error) console.error("Error signing out:", error.message)

        router.push('/signin')
        router.refresh()
    }

    //======================================================================//
    //====================== Render route====================================/
    //======================================================================//

    return (
        <div
            className={[
                'flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden',
            ].join(' ')}
        >
        {/*========================= Dashboard Sidebar=======================*/}
            <DashboardSidebar
                user={{
                    name:      initialProfile.name,
                    role:      initialProfile.role ?? 'Creator',
                    avatarSrc: initialProfile.avatarSrc || undefined,
                }}
                activePath={activePath}
                onNavChange={(href) => setActivePath(href as NavHref)}
                // `as NavHref` â€” DashboardSidebar types onNavChange as (href: string) => void.
                // We assert it as NavHref because we know only NAV_ITEMS hrefs are passed.
                onSignOut={handleSignOut}
            />

        {/*=======================Main Content===============================*/}
            <div className={"flex-1 flex flex-col overflow-hidden"}>
            {/*==================== Top bar ========================*/}
                <header
                    className={[
                        'h-16 flex items-center justify-between px-8',
                        'border-b border-slate-100 dark:border-slate-800',
                        'bg-white dark:bg-slate-900 shrink-0',
                    ].join(' ')}
                >
                {/*===================== Left Panel: Panel title + Subtitle============*/}
                    <div>
                        <h1 className={"font-display text-lg font-bold text-slate-900 dark:text-white"}>
                            {activeLabel}
                        </h1>
                        <p className={"text-xs font-body text-slate-400 dark:text-slate-400"}>
                            {panelSubtitles[activePath]}
                        </p>
                    </div>
                {/* ===================Right Panel: URL Chip + Publish Button*/}
                    <div className={"flex items-center gap-2"}>
                        <PageURLBanner
                            url={`knottted.vercel.app/${username}`}
                            subLabel="Share your link with your audience"
                            onCopy={handleCopyUrl}
                        />
                    {/*===============Publish Button========================*/}
                        {(activePath === '/dashboard' || activePath === '/settings' )&& (
                            <Button
                                variant={"primary"}
                                size={"sm"}
                                type={"button"}
                                loading={publishLoading}
                                onClick={()=> onPublish?.({name, bio, links})}
                            >
                                Publish Changes
                            </Button>
                        )}
                    </div>
                </header>

            {/* ===================Dynamic Panel Area=========================*/}
                <main
                    className={"flex-1 overflow-y-auto px-8 py-8"}
                    aria-label={`${activeLabel} panel`}
                >
                    {renderPanel()}
                </main>
            {/* ===================Dynamic Panel Area=========================*/}
            </div>

            <AddLinkModal
                isOpen={addOpen}
                onClose={() => setAddOpen(false)}
                onAdd={handleAddLink}
            />
        </div>
    );
};

export default DashboardPage;
