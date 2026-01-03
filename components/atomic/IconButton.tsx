'use client'
import React from 'react';

interface IconButtonProps {
    icon: React.ReactNode;
    onClick?: ()=>void;
    disabled?: boolean;
    ariaLabel?: string;
    size?: 'small' | 'medium' | 'large';
    variant?: 'primary' | 'secondary'|'danger'|'ghost'|'link';
    shape?: 'circle' | 'square';
    className?: string;
}

const variants = {
    primary: 'bg-[#4B46E4] text-white',
    secondary: 'bg-[#E5E5E5] text-primary',
    danger: 'bg-[#F40000] text-white',
    ghost: 'bg-transparent text-gray-500 hover:bg-gray-200',
    link: 'text-primary-500 hover:text-primary-600'
}
const sizes = {
    small: 'text-sm px-2 py-2',
    medium: 'text-base px-4 py-4',
    large: 'text-lg px-6 py-6'
}

const shapes = {
    circle: 'rounded-full',
    square: 'rounded-md'
}

const IconButton:React.FC<IconButtonProps> = (
    {
        icon,
        onClick,
        disabled = false,
        ariaLabel,
        size='small',
        variant = 'primary',
        shape='circle',
        className
    }
) => {
    return (
        <div
            className={`flex justify-center items-center ${className}
              ${variants[variant]} ${sizes[size]} ${shapes[shape]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={onClick}
            aria-label={ariaLabel}
        >
            {icon}
        </div>
    );
};

export default IconButton;
