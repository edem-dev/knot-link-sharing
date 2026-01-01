import React from 'react';
import Navbar from "@/components/molecular/Navbar";
import {Metadata} from "next";
import FooterSection from "@/components/sectional/FooterSection";

export const metadata:Metadata = {
    title: 'Login'
}

interface LayoutProps {
    children: React.ReactNode;
}

const layout:React.FC<LayoutProps> = (
    {
        children
    }
) => {
    return (
        <>
            <Navbar/>
            <main className={"min-h-[500px] flex items-center justify-start flex-col bg-gray-50 px-2"}>{children}</main>
            <FooterSection/>
        </>
    );
};

export default layout;
