'use client'
import React from 'react';

interface DividerProps {
    className?:string;
    label?:string;
}


const Divider: React.FC<DividerProps> = (
    {
        className = "",
        label,
    }
) => {
    return (
        <div
            className={`relative flex items-center ${label ? 'gap-3' : ''} ${className}`}
            role="separator"
            aria-orientation="horizontal"
        >
            {/*Left Line*/}
            <div className="flex-1 h-px bg-slate-300 dark:bg-slate-700"/>

            {/*    Label*/}
            {label && (
                <>
                    <div className={`text-[10px] font-body text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest whitespace-nowrap px-1`}>
                        {label}
                    </div>

                    {/*    Right Line*/}
                    <div className="flex-1 h-px bg-slate-300 dark:bg-slate-700"/>
                </>
            )}


        </div>
    );
};

export default Divider;
