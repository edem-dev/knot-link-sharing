'use client'
import React, { useEffect, useRef } from 'react';
import { LogOut } from 'lucide-react';
import Avatar from '@/components/atomic/Avatar';
import Divider from '@/components/atomic/Divider';
import Button from '@/components/atomic/Button';

//=====================================================================//
//=============== Avatar Menu Dropdown (Molecular) ====================//
//=====================================================================//
// A small dropdown menu that surfaces the current user's identity
// (username + email) along with a Sign Out action. Designed to be
// reusable wherever an Avatar acts as the trigger for a user menu
// (e.g. the Mobile Dashboard sticky navbar).
//---------------------------------------------------------------------//

export interface AvatarMenuDropdownProps {
    /** Whether the dropdown panel is currently visible */
    open: boolean;
    /** Called when the dropdown requests to close (outside click / Esc) */
    onClose: () => void;
    /** Display name / username of the current user */
    username: string;
    /** Email address of the current user */
    email?: string;
    /** Optional avatar image url shown in the menu header */
    avatarSrc?: string;
    /** Triggered when the user clicks the Sign Out / Log Out button */
    onSignOut?: () => void;
    /** Extra tailwind classes for the wrapping panel */
    className?: string;
}

const AvatarMenuDropdown: React.FC<AvatarMenuDropdownProps> = ({
    open,
    onClose,
    username,
    email,
    avatarSrc,
    onSignOut,
    className = '',
}) => {
    const panelRef = useRef<HTMLDivElement>(null);

    //================ Outside click + Escape handling ====================//
    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                panelRef.current &&
                !panelRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            ref={panelRef}
            role="menu"
            aria-label="User menu"
            className={[
                'absolute right-0 top-full mt-2 z-50',
                'w-64 rounded-2xl',
                'bg-white dark:bg-slate-900',
                'border border-slate-100 dark:border-slate-800',
                'shadow-lg p-4',
                'flex flex-col gap-3',
                className,
            ].join(' ')}
        >
            {/*================ User Identity ===========================*/}
            <div className="flex items-center gap-3">
                <Avatar
                    name={username}
                    src={avatarSrc}
                    size="sm"
                    alt={username}
                />
                <div className="min-w-0">
                    <p className="text-sm font-display font-semibold text-slate-900 dark:text-white truncate">
                        {username}
                    </p>
                    {email && (
                        <p className="text-xs font-body text-slate-500 dark:text-slate-400 truncate">
                            {email}
                        </p>
                    )}
                </div>
            </div>

            {/*================ Separator (line component) ==============*/}
            <Divider />

            {/*================ Sign Out Action =========================*/}
            <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                    onSignOut?.();
                    onClose();
                }}
                aria-label="Sign out"
                className="w-full justify-start gap-2 text-red-600 hover:text-red-700"
            >
                <LogOut className="w-4 h-4" aria-hidden="true" />
                Sign Out
            </Button>
        </div>
    );
};

export default AvatarMenuDropdown;
