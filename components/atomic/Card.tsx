import React from 'react';
import clsx from "clsx";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'outlined' | 'ghost';
    selected?: boolean;
    translateY?: boolean;
    size?: 'small' | 'medium' | 'large';
}

const base = ` rounded-md `

const variants = {
    default: 'bg-white shadow-md rounded-md',
    outlined: 'bg-white shadow-md rounded-md border border-gray-200',
    ghost: 'bg-transparent'
}

const sizes = {
    small: ' px-4 py-2',
    medium: 'text-base px-4 py-4',
    large: 'text-lg px-6 py-6'
}

const Card:React.FC<CardProps> = (
    {
        children,
        className ,
        variant = 'default',
        selected = false,
        translateY=true,
        size='medium'
    }
) => {
    return (
        <div
            className={clsx(`p-4 ${base} ${variants[variant]} ${sizes[size]} ${className}
            ${selected ? 'border-2 border-primary-500' : ''}
            ${ translateY 
                ? "hover:translate-y-[2px] transition-all duration-200"
                :""
            }
            `)}
        >
            {children}
        </div>
    );
};

export default Card;
