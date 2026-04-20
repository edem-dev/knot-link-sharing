'use client';
import React, {useCallback, useState} from 'react';
import Link from "next/link";

//Sectional Components---------------------------------------------------//
import DashboardSidebar from "@/components/sectional/DashboardSectionals/DashboardSidebar";

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
import {LinkRowData} from "@/components/molecular/EditableLinkRow";

//Lucide Icons Import
import {
    BarChart2,
    Eye,
    Globe,
    LayoutDashboard,
    MousePointerClick,
    Plus,
    PlusIcon,
    Settings, TrendingUp,
    User,
    Users
} from "lucide-react";
import PageURLBanner from "@/components/molecular/PageURLBanner";

//==================Clerk Sin out import===========================//
import { useClerk } from '@clerk/nextjs'

//Nav Items --------------------------------------------------------------//
const NAV_ITEMS = [
    { href: '/dashboard', label: 'Dashboard',    Icon: LayoutDashboard },
    { href: '/profile',   label: 'View my page', Icon: Eye             },
    { href: '/analytics', label: 'Analytics',    Icon: BarChart2       },
    { href: '/settings',  label: 'Settings',     Icon: Settings        },
] as const;

// Derived types of NAV_ITEMS this creates an array from the 'hrefs of NAV_ITEMS' and
//new hrefs are auto automatically added

type NavHref = (typeof  NAV_ITEMS)[number]["href"]

