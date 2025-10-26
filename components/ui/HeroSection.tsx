import React from 'react';

interface HeroSectionProps {
    title: React.ReactNode;
    description: string;
    children?: React.ReactNode;
    // position?: string;
    // style?: React.CSSProperties;
    // ref?: React.Ref<HTMLDivElement>;
}

const HeroSection:React.FC<HeroSectionProps> = (
    {
        title,
        children,
        description
    }
) => {
    return (
        <section className={" bg-primary h-dvh flex flex-col items-center justify-center gap-4"}>
            <h1 className={"text-secondary text-center text-6xl"}>{title}</h1>
            <p className={"w-2/3 text-center text-white font-semibold"}>{description}</p>
        {/*    Call action buttons*/}
            <div className={"flex items-center justify-center gap-4"}>
                {children}
            </div>
        </section>
    );
};

export default HeroSection;
