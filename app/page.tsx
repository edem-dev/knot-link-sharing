import React from 'react';
import Image from "next/image";
import Button from "@/components/atomic/Button";
import Navbar from "@/components/molecular/Navbar";
import HeaderSection from "@/components/sectional/HeaderSection";
import HeroSection from "@/components/sectional/HeroSection";
import FeaturesSection from "@/components/sectional/FeaturesSection";
import PricingSection from "@/components/sectional/PricingSection";
import FooterSection from "@/components/sectional/FooterSection";

const page = () => {
    return (
        <>
            <HeaderSection/>
            <HeroSection/>
            <FeaturesSection/>
            <PricingSection/>
            <FooterSection/>
        </>

    );
};

export default page;
