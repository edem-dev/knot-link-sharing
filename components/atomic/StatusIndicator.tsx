"use client"
import React from 'react';
import {CheckCircle2, AlertCircle, Info, Icon} from "lucide-react";

export type StatusVariant = "success" | "error" | "info";

export interface StatusIndicatorProps {
    variant?:StatusVariant;
    message?:string;
    className?:string;
}

const variantConfig: Record<
    StatusVariant,
    {
        Icon:React.ElementType;
        colour:string;
    }
>={
    success:{
        colour: "text-brand-600 dark:text-brand-400",
        Icon: CheckCircle2,
    },
    error:{
        colour:"text-red-600 dark:text-red-400",
        Icon:AlertCircle
    },
    info:{
        colour:"text-blue-600 dark:text-blue-400",
        Icon:Info
    }
}

const StatusIndicator:React.FC<StatusIndicatorProps> = (
    {
        variant = "success",
        message,
        className = "",
    }

) => {


    const {colour , Icon} = variantConfig[variant]

    return (
        <div
            className={`flex items-center gap-1.5 text-sm font-body font-medium ${colour} ${className}`}
        >
            <Icon
                className={"w-4 h-4 shrink-0"}
                aria-hidden={"true"}
            />
            <span>{message}</span>
        </div>
    );
};

export default StatusIndicator;
