import React from 'react';
import {ArrowRight} from "lucide-react";

export type PublicLinkVariant = "default" | "highlighted";

export interface PublicLinkItemProps {
    variant?:PublicLinkVariant;
    icon?:React.ReactNode;
    href:string;
    title:string;
    className?:string;
}


const PublicLinkItem:React.FC<PublicLinkItemProps> = ({
    title,
    href,
    icon,
    variant = "default",
    className = "",
}) => {

    const isHighlighted = variant === "highlighted";

    return (
        <a
            href = {href}
            target={"_blank"}
            rel = {"noopener noreferrer"}
            className = {[
                "flex items-center gap-2 w-full px-5 py-4 rounded-2xl",
                "transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-brand-600  focus-visible:ring-offset-2",
                isHighlighted
                    ? "bg-brand-600 hover:bg-brand-700 text-white shadow-md hover:shadow-lg"
                    : `bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800  dark:hover:bg-slate-800
                     text-slate-700 dark:text-white hover:border-brand-300 hover:shadow-sm`,
            ].join(" ")}
        >

        {/*    Condiotanlly render the icon*/}
            {icon && (
                <span
                    className={[
                        "shrink-0 [&>svg]:w-5 [&>svg]:h-5]",
                        isHighlighted ? "text-white" : "text-brand-400",
                    ].join(" ")}
                >
                    {icon}
                </span>
            )}
        {/*    Title of the link*/}
            <span className="font-display flex-1 font-semibold text-sm">
                {title}
            </span>

            <ArrowRight
                className={`w-4 h-4 shrink-0 
                ${isHighlighted ? 'text-white/70' : 'text-slate-400'}`}
                aria-hidden="true"
            />
        </a>
    );
};

export default PublicLinkItem;
