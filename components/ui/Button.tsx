'use client';

interface ButtonProps {
    title: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    style?: React.CSSProperties;
    ref?: React.Ref<HTMLButtonElement>;
}

import React from 'react';

const Button:React.FC<ButtonProps> = (
    {
        title,
        onClick,
        disabled,
        className,
        children,
        type,
        style,
        ref,
    }
) => {
    return (
       <>
       <button disabled={disabled} onClick={onClick} type={type} className={`${className}`}>{title}</button>
       </>
    );
};

export default Button;
