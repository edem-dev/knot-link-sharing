'use client';
import React from 'react';
import Link from 'next/link';

interface NavProps {
    title: string;
    children?: React.ReactNode;
    position?: string;
    style?: React.CSSProperties;
    ref?: React.Ref<HTMLDivElement>;
}

const Navbar:React.FC<NavProps>= (
    {
        children,
        position,
        style,
        ref,
        title
    }
) => {
    return (
        <header className={`w-[90vw] m-auto mt-10 rounded-full flex items-center justify-between px-4 py-4 border-2 border-gray-600 bg-white shadow-sm ${position}`}>
            <Link href="/" className={`text-2xl font-bold text-accent`}>
                <h1 className={"font-headings"}>{title}</h1>
            </Link>
        {/*    Authentication*/}
            <nav>
                <Link href={"/(auth)/login"} className={"mr-2 text-indigo-600  px-3 py-3 rounded-full bg-gray-200"}>
                      Login
                </Link>
                <Link href={"/(auth)/signup"} className={"text-white  px-3 py-3 rounded-full bg-purple-600"}>
                    Sign-up
                </Link>
            </nav>
        </header>
    );
};

export default Navbar;
