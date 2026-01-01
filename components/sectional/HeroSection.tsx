import React from 'react';
import CallToActionWrapper from "@/components/molecular/CallToActionWrapper";
import PhoneWrapper from "@/components/molecular/PhoneWrapper";
import UserProfile from "@/components/sectional/UserProfile";

const HeroSection = () => {
    return (
        <section className="mx-4  min-h-[600px] flex flex-col md:flex-row items-center justify-center gap-8 ">
            <CallToActionWrapper/>
            <PhoneWrapper>
                <UserProfile/>
            </PhoneWrapper>
        </section>
    );
};

export default HeroSection;
