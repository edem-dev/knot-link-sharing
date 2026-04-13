import React from 'react';
import Avatar from "@/components/atomic/Avatar";
import {ArrowUpRight, Link2, Mail, Play, QrCode, Share2} from "lucide-react";

const PREVIEW_LINKS = [
    { id: '1', title: 'Latest Portfolio',   Icon: ArrowUpRight },
    { id: '2', title: 'YouTube Channel',    Icon: Play         },
    { id: '3', title: 'Weekly Newsletter',  Icon: Mail         },
] as const;

const ProfilePreviewCard:React.FC = () => {
    return (
        <div
            className={[
                'bg-white dark:bg-slate-900 rounded-3xl',
                'shadow-2xl shadow-brand-200/50 dark:shadow-brand-900/30',
                'overflow-hidden w-full max-w-sm mx-auto',
                'border border-slate-100 dark:border-slate-800',
            ].join(' ')}
            role="img"
            aria-label="Preview of a Knotted public profile page"
        >
            {/* Browser chrome — three coloured dots */}
            <div className="flex items-center gap-1.5 px-4 pt-4 pb-3" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>

            {/* Profile header */}
            <div className="flex flex-col items-center px-6 pb-4">
                <Avatar name="Alex Rivers" size="lg" className="mb-3" />
                <p className="font-display font-bold text-slate-900 dark:text-white text-base">
                    Alex Rivers
                </p>
                <p className="font-body text-brand-600 dark:text-brand-400 text-xs mt-0.5">
                    Digital Artist &amp; Creative Developer
                </p>
            </div>

            {/* Link list */}
            <div className="px-4 pb-5 flex flex-col gap-2">
                {PREVIEW_LINKS.map(({ id, title, Icon }) => (
                    <div
                        key={id}
                        className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl"
                    >
          <span className="text-sm font-display font-medium text-slate-800 dark:text-white">
            {title}
          </span>
                        <Icon className="w-4 h-4 text-brand-500" aria-hidden="true" />
                    </div>
                ))}
            </div>

            {/* Footer action row */}
            <div
                className="flex items-center justify-center gap-4 px-4 py-3 border-t border-slate-100 dark:border-slate-800"
                aria-hidden="true"
            >
                {[Share2, Link2, QrCode].map((Icon, i) => (
                    <span key={i} className="text-slate-300 dark:text-slate-600">
          <Icon className="w-4 h-4" />
        </span>
                ))}
            </div>
        </div>    );
};

export default ProfilePreviewCard;
