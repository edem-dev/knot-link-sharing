'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; // hamburger + close icons

interface NavProps {
    title: string;
    children?: React.ReactNode;
    position?: string;
    style?: React.CSSProperties;
    ref?: React.Ref<HTMLDivElement>;
}

const Navbar: React.FC<NavProps> = ({
                                        children,
                                        position = '',
                                        style,
                                        ref,
                                        title
                                    }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header
            ref={ref}
            style={style}
            className={`w-[90vw] z-50 m-auto mt-10 rounded-full flex items-center justify-between px-4 py-4 border-2 border-gray-50 bg-secondary shadow-sm ${position}`}
        >
            {/* Logo / Title */}
            <Link href="/" className="text-2xl font-bold font-headings">
                {title}
            </Link>

            {/* Desktop Links */}
            <nav className="hidden md:flex items-center gap-6">
                {children}
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center">
                <Link
                    href="/(auth)/login"
                    className="text-indigo-600 px-3 py-2 rounded-full bg-gray-200"
                >
                    Login
                </Link>

                {/* Sign-up button only visible on medium and larger screens */}
                <Link
                    href="/(auth)/signup"
                    className="hidden md:inline-block text-white ml-2 px-3 py-2 rounded-full bg-purple-600"
                >
                    Sign-up
                </Link>

                {/* Hamburger Icon visible on small screens */}
                <button
                    className="ml-3 md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="absolute top-20 left-0 w-full bg-secondary border-t border-gray-100 rounded-2xl flex flex-col items-center py-6 md:hidden">
                    {children}
                    <Link
                        href="/signup"
                        className="mt-4 text-white px-4 py-2 rounded-full bg-purple-600"
                    >
                        Sign-up
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Navbar;
