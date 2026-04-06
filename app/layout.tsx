// app/layout.tsx
import "./globals.css";
import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';

interface LayoutProps {
    children: React.ReactNode;
}



const RootLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <ClerkProvider>
            <html lang="en">
                <body>{children}</body>
            </html>
        </ClerkProvider>
    );
}

export default RootLayout;
