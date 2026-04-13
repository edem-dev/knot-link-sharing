import React from 'react';
import AuthNavbar from '@/components/sectional/AuthSections/AuthNavBar';
import AuthFooter from "@/components/sectional/AuthSections/AuthFooter";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({children}: AuthLayoutProps) {
    return (
        <>
            <main>
                {children}
            </main>
        </>
    );
}
