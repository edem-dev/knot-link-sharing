import React from 'react';
import Navbar from "@/components/molecular/Navbar";
import {Metadata} from "next";
import UserFooter from "@/components/atomic/UserFooter";
import {Share} from "lucide-react";

interface LayoutProps {
    children: React.ReactNode;
}

export const metadata:Metadata = {
    title: 'Jane Doe'
}


const layout:React.FC<LayoutProps> = ({children}) => {
    return (
        <>
            <Navbar/>
                <main className={"px-2"}>
                    {children}
                </main>
            <UserFooter
             userNames={"Jane Doe"}
            />
        </>
    );
};

export default layout;
