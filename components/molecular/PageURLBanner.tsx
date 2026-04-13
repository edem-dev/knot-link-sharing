'use client'

import React, {useState, useCallback} from 'react';
import Button from "@/components/atomic/Button";
import {Check, Copy} from "lucide-react";

export interface PageURLBannerProps {
    url:string;
    subLabel?:string;
    onCopy?:()=>void;
    className?:string;
}

const PageURLBanner:React.FC<PageURLBannerProps> = ({
    url,
    subLabel = "Share your link with your audience",
    onCopy,
    className = "",
}) => {

    // Copy state---------------------------------------------------
    const [copied, setCopied] = useState(false)

    // Copy handler function----------------------------------------
    //'useCallback' is used to avoid re-rendering the component'
    const handleCopy = useCallback(async ()=>{
        try {
            await navigator.clipboard.writeText(`https://${url}`)
        }catch{
            // Clipboard API can fail if:
            // - The page is not focused (some browsers block it)
            // - The user has denied clipboard permissions
            // We fail silently — the URL is visible and the user can copy it manually.
        }

        setCopied(true);
        onCopy?.();
        setTimeout(() => setCopied(false), 2000);
    },[url, onCopy]);

    return (
        <div
            className={[
                'flex items-center justify-between gap-3 px-4 py-1 ',
                'bg-white dark:bg-slate-900',
                'border border-slate-200 dark:border-slate-700',
                'rounded-full shadow-sm',
                className,
            ].join(" ")}
        >
        {/*URL + Subtitle text-----------------------------------*/}
            <div className={"min-w-0"}>
                <p className={[
                    'text-sm font-display',
                    'font-semibold text-slate-800',
                    'dark:text-white truncate',
                ].join(" ")}>
                    Your page:{' '}
                    <span className={"text-brand-600 dark:text-brand-400"}>{url}</span>
                </p>
            {/*Conditionally render out the subtitle text*/}
                {subLabel && (
                    <p className={"text-xs font-body text-slate-400 dark:text-slate-500 mt-1"}>
                        {subLabel}
                    </p>
                )}
            </div>

        {/*Copy Button:----------------------------------------*/}
            <Button
               variant={"primary"}
               size={"sm"}
               leftIcon={
                    copied
                        ? <Check className={"w-3.5 h-3.5"} aria-hidden={"true"}/>
                        : <Copy className={"w-3.5 h-3.5"} aria-hidden={"true"} />
               }
               onClick={handleCopy}
               aria-label={copied ? 'Link copied' : 'Copy link'}
               className={"shrink-0"}
               type={"button"}
            >
                {copied ? 'Copied' : 'Copy Link'}
            </Button>
        </div>
    );
};

export default PageURLBanner;
