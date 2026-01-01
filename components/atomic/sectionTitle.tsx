import React from 'react';

interface SectionTitleProps {
    title:string;
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
            <h1 className={`my-4 text-3xl md:text-4xl  font-bold font-headings md:max-w-[700px]`}>{title}</h1>
            {subtitle && <p className="text-gray-500 font-body md:max-w-[700px]">{subtitle}</p>}
        </div>
    );
};

export default sectionTitle;
