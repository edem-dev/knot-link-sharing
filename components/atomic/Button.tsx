"use client"
import React from 'react';
import { Loader2 } from "lucide-react";

export type ButtonVariant =  "primary" | "secondary" | "ghost" | "outline" | "dark" | "danger";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?:ButtonVariant;
    size?:ButtonSize;
    loading?:boolean;
    fullWidth?:boolean;
    leftIcon?:React.ReactNode;
    rightIcon?:React.ReactNode;
}
const Button:React.FC<ButtonProps> = (
    {
        children,
        variant = "primary",
        size = "md",
        loading = false,
        fullWidth = false,
        leftIcon,
        rightIcon,
        disabled,
        className="",
        ...theRest
    }
) => {
    // Base button styles
    const base = "inline-flex items-center justify-center gap-2 font-display font-semibold transition-all duration-200 focus-visible:outlin     e-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none";

    const variantClasses: Record<ButtonVariant, string> = {
        primary:   "bg-brand-600 hover:bg-brand-700 active:bg-brand-900 text-white shadow-md hover:shadow-lg shadow-brand-600/25 focus-visible:ring-brand-600",
        secondary: "bg-brand-100 hover:bg-brand-200 text-brand-700 dark:bg-brand-900/40 dark:hover:bg-brand-900/60 dark:text-brand-300 focus-visible:ring-brand-600",
        ghost:     "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 focus-visible:ring-slate-400",
        outline:   "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-white shadow-sm focus-visible:ring-slate-400",
        dark:      "bg-slate-900 hover:bg-slate-800 text-white shadow-md focus-visible:ring-slate-600",
        danger:    "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white shadow-md focus-visible:ring-red-500",
    };

    const sizeClasses: Record<ButtonSize, string> = {
        sm: "text-sm px-4 py-1.5 rounded-xl",
        md: "text-sm px-5 py-2.5 rounded-2xl",
        lg: "text-base px-6 py-3 rounded-2xl",
        xl: "text-base px-8 py-4 rounded-3xl",
    };


    return (
        <button
            className={`${base} ${variantClasses[variant]} ${sizeClasses[size]}
             ${fullWidth ? "w-full" : ""} ${className}`}

            disabled={disabled || loading}
            aria-disabled={disabled || loading}
            aria-busy={loading}
            {...theRest}
        >
            {
                loading
                ? (
                    <Loader2 aria-hidden={"true"} className="animate-spin" />
                    )
                    :leftIcon
            }
            {children}
            {
             !loading && rightIcon
            }
        </button>
    );
};

export default Button;
