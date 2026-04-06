'use client';

import React from 'react';

export type BadgeVariant = "purple"|"success" | "danger" | "warning" | "info";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?:BadgeVariant;
    size?:BadgeSize;
}


const Badge:React.FC<BadgeProps> = (
    {
        children,
        variant = "success",
        size = "md",
    }
) => {

    const base =  'font-semibold font-display inline-flex items-center justify-center border'

    const variantCLasses : Record<BadgeVariant, string> = {
        purple: "bg-brand-500/40 text-brand-700 border border-brand-400",
        success: "bg-green-500/20 text-green-500 border border-green-600",
        danger:  "bg-red-500/20 text-red-500 border border-red-500",
        warning: "bg-yellow-500/20 text-yellow-500 border border-yellow-500",
        info:    "bg-blue-500/20 text-blue-500 border border-blue-500",
    }

    const sizeClasses:Record<BadgeSize ,string> = {
        sm: "text-xs px-2 py-1 rounded-md",
        md: "text-sm px-3 py-1.5 rounded-lg",
        lg: "text-base px-4 py-2 rounded-xl",
    }

    return (
        <div className={`${variantCLasses[variant]} ${base} ${sizeClasses[size]}`}>{children}</div>
    );
};

export default Badge;
