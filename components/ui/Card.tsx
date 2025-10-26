import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    variant?: "default" | "outline" | "glass" | "filled" | string;
    direction?: "row" | "col";
    justify?: "start" | "center" | "between" | "end";
    align?: "start" | "center" | "end" | "stretch";
    gap?: string;
    hover?: boolean;
}

const Card: React.FC<CardProps> = (
    {
        children,
        variant  ,
        direction ,
        justify ,
        align ,
        gap ,
        hover ,
        className,
        ...props
    }) => {
    const base = "rounded-2xl  flex transition-all duration-300";

    const variants = {
        default: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
        outline: "border border-gray-300 dark:border-gray-700 bg-transparent",
        filled: "bg-gray-100 dark:bg-gray-900 border border-transparent",
        glass: "bg-white/10 backdrop-blur-lg border border-white/20 dark:bg-gray-900/20",
    };

    const hoverEffect = hover
        ? "hover:shadow-lg hover:-translate-y-1"
        : "";

    const flexProps = `flex-${direction} justify-${justify} items-${align} gap-${gap}`;

    return (
        <div
            className={clsx(base,variants[variant], flexProps, hoverEffect, className)}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
