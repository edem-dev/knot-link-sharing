'use client';
import React from 'react';
import {StaticImageData} from "next/image";

export interface SocialProofProps {
    avatars: string[] ;
    count:string;
    label:string;
    className?:string;
}

const SocialProof:React.FC<SocialProofProps> = ({
    avatars,
    count,
    label,
    className = '',
}) => {
    return (
        <div className={`flex flex-col items-center gap-3 ${className}`}>
        {/*Overlaping avatar stack-------------------------*/}
            <div className={'flex -space-x-2'} aria-hidden={"true"}>
                {avatars.slice(0 , 3 ).map((src, index) =>(
                    <img
                        key={index}
                        src={src}
                        alt={""}
                        className={`w-12 h-12 rounded-full object-cover ring-2
                        ring-white dark:ring-slate-950
                        `}
                    />
                ))}

            {/*10K overflow pill------------------------------*/}
                <div
                    className={[
                        'w-12 h-12 rounded-full bg-brand-100',
                        'dark:bg-brand-900/40 flex items-center justify-center',
                        'ring-2 ring-white dark:ring-slate-950'
                    ].join(" ")}
                >
                    <span
                        className={'text-xs font-display font-bold text-brand-700 dark:text-brand-300'}
                    >
                        +10k
                    </span>
                </div>
            </div>

            <p className="text-sm font-body text-slate-500 dark:text-slate-400 text-center">
                Join{' '}
                <strong className="font-semibold text-slate-700 dark:text-slate-200">
                    {count} creators
                </strong>
                {' '}{label}
            </p>
        </div>
    );
};

export default SocialProof;
