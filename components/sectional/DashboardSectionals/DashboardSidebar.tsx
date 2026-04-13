'use client';
import React from 'react';
import {BarChart2, Eye, LayoutDashboard, LogOutIcon, Settings} from "lucide-react";
import KnottedLogo from "@/components/atomic/KnottedLogo";
import UserSidebarProfile from "@/components/molecular/UserSidebarProfile";
import SidebarNavItem from "@/components/molecular/SidebarNavItem";
import Button from "@/components/atomic/Button";

// Authenticated user interface
export interface DashboardSidebarUser{
    name:string;
    role:string;
    avatarSrc?:string;
}

// Dashboard Sidebar props-----------------------------------------//
export interface DashboardSidebarProps{
    //Authenticated user data for the profile summary at the top
    user:DashboardSidebarUser;
    //The current active route -> This highlights the matching nav item
    activePath?:string;
    // A Callback function that is called when th user clicks the 'Sign out button'
    onSignOut?: () => void;
    //Extra tailwind class for additional styling
    className?: string;
    onNavChange?: (href: string) => void;
}




const DashboardSidebar:React.FC<DashboardSidebarProps> = ({
    user,
    activePath = "/dashboard",
    onSignOut,
    onNavChange,
    className
}) => {

    const navItems = [
        { href: '/dashboard', label: 'Dashboard',    Icon: LayoutDashboard },
        { href: '/profile',   label: 'View my page', Icon: Eye             },
        { href: '/analytics', label: 'Analytics',    Icon: BarChart2       },
        { href: '/settings',  label: 'Settings',     Icon: Settings        },
    ];


    return (
        <aside
            className={[
                'w-64 shrink-0 h-full gap-4 flex flex-col',
                'bg-white dark:bg-slate-950',
                'border-r border-slate-400 dark:border-slate-800',
                'px-4 py-6',
                className,
            ].join(' ')}
        >
        {/*Knotted logo-----------------------------------------*/}
            <div className={'px-2 mb-4'}>
                <KnottedLogo  logoText={true} />
            </div>
        {/*User Sidebar Profile-----------------------------------------*/}
            <div className={'px-2 mb-4'}>
                <UserSidebarProfile
                    name={user.name}
                    role={user.role}
                    // avatarSrc="/Image/av-2.png"
                />
            </div>

        {/*NAv item ---------------------------------------------*/}
            <nav
                className="flex flex-col gap-1 flex-1"
                aria-label="sidebar navigation"
            >
                {navItems.map(({ href, label, Icon }) => {
                    const active = activePath === href;

                    return (
                        <SidebarNavItem
                            key={href}
                            icon={<Icon className="w-4 h-4" />}
                            label={label}
                            href={href}
                            active={activePath === href}
                            onClick={() => onNavChange?.(href)}
                        />
                    );
                })}
            </nav>

            <Button
                type={"button"}
                variant={"danger"}
                onClick={onSignOut}
                size={"md"}
                leftIcon={<LogOutIcon className="w-4 h-4"/>}
            >
                Sign Out
            </Button>
        </aside>
    );
};

export default DashboardSidebar;
