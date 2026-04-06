"use client"
import React from 'react';

export interface CharacterCountProps {
    current:number;
    max:number;
    className?:string;
}

const CharacterCount:React.FC<CharacterCountProps> = (
    {
        current,
        max,
        className="",
    }
) => {

    const ratio = current / max;

    const colour =
             ratio >=1 ? "text-red-500"
            :ratio >= 0.85 ? "text-yellow-500"
            : "text-slate-400 dark:text-slate-500";

    return (
        <span
            className={`text-xs font-body ${colour} ${className}`}
            aria-live={"polite"}
            aria-label={`${current} of ${max} characters used`}
        >
            {current} / {max}
        </span>
    );
};

// Main text area component
export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    maxLength?:number;
    currentLength?:number;

}

const Textarea:React.FC<TextareaProps> = (
    {
        maxLength,
        currentLength = 0,
        className,
        ...theRest
    }
) => {

    const showCounter = maxLength != null;

    return (
        <div className={`relative ${className}`}>
            < textarea
                maxLength={maxLength}
                className={[
                    "w-full px-4 py-3",
                    "rounded-2xl",
                    "bg-white dark:bg-slate-900",
                    "border border-slate-300 dark:border-slate-700",
                    "text-sm font-body text-slate-900 dark:text-white",
                     "placeholder:text-slate-400",
                    "resize-none outline-none",
                    "transition-all duration-150",
                    "focus:border-brand-500",
                    "focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-900",
                    showCounter?"pb-8" : '',
                    className,
                ].join(" ")}
                {...theRest}
            />
            {showCounter && (
                <CharacterCount
                    current={currentLength}
                    max={maxLength as number}
                    className={"absolute bottom-2 right-4"}
                />
            )}

        </div>
    );
};

export default Textarea;

