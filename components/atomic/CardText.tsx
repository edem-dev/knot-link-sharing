import React from 'react';

interface SectionTitleProps {
    title?:string;
    subtitle?:string;
    center?:boolean;
    className?:string;
}

const sectionTitle:React.FC<SectionTitleProps> = (
    {
        title,
        subtitle,
        center,
        className
    }
) => {
    return (
        <div className={`mb-6 ${center ? 'text-center' : ''} `}>
            <h1 className={`my-4 text-xl  tracking-normal font-bold font-headings max-w-[400px]`}>{title}</h1>
            {subtitle && <p className="text-gray-500   text-sm font-body max-w-[400px]">{subtitle}</p>}
        </div>
    );
};

export default sectionTitle;
