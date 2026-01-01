'use client'
import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    onClick?: ()=>void;
    disabled?: boolean;
    loading?: boolean;
    variant?: 'primary' | 'secondary'|'danger'|'ghost'|'link'|'outlined';
    size? :'small' | 'medium' | 'large';
    wholeWidth?: boolean;
}

const base = `py-2 px-4 rounded-md font-body`

const variants = {
    outlined: 'border border-gray-300 hover:border-primary-500',
    primary: 'bg-primary text-white',
    secondary: 'bg-[#E5E5E5] text-gray-700',
    danger: 'bg-[#F40000] text-white',
    ghost: 'bg-transparent text-primary-500 hover:text-primary-600',
    link: 'text-primary-500 hover:text-primary-600'

}

const sizes = {
    small: 'text-sm px-2 py-1',
    medium: 'text-base px-2 py-2',
    large: 'text-lg px-4 py-4'
}

const Button:React.FC<ButtonProps> = (
    {
        children,
        type = 'button',
        onClick,
        disabled = false,
        loading = false,
        variant = 'primary',
        size='small',
        wholeWidth = false
    }
) => {
    const className = `
    ${base} ${variants[variant]} ${sizes[size]}
    ${wholeWidth ? 'w-full' : ''}
 
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
    focus:outline-2 hover:bg-opacity-75 transition-all duration-200
     hover:-translate-y-[2px] hover
     flex items-center justify-center
     my-4
     `

    return (
        <button
            className={className}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {children}
        </button>
    );
};

export default Button;
