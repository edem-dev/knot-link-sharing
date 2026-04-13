'use client'
import React, {useState} from 'react';
import Link from "next/link";
import Button from "@/components/atomic/Button";
import {useRouter} from "next/navigation";
import Divider from "@/components/atomic/Divider";
import Modal from "@/components/atomic/Modal";
import LandingNavBar from "@/components/sectional/LandingSections/LandingNavBar";
import HeroSection from "@/components/sectional/LandingSections/HeroSection";
import FeaturesSection from "@/components/sectional/LandingSections/FeaturesSection";
import CTABannerSection from "@/components/sectional/LandingSections/CTABannerSection";
import LandingFooter from "@/components/sectional/LandingSections/LandingFooter";

const page = () => {

    const [open, setOpen] = useState(false)
    const router = useRouter()

    return (
        <main>
            <LandingNavBar/>
            <HeroSection />
            <FeaturesSection />
            <CTABannerSection />
            <LandingFooter />

        </main>
    );
};

export default page;