//--Dashboard Page Props------------------------------------------------------//
export interface DashboardPageProps{
    // Profile data that is loaded server-side. The page mounts it to the client
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
    onAddOpen:()=> void;
    avatarName:string;
    avatarSrc?:string;
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
    onAddOpen,
    avatarName,
    avatarSrc,
}) => {
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
                    {links.map((link) => (
                      <EditableLinkRow
                          key={link.id}
                          link={link}
                          onChange={onLinkChange}
                          onDelete={onLinkDelete}
                      />
                    ))}

                {/*=================== Empty State: ADD zone=================*/}
                    <button
                        type={"button"}
                        onClick={onAddOpen}
                        aria-label={"Add Link new link to you page"}
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

//===========================Analytics Panel ==========================================//
//This panel is shown when 'activePath === "/analytics"'. Contains hardcoded data
//TODO:Replace hardcoded data with actual analytics data from API



const AnalyticsPanel:React.FC = () => {
    //===================Overview stats data ==========================//
    const overviewStats = [
        { label: 'Total Views',  value: '12,847', delta: '+12% this week', Icon: Globe             },
        { label: 'Link Clicks',  value: '3,291',  delta: '+8% this week',  Icon: MousePointerClick },
        { label: 'Followers',    value: '1,024',  delta: '+24 this week',  Icon: Users             },
        { label: 'Top Link CTR', value: '34.2%',  delta: 'Portfolio',      Icon: TrendingUp        },
    ]

    //================== Top Links ====================================//
    const topLinks = [
        { title: 'Portfolio Website', clicks: 892, pct: 72 },
        { title: 'Latest Case Study', clicks: 421, pct: 34 },
        { title: 'YouTube Channel',   clicks: 210, pct: 17 },
    ];


    return (
        <div className={"flex flex-col gap-6"}>
        {/* ================== Overview Stats Section ==================*/}
            <section
                className={[
                    'bg-white dark:bg-slate-900',
                    'rounded-3xl border border-slate-100',
                    'dark:border-slate-800 p-6',
                ].join(' ')}
            >
                <h2
                    id={"analytics-overview-heading"}
                    className={[
                        'font-display font-bold text-base',
                        'text-slate-800 dark:text-white',
                        'flex items-center gap-2 mb-6',
                    ].join(' ')}
                >
                    <BarChart2 className={"w-5 h-5 text-brand-500"} aria-hidden={"true"}/>
                    Overview
                </h2>

            {/*==============================Analytics Data ==========================*/}
                <div className={"grid grid-cols-2 gap-4"}>
                    {overviewStats.map(({ label, value, delta, Icon}) => (
                        <div
                            key={label}
                            className={[
                                'flex flex-col  gap-2',
                                'bg-slate-50 dark:bg-slate-800',
                                'rounded-2xl p-4',
                            ].join(' ')}
                        >
                            <div className={"flex items-center gap-2"}>
                                <Icon className={"w-5 h-5 text-brand-500 dark:text-brand-400"} aria-hidden={"true"}/>
                                <span
                                    className={[
                                        'font-display font-semibold text-xs',
                                        'uppercase tracking-widest text-slate-500 dark:text-slate-400',
                                    ].join(' ')}
                                >
                                    {label}
                                </span>
                            </div>
                            <p
                                className={[
                                    'font-display font-extrabold text-2xl',
                                    'text-slate-900 dark:text-white',
                                ].join(' ')}
                            >
                                {value}
                            </p>
                            <p className={"text-xs font-body text-slate-400 dark:text-slate-500"}>{delta}</p>
                        </div>
                    ))}
                </div>
            </section>

        {/*============================= Top Links Stats Section============================*/}
            <section
                aria-labelledby={"analytics-top-links-heading"}
                className={[
                    'bg-white dark:bg-slate-900',
                    'rounded-3xl border border-slate-100',
                    'dark:border-slate-800 p-6',
                ].join(' ')}
            >
                {/*=====================Top Links Heading ========================*/}
                <h2
                    id={"analytics-top-links-heading"}
                    className={[
                        'font-display font-bold text-base',
                        'text-slate-800 dark:text-white mb-6',

                    ].join(' ')}
                >
                    Top Links
                </h2>
                {/*======================Top Links Content=====================*/}
                <div className={"flex flex-col gap-4"}>
                    {topLinks.map(({ title, clicks, pct }) => (
                        <div key={title}>
                            <div className={"flex items-center justify-between mb-2"}>
                                <span
                                    className={[
                                        'text-sm font-body font-medium ',
                                        'text-slate-700 dark:text-slate-200',
                                        'truncate',
                                    ].join(' ')}
                                >
                                    {title}
                                </span>
                                <span
                                    className={"text-sm font-body text-slate-500 flex-shrink-0 ml-3"}
                                >
                                    {clicks} clicks
                                </span>
                            </div>
                        {/*=====================Progress Bar =======================*/}
                            <div
                                className={"h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden"}
                            >
                                <div
                                    className={"h-full bg-brand-600 rounded-full transition-all duration-500"}
                                    style={{ width: `${pct}%` }}
                                    // inline style — Tailwind can't generate arbitrary % widths
                                    // from dynamic values. Inline style is correct here.
                                    role={"progressbar"}
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
//===========================Analytics Panel ==========================================//


//===========================Settings Panel ==========================================//
// Shows when activePath ====/'settings'
const SettingsPanel:React.FC = () => (
    <div className={"flex flex-col gap-6"}>
    {/*=========================Account Settings Section==========================*/}
        <section
            className={[
                'bg-white dark:bg-slate-900',
                'rounded-3xl border border-slate-100',
                'dark:border-slate-800 p-6',
            ].join(' ')}
        >
            <h2
                id={"settings-heading"}
                className={`font-display font-bold text-base 
                    text-slate-800 dark:text-white flex items-center gap-2 mb-6`}
            >
                <Settings className="w-5 h-5 text-brand-500" aria-hidden="true" />
                Account Settings
            </h2>

            {/*========================Settings Section ==========================*/}
            <div className={"flex flex-col gap-4"}>
                {/*
                  MOLECULE: FormField + ATOM: Input — Email =======================
                 defaultValue → uncontrolled for this demo.
                    //TODO:In production: make this controlled with its own useState.
                */}

                <FormField label={"Email Address"} htmlFor={"settings-email"}>
                    <Input
                        id={"settings-email"}
                        type={"email"}
                        value={""}
                        defaultValue={"alex@example.com"}
                        placeholder={"Your email address"}
                        autoComplete={"email"}
                    />
                </FormField>

                {/*
                    ==== MOLECULE: FormField + ATOM: Input — Email =======================
                    defaultValue → uncontrolled for this demo.
                    //TODO: In production: make this controlled with its own useState.
                */}
                <FormField label={"Username"} htmlFor={"settings-username"}>
                    <Input
                        id={"settings-username"}
                        type={"text"}
                        defaultValue={"alexrivers"}
                        prefix={"knotted.to/"}
                        placeholder={"yourname"}
                        autoComplete={"off"}
                        spellCheck={false}
                    />
                </FormField>

                {/*======================Save Changes Button======================*/}
                <Button
                    variant={"primary"}
                    size={"md"}
                    type={"button"}
                    onClick={() => {/* TODO: PATCH /api/settings */ }}
                >
                    Save Changes
                </Button>
            </div>
        </section>
        {/*===============================Danger Zone============================= */}
        <section
            className={[
                "bg-white dark:bg-slate-900",
                "rounded-3xl border border-red-100",
                "dark:border-red-900/50 p-6",
            ].join(" ")}
            aria-labelledby={"danger-zone-heading"}
        >
        {/*=========================Danger Zone Heading=========================*/}
            <h2
                id={"danger-zone-heading"}
                className={"font-display font-bold text-base text-red-600 dark:text-red-400 mb-2"}
            >
                Danger Zone
            </h2>
            <p className={"font-body text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4"}>
                Permanently delete your account and all your data. This cannot be undone.
            </p>

            <Button
                variant={"danger"}
                size={"md"}
                type={"button"}
                onClick={() => { /* TODO: open confirmation Modal → DELETE /api/account */ }}
            >
                Delete Account
            </Button>
        </section>
    </div>
);

//===========================Settings Panel ==========================================//


//===========================View  Panel ==========================================//
// =================View panel props ================================================//
interface ViewPagePanelProps {
    username:   string;
    links:      LinkRowData[];
    name:       string;
    avatarSrc?: string;
}



const ViewPanel: React.FC<ViewPagePanelProps> = ({
    username,
    links,
    name,
    avatarSrc,
}) => {
    return (
        <div
            className={[
                "bg-white dark:bg-slate-900",
                "rounded-3xl border border-slate-100",
                "dark:border-slate-800 p-6",
            ].join(" ")}
            aria-labelledby={"view-page-heading"}
        >
            {/*================= View Page Heading=================*/}
            <div className={"flex items-center justify-between mb-6"}>
                <h2
                    id={"view-page-heading"}
                    className={[
                        "font-display font-bold text-base",
                        "text-slate-800 dark:text-white",
                        "flex items-center gap-2",
                    ].join(" ")}
                >
                    <Eye className={"w-5 h-5 text-brand-500"} aria-hidden={"true"} />
                    Your Public Page
                </h2>
                {/*=========================User's Public Link======================*/}
                <Link
                    href={`https://knotted.to/${username}`}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                    className={[
                        "inline-flex items-center gap-2",
                        "px-3 py-1.5",
                        "text-sm font-medium",
                        "text-brand-600 bg-brand-50 dark:bg-brand-900/50",
                        "rounded-full",
                    ].join(" ")}
                    >
                    Open in new tab →
                </Link>
            </div>

            {/* Embedded preview container */}
            <div className="flex flex-col items-center py-8 border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-950">

                {/*
                ── ATOM: Avatar ─────────────────────────────────────────────────────

                size="2xl" → 112px — matches the real PublicProfilePage avatar size.
                No editable prop — this is a read-only preview. The edit surface is
                back in Editor Panel where Avatar has editable=true.

                This avatar updates live when the user changes their profile photo
                and publishes, because it receives avatarSrc from the same prop.
                */}
                <Avatar
                    name={name}
                    src={avatarSrc}
                    size={"2xl"}
                    className={"mb-4"}
                />

                <h3 className={"font-display font-extrabold text-xl text-slate-900 dark:text-white mb-1"}>
                    {name}
                </h3>
                <p className={"font-display font-bold text-xs tracking-widest uppercase text-brand-600 dark:text-brand-400 mb-6"}>
                    Knotted Creator
                </p>

                {/* Preview link list */}
                <div className={"w-full max-w-xs flex flex-col gap-2 px-4"}>
                    {links.length > 0
                        ? links.map((link) => (
                            <div
                                key={link.id}
                                className={[
                                            "flex items-center",
                                            "justify-between px-4 py-3 bg-white" ,
                                            "dark:bg-slate-900 rounded-xl border",
                                            "border-slate-200 dark:border-slate-700"
                                ].join(" ")}
                            >
              <span className={"text-sm font-display font-medium text-slate-800 dark:text-white truncate"}>
                {link.title || 'Untitled link'}
              </span>
                                <span className={"text-slate-400 ml-2 shrink-0 text-sm"}>
                                    →
                                </span>
                            </div>
                        ))
                        : (
                            <p className={"text-sm font-body text-slate-400 text-center py-4"}>
                                No links yet — add some in the Dashboard tab.
                            </p>
                        )
                    }
                </div>

            </div>
        </div>
    );
};

// =================View Panel ================================================//




// =================================================================//
//=========== Main Component: Dashboard Page=======================//
// =================================================================//




const DashboardPage:React.FC<DashboardPageProps> = ({
    initialProfile = {name: 'Michael Kumah', bio: '', role: 'Knotted Creator', avatarSrc: ''},
    initialLinks = [],
    username = 'michaelkumah',
    onPublish,
    publishLoading = false,
    className = '',
}) => {

    const { signOut } = useClerk();

    const handleSignOut = useCallback(() => {
        signOut({ redirectUrl: '/' });
    }, [signOut]);

    //================== Active Panel State==========================//
    const [activePath, setActivePath] = useState<NavHref>("/dashboard")

    //================= Profile State ===============================//
    const [name, setName] = useState(initialProfile.name)
    const [bio, setBio] = useState(initialProfile.bio)

    //==================Links State ==================================//
    const [links, setLinks] = useState<LinkRowData[]>(initialLinks)
    const [addOpen, setAddOpen] = useState(false)

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

    const handleAddLink = useCallback(
        (newLink: Omit<LinkRowData, 'id'>) => {
            // Omit<LinkRowData, 'id'> → AddLinkModal passes { title, url } without id.
            // crypto.randomUUID() generates a cryptographically random UUID string.
            // id generation lives HERE — the single place that owns the links state.
            setLinks((prev) => [
                ...prev,
                { ...newLink, id: crypto.randomUUID() },
            ]);
            setAddOpen(false);
        },
        []
    );
    //================ Link Change Handlers ==========================//

    //====================== Handle URL Copy=========================//
    const handleCopyUrl = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(`https://knotted.com/${username}`);
        } catch { /* silent fail — URL is visible on screen */ }
        setUrlCopied(true);
        setTimeout(() => setUrlCopied(false), 2000);
    }, [username]); // username IS a dep — changing it changes the URL to copy
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
                        onAddOpen={() => setAddOpen(true)}
                        avatarName={initialProfile.name}
                        avatarSrc={initialProfile.avatarSrc}
                    />
                );
                case "/analytics": return <AnalyticsPanel />;
                case "/settings": return <SettingsPanel />;
                case "/profile": return (
                    <ViewPanel
                        username={username}
                        links={links}
                        name={name}
                        avatarSrc={initialProfile.avatarSrc}
                    />
                );
                default: return null;
        }
    };

    //======================Derived values from active path==========================//
    const activeLabel =
        NAV_ITEMS.find((item)=> item.href=== activePath)?.label ?? 'Dashboard';

    // Record<NavHref, string> → TypeScript enforces ALL four keys are present.
    // Better than a switch or if/else — adding a new panel causes a TS error
    // reminding you to add its subtitle too.
    const panelSubtitles: Record<NavHref, string> = {
        '/dashboard': 'Personalize your digital identity',
        '/profile':   'Preview your public Knotted page',
        '/analytics': 'Track your audience and engagement',
        '/settings':  'Manage your account preferences',
    };
    //======================PANEL ROUTING==================================//

    //======================================================================//
    //====================== Render page====================================/
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
                    role:      initialProfile.role ?? 'Knotted Creator',
                    avatarSrc: initialProfile.avatarSrc,
                }}
                activePath={activePath}
                onNavChange={(href) => setActivePath(href as NavHref)}
                // `as NavHref` — DashboardSidebar types onNavChange as (href: string) => void.
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
                            url="knotted.to/alexrivers"
                            subLabel="Share your link with your audience"
                            onCopy={handleCopyUrl}
                        />
                    {/*===============Publish Button========================*/}
                        {activePath === '/dashboard' && (
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
