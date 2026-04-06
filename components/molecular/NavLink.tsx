'use client';
import React from 'react';

export interface NavLinkProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement>{
    active?:boolean;
}


const NavLink:React.FC<NavLinkProps> = ({
    active = false,
    children,
    className = "",
    ...theRest
}) => {
    return (
        <a
            className={[
                "text-sm font-body font-medium",
                "transition-colors duration-150",
                "focus- visible:outline-none",
                "focus-visible:ring-2 focus-visible:ring-brand-500",
                "rounded-md px-1",
                active ?
                    "text-slate-900 dark:text-white"
                    :"text-slate-500 dark:text-slate-900 hover:text-slate-900 dark:hover:text-white",
                className,
            ].join(" ")}
            {...theRest}
        >
            {children}
        </a>
    );
};

export default NavLink;
