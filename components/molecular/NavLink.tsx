'use client';
import Link from 'next/link';
import React from 'react';

export interface NavLinkProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement>{
    active?:boolean;
    href: string; // Ensure href is required as we're using Next.js Link
}


const NavLink:React.FC<NavLinkProps> = ({
    active = false,
    children,
    className = "",
    href,
    ...theRest
}) => {
    return (
        <Link
            href={href}
            className={[
                "text-sm font-body font-medium",
                "transition-colors duration-150",
                "focus-visible:outline-none",
                "focus-visible:ring-2 focus-visible:ring-brand-500",
                "rounded-md px-1",
                active ?
                    "text-slate-900 dark:text-white"
                    :"text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white", // FIXED: Changed dark:text-slate-900 to dark:text-slate-400 for better visibility in dark mode
                className,
            ].join(" ")}
            {...theRest}
        >
            {children}
        </Link>
    );
};

export default NavLink;
