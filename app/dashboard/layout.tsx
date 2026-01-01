import React from 'react';
import {Metadata} from 'next'
import DashboardHeader from "@/components/molecular/DashboardHeader";

interface LayoutProps {
    children: React.ReactNode;
}

export const metadata:Metadata = {
    title: 'Dashboard'
}



const layout:React.FC<LayoutProps> = (
    {
        children
    }
) => {

    return (
        <>
            <DashboardHeader/>
            <main className={"min-h-[500px] flex items-center justify-start flex-row bg-gray-50 px-2"}>
                {children}
            </main>
        </>
    );
};

export default layout;
