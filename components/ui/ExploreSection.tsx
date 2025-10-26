'use client'
import React from 'react';
import Card from "@/components/ui/Card";
import {Link2, BriefcaseBusiness, Sparkles} from "lucide-react";
import {useRouter} from "next/navigation";

const ExploreSection = () => {
    const router = useRouter();

    return (
        <section id={"explore"} className={'bg-secondary px-4  h-full md:h-dvh sm:pt-40 pt-35 pb-5'}>

                <Card
                direction={"col"}
                justify={"start"}
                // variant={"glass"}
                >
                    <h2 className={"text-center text-4xl"}>Share your digital universe </h2>
                    <p className={"text-center py-3 font-main"}>Create a seamless connection between all your online profiles and platforms</p>
                </Card>
        <div className={"min-w-[100px] flex flex-col md:flex-row  items-center justify-center  gap-4 px-6 sm:px-20"}>
            <Card
                variant={"glass"}
                className={"px-4 py-6 flex flex-col items-start"}
                gap={"4"}
            >
                <Link2/>
                <h3 className={'text-2xl'}>Quick Access to your content</h3>
                <p className={'font-main '}>Streamline your digital presence with intuitive link management</p>
            </Card>
            {/*Card 2*/}
            <Card
                variant={"glass"}
                className={"px-4 py-6 flex flex-col"}
                gap={'4'}
            >
                <BriefcaseBusiness />
                <h3 className={'text-2xl'}>Quick Access to your content</h3>
                <p className={'font-main'}>Streamline your digital presence with intuitive link management</p>
            </Card>

            {/*Card 3*/}
            <Card
                variant={"glass"}
                className={"px-4 py-6 flex flex-col"}
                gap={'4'}
            >
               <Sparkles/>
                <h3 className={'text-2xl'}>Quick Access to your content</h3>
                <p className={'font-main'}>Streamline your digital presence with intuitive link management</p>
            </Card>
        </div>

        </section>
    );
};

export default ExploreSection;
