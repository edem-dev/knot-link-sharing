import React from 'react';
import Badge from "@/components/atomic/Badge";
import Button from "@/components/atomic/Button";
import {useRouter} from "next/navigation";
import ProfilePreviewCard from "@/components/molecular/ProfilePreviewCard";

export interface HeroSectionProps {
    className?:string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
    className = "",
}) => {

    const router = useRouter();

    return (
        <section
            className={[
                'relative overflow-hidden',
                'bg-white dark:bg-slate-900',
                'pt-20 pb-0',
                className,
            ].join(" ")}
            aria-labelledby={"hero-heading"}
        >
            {/*    Cool minimalistic radial glow behind the hero section*/}
            <div
                className={[
                    'absolute inset-x-0 top-0 h-96',
                    'bg-gradient-t-b from-brand-50/60 to-transparent',
                    'dark:from-brand-950/20 pointer-events-none',
                ].join(" ")}
                aria-hidden={"true"}
            />
            {/*    Cool minimalistic radial glow behind the  hero section*/}
            {/*Content---------------------------------------    */}
            <div
                className={'relative mx-auto max-w-3xl px-6 text-center flex flex-col items-center'}
            >
            {/*Announcement Badge*/}
                <Badge size={"sm"} withDot={true} variant={"purple"} className={"w-full mb-4"}>
                    Coming Soon: New themes and templates
                </Badge>

            {/*Responsive HeadLine text*/}
                <h1
                    id={"hero-heading"}
                    className={[
                        'font-display font-extrabold',
                        'text-5xl sm:text-6xl md:text-7xl',
                        'leading-[1.05] tracking-tight',
                        'text-slate-900 dark:text-white',
                        'mb-6',
                    ].join(" ")}
                >
                    One link.{' '}
                    {/*Adds a literal space and prevents concactenation*/}
                    <span className={"text-brand-600 dark:text-brand-400"}>Everything </span>
                    you are.
                </h1>

            {/*    Subheading -----------------------------------------*/}
                <p
                    className={[
                        'font-body  sm:text-lg text-base ',
                        'text-slate-500  dark:text-slate-400',
                        'max-w-lg mx-auto leading-relaxed',
                        'mb-8',
                    ].join(" ")}
                >
                    Knotted gives you a beautiful, shareable page for all your links.
                    Designed for creators, built for developers.
                </p>

            {/*    CTA Buttons row */}
                <div className="flex flex-col sm:flex-row items-center gap-3 mb-16">
                    <Button onClick={() => router.push('/sign-up')} variant="primary" size="lg">
                        Get Started — it&apos;s free
                        {/* &apos; is the HTML entity for an apostrophe — avoids JSX parsing issues */}
                    </Button>
                    <Button onClick={() => router.push('/templates')} variant="outline" size="lg">
                        Custom Templates
                    </Button>
                </div>

            {/*    Profile preview card--------------------------------*/}
                <ProfilePreviewCard/>
            </div>
        </section>
    );
};

export default HeroSection;
