import React from 'react';

import HeroSection from "@/components/ui/HeroSection";
import ExploreSection from "@/components/ui/ExploreSection";
import ButtonsWrapper from "@/components/ui/ButtonsWrapper";
import Card from "@/components/ui/Card";

const page = () => {


    return (
        <>
            <HeroSection
                title={<>
                        Don’t just share links, <br /> share you
                        </>}
                description={"A clean, minimal space to connect all your digital identities. Share your world with one link."}
            >
               <ButtonsWrapper/>
            </HeroSection>
        {/*    Explore section*/}
            <ExploreSection/>
        </>
    );
};

export default page;
