'use client';

import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { Eye } from 'lucide-react';

import Avatar from '@/components/atomic/Avatar';
import { LinkRowData } from '@/components/molecular/EditableLinkRow';

//===========================View Panel ==========================================//
// Shared between Desktop `DashboardPage` and `MobileDashboardPage`.
// Shown when activePath === '/profile'.
export interface ViewPanelProps {
    username:   string;
    links:      LinkRowData[];
    name:       string;
    avatarSrc?: string;
}

const ViewPanel: React.FC<ViewPanelProps> = ({ username, links, name, avatarSrc }) => {
    return (
        <div
            className={clsx(
                'bg-white dark:bg-slate-900',
                'rounded-3xl border border-slate-100',
                'dark:border-slate-800 p-6'
            )}
            aria-labelledby="view-page-heading"
        >
            {/*================= View Page Heading=================*/}
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
                {/*=========================User's Public Link======================*/}
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

            {/* Embedded preview container */}
            <div className="flex flex-col items-center py-8 border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-950">
                {/*
                  ATOM: Avatar — read-only preview.
                  size="2xl" → 112px — matches the real PublicProfilePage avatar size.
                  No editable prop — the edit surface is on the Editor panel.
                */}
                <Avatar
                    name={name}
                    src={avatarSrc}
                    size="2xl"
                    className="mb-4"
                />

                <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white mb-1">
                    {name}
                </h3>

                {/* Preview link list */}
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

export default ViewPanel;
