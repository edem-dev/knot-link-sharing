'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import KnottedLogo from '@/components/atomic/KnottedLogo';
import Button from '@/components/atomic/Button';
import NavLink from '@/components/molecular/NavLink';
import Divider from '@/components/atomic/Divider';

const NAV_LINKS = [
    { href: '/features', label: 'Features' },
    { href: '/templates', label: 'Templates' },
    { href: '/pricing', label: 'Pricing' },
] as const;

export interface LandingNavbarProps {
    activePath?: string;
    className?: string;
}

const LandingNavbar: React.FC<LandingNavbarProps> = ({
    activePath = '/',
    className = '',
}) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const router = useRouter();

    const handleNavigate = (path: string) => {
        setMobileOpen(false);
        router.push(path);
    };

    return (
        <header
            className={[
                'sticky top-0 z-50',
                'bg-white/80 dark:bg-slate-950/80',
                'backdrop-blur-md',
                'border-b border-slate-100 dark:border-slate-800',
                className,
            ].join(' ')}
            role="banner"
        >
            <nav
                className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between"
                aria-label="Main navigation"
            >
                <KnottedLogo asLink logoText={true} size="md" />

                <ul className="max-md:hidden flex items-center gap-6 list-none" role="list">
                    {NAV_LINKS.map(({ href, label }) => (
                        <li key={href}>
                            <NavLink href={href} active={activePath === href}>
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <div className="max-md:hidden flex items-center gap-3">
                    <NavLink href="/sign-in" active={activePath === '/sign-in'}>
                        Sign in
                    </NavLink>
                    <Button variant="primary" size="sm" onClick={() => router.push('/sign-up')}>
                        Get Started
                    </Button>
                </div>

                <button
                    type="button"
                    className={[
                        'md:hidden flex',
                        'p-2 rounded-lg',
                        'text-slate-600 dark:text-slate-300',
                        'hover:bg-slate-100 dark:hover:bg-slate-800',
                        'transition-colors duration-150',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600',
                    ].join(' ')}
                    onClick={() => setMobileOpen(prev => !prev)}
                    aria-expanded={mobileOpen}
                    aria-controls="mobile-nav-drawer"
                    aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                >
                    {mobileOpen ? (
                        <X className="w-5 h-5" aria-hidden="true" />
                    ) : (
                        <Menu className="w-5 h-5" aria-hidden="true" />
                    )}
                </button>
            </nav>

            {mobileOpen && (
                <div
                    id="mobile-nav-drawer"
                    className={[
                        'border-t border-slate-100 dark:border-slate-800',
                        'bg-white dark:bg-slate-950',
                        'px-6 py-4',
                        'flex flex-col gap-3',
                    ].join(' ')}
                >
                    {NAV_LINKS.map(({ href, label }) => (
                        <NavLink
                            key={href}
                            href={href}
                            active={activePath === href}
                            className="text-base py-1"
                            onClick={() => setMobileOpen(false)}
                        >
                            {label}
                        </NavLink>
                    ))}

                    <Divider />

                    <Button
                        variant="ghost"
                        size="md"
                        fullWidth
                        onClick={() => handleNavigate('/sign-in')}
                    >
                        Sign in
                    </Button>
                    <Button
                        variant="primary"
                        size="md"
                        fullWidth
                        onClick={() => handleNavigate('/sign-up')}
                    >
                        Get Started
                    </Button>
                </div>
            )}
        </header>
    );
};

export default LandingNavbar;