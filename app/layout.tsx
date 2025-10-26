import React from "react";
import "../styles/globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/ui/Nav";
import {Inter , Outfit} from "next/font/google";
import NavLinksWrapper from "@/components/ui/NavLinksWrapper";
import LinkComponent from "@/components/ui/Link";
import FooterSection from "@/components/ui/FooterSection";

const inter= Inter({subsets:["latin"] , variable: "--font-inter"});
const outfit=Outfit({subsets:["latin"] , weight:["500","600","700"] , variable: "--font-outfit"})

export const metadata: Metadata = {
    title: "Knotted",
    description: "All of you in onr place.",
};


export default function RootLayout({children,}: { children: React.ReactNode; }) {
    return (
        <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
        <body >
        <Navbar title={"Knotted"} position={"fixed top-2 left-0 right-0"}>
            <NavLinksWrapper>
                <LinkComponent linkTitle={"Home"} href={"#somelink"}/>
                <LinkComponent linkTitle={"Features"} href={"#somelink"}/>
            </NavLinksWrapper>
        </Navbar>
        <main>
            {children}
        </main>
        <footer>
            <FooterSection/>
        </footer>
        </body>
        </html>
    );
}
