import React from 'react';
import Button from "@/components/atomic/Button";

export interface CTABannerSectionProps {
    headline?:string;
    subtext?:string;
    ctaLabel?:string;
    ctaHref?:string;
    className?:string;
}

const CTABannerSection:React.FC<CTABannerSectionProps> = ({
    headline = "Ready to knot you links?",
    subtext = "Join thousands of creators today. No credit card required.",
    ctaLabel = "Get Started Now",
    ctaHref = "/sign-up",
    className = '',
}) => {
    return (
        <section
            className={[
                'relative mx-auto max-w-3xl overflow-hidden',
                'bg-linear-to-br from-brand-600 to-brand-700',
                'dark:from-brand-700 dark:to-brand-900',
                'rounded-3xl my-8  mx-6 py-14 text-center',
                'shadow-xl shadow-brand-600/30',
            ].join(" ")}
        >
        {/*
            Decorative orbs for a cool effect
        */}
            <div className={[
                'absolute -top-14 -right-14 w-64 h-64',
                'rounded-full bg-white/5 pointer-events-none',
                ].join(' ')}
                aria-hidden={"true"}
            />
            <div
                className={[
                    'absolute -bottom-20 -left-20 w-80 h-80',
                    'rounded-full bg-white/5 pointer-events-none',
                ].join(' ')}
                aria-hidden={"true"}
            />

        {/*    Main CTA Content*/}
            <h2
                id={"cta-heading"}
                className={`relative font-display font-extrabold
                 text-3xl sm:text-4xl text-white mb-3
                 ` }
            >
                {headline}
            </h2>
            <p
                className={`relative font-body text-brand-200
                  text-base mb-8 max-w-sm mx-auto`}
            >
                {subtext}
            </p>

            <Button
                variant={"outline"}
                size={"lg"}
                className={`relative bg-white text-brand-700 
                hover:bg-brand-50 border-transparent shadow-lg`}
                onClick={() => window.location.href = ctaHref}
            >
                {ctaLabel}
            </Button>
        </section>
    );
};

export default CTABannerSection;
