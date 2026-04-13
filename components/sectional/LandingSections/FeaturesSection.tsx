import React from 'react';
import {AtSign, Palette, Share2} from "lucide-react";
import FeatureCard from "@/components/molecular/FeatureCard";

export interface FeaturesSectionProps {
    className?:string;
}

// Feature data — outside the component (static, never changes).
const FEATURES = [
    {
        Icon:        AtSign,
        title:       'Custom username',
        description: 'Claim your unique URL in seconds. knotted.to/yourname is waiting for you.',
    },
    {
        Icon:        Share2,
        title:       'One-click sharing',
        description: 'Share your profile across all platforms with integrated sharing tools.',
    },
    {
        Icon:        Palette,
        title:       'Beautiful public page',
        description: 'A minimalist design that puts your content first. Customise colours and fonts.',
    },
] as const;


const FeaturesSection:React.FC<FeaturesSectionProps> = ({
    className = "",
}) => {
    return (
        <section
            className={`bg-slate-50 dark:bg-slate-900 my-6 py-24 ${className}`}
            aria-labelledby={"features-heading"}
        >
        {/*Section wrapper-----------------------------------------*/}
            <div className={'mx-auto max-w-5xl px-6'}>
            {/*Section header-------------------------------------*/}
                <div className={"text-center mb-12"}>
                    <h2
                        id={"features-heading"}
                        className={[
                            'font-display font-extrabold',
                            'text-4xl sm:text-5xl mb-3',
                            'text-slate-900 dark:text-white'
                        ].join(" ")}
                    >
                        EveryThing you need to grow
                    </h2>
                    <p className={"font-body text-slate-500 dark:text-slate-400 text-base"}>
                        Simple tools for creators who want their presence online.
                    </p>
                </div>
                {/*    Features Cards ----------------------------------*/}
                <div className={"grid grid-cols-1 sm:grid-cols-3 gap-5"}>
                    {
                        FEATURES.map(({Icon, title, description}) => (
                            <FeatureCard
                                key={title}
                                icon={Icon}
                                title={title}
                                description={description}
                            />
                        ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
