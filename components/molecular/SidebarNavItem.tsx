"use client"
import React from 'react';

export interface SidebarNavItemProps {
    /** Lucide icon rendered to the left of the label */
    icon: React.ReactNode;
    /** Item label */
    label: string;
    /** Navigation href */
    href: string;
    /**
     * Whether this item is the currently active route.
     * When true → brand-purple pill background + white text
     * When false → muted text that darkens on hover
     */
    active?: boolean;
    onClick?: () => void;
    className?: string;
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
        icon,
        label,
        href,
        onClick,
        active = false,
        className = '',
    }) => (
    <a
        href={href}
        onClick={(e)=>{
            if (onClick) {
                e.preventDefault();
                onClick();
            }
        }}
        aria-current={active ? 'page' : undefined}
        className={[
            'flex items-center gap-3 px-4 py-2.5 rounded-2xl',
            'font-display font-semibold text-sm',
            'transition-all duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600',
            active
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800',
            className,
        ].join(' ')}
    >
    <span className="[&>svg]:w-4 [&>svg]:h-4 flex-shrink-0" aria-hidden="true">
      {icon}
    </span>
        {label}
    </a>
);

export default SidebarNavItem;
