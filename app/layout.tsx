// app/layout.tsx
import "./globals.css";
import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import {DM_Sans, Plus_Jakarta_Sans} from 'next/font/google';
import {Metadata} from "next";

const dmSans = DM_Sans({
    subsets: ['latin'],
    variable: '--font-body',
    display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-display',
    display: 'swap',
});

interface LayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'Knotted',
    description: 'Built for the modern web.',
}


const RootLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <ClerkProvider>
            <html lang="en" className={`${dmSans.variable} ${plusJakartaSans.variable}`}>
            <body>{children}</body>
            </html>
        </ClerkProvider>
    );
}

export default RootLayout;
