// app/layout.tsx
import "./globals.css";
import React from 'react';
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

// export const metadata: Metadata = {
//     title: 'Knotted',
//     description: 'Built for the modern web.',
// }
export const metadata: Metadata = {
    title: "Knotted",
    description: "Built for the modern web.",

    icons: {
        icon: [
            {
                url: "/favicon.ico",
                sizes: "any",
            },
            {
                url: "/favicon-16x16.png",
                type: "image/png",
                sizes: "16x16",
            },
            {
                url: "/favicon-32x32.png",
                type: "image/png",
                sizes: "32x32",
            },
        ],

        apple: [
            {
                url: "/apple-touch-icon.png",
                sizes: "180x180",
            },
        ],

        shortcut: ["/favicon.ico"],
    },

    manifest: "/site.webmanifest",
};


const RootLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        // <ClerkProvider>
            <html lang="en" className={`${dmSans.variable} ${plusJakartaSans.variable}`}>
            <body>{children}</body>
            </html>
        // </ClerkProvider>
    );
}

export default RootLayout;
