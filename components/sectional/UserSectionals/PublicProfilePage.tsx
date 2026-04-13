'use client';

import React from 'react';
import { MapPin, Heart, Share2, QrCode } from 'lucide-react';

//--Atomic Imports--------------------------------------//
import Avatar from '@/components/atomic/Avatar';
import Button from '@/components/atomic/Button';

//--Molecular Imports--------------------------------------//
import PublicLinkItem from "@/components/molecular/PublicLinkItem";
import StatBar from "@/components/molecular/StatBar";
import PublicBranding from "@/components/sectional/UserSectionals/PublicBranding";

// Public link interface
export interface PublicLink {
    id: string;
    title: string;
    href: string;
    icon?: React.ReactNode;
    highlighted?: boolean;
}

// Main Component Props-------------------------------------//
export interface PublicProfilePageProps {
    avatarSrc?: string;
    name?: string;
    tagline?: string;
    location?: string;
    links: PublicLink[];
    bio?: string;
    showBranding?: boolean;
    stats?: {
        likes: string;
        shares: string;
    };
    className?: string;
}


const PublicProfilePage:React.FC<PublicProfilePageProps> = ({
    avatarSrc,
    name,
    tagline,
    location,
    links,
    showBranding = false,
    stats,
    bio,
    className,
}) => {
    return (
        <div
            className={[
                'min-h-screen bg-white dark:bg-slate-950',
                'flex flex-col items-center',
                'px-5 py-10',
                className,
            ].join(' ')}
        >
            <header className={"flex flex-col items-center text-center max-w-sm w-full mb-8"}>
                {/*Header: Contains the [userPublic]'s avatar, name, and tagline*/}
                <Avatar
                    name={name}
                    size={"2xl"}
                    src={avatarSrc}
                    className={"mb-5"}
                />
            {/*    Profile name -> The page's primary heading*/}
                <h1
                    className={[
                        'font-display font-extrabold mb-1',
                        'text-2xl text-slate-900 dark:text-white',
                    ].join(' ')}
                >{name}</h1>
                {/*User status or tagline---------------------- */}
                <p
                    className={[
                        'font-display font-bold text-xs',
                        'tracking-widest uppercase',
                        'text-brand-400 dark:text-brand-400',
                        'mb-3',
                    ].join(' ')}
                >
                    {tagline}
                </p>
            {/*    Conditionally rendered bio---------------------*/}
                {bio && (
                    <p
                        className={[
                            'font-body text-sm ',
                            'text-slate-500 dark:text-slate-400',
                            'mb-5 leading-relaxed',
                        ].join(' ')}
                    >
                        {bio}
                    </p>
                )}

            {/*Conditionally rendered location--------------------*/}
                {location && (
                    <div
                        className={[
                            'inline-flex items-center gap-1.5',
                            'px-3 py-1.5 rounded-full bg-slate-50',
                            'dark:bg-slate-900 border border-slate-200 dark:border-slate-500',
                            'text-xs font-body text-slate-500 dark:text-slate-400',
                        ].join(' ')}
                    >
                        <MapPin className="w-3 h-3" aria-hidden="true"/>
                        {location}
                    </div>
                )}
            </header>
            {/*Main Content: Contains the [userPublic]'s links'*/}
            <main
                aria-label={"Profile links"}
                className={"w-full max-w-sm flex flex-col gap-3 mb-8"}
            >
                {links.map((link) => (
                    <PublicLinkItem
                        key={link.id}
                        title={link.title}
                        href={link.href}
                        icon={link.icon}
                        variant={link.highlighted ? 'highlighted' : 'default'}
                    />
                ))}
            </main>
        {/*    Stat: Users stats count and a shareable QR code*/}
            {stats && (
                <StatBar
                    className={"mb-8"}
                    stats={[
                        {
                            icon:  <Heart  className="w-5 h-5" />,
                            count: stats.likes,
                            label: 'likes',
                        },
                        {
                            icon:  <Share2 className="w-5 h-5" />,
                            count: stats.shares,
                            label: 'shares',
                        },
                        {
                            icon:  <QrCode className="w-5 h-5" />,
                            count: 'QR',
                            label: 'QR code',
                            // onClick would open a QR code modal — wired up by the parent
                        },
                    ]}
                />
            )};

        {/*Branding footer---------------------------------*/}
            {showBranding && (
                <PublicBranding/>
            )}
        </div>
    );
};

export default PublicProfilePage;
