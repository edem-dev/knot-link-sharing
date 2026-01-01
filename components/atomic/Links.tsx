import React from 'react';

type LinkVariant = 'default' | 'primary' | 'secondary' | 'subtle';

interface LinkProps {
    href: string;
    children: React.ReactNode;
    variant?: LinkVariant;
    className?: string;
    external?: boolean;
    disabled?: boolean;
}

const variantStyles: Record<LinkVariant, string> = {
    default: 'text-gray-700 hover:text-gray-900 visited:text-purple-600 active:text-gray-950',
    primary: 'text-[#A75EF8] hover:text-purple-700 visited:text-purple-800 active:text-purple-900',
    secondary: 'text-gray-500 hover:text-gray-700 visited:text-gray-600 active:text-gray-800',
    subtle: 'text-gray-400 hover:text-gray-600 visited:text-gray-500 active:text-gray-700'
};

const Link: React.FC<LinkProps> = ({
                                       href,
                                       children,
                                       variant = 'default',
                                       className = '',
                                       external = false,
                                       disabled = false
                                   }) => {
    const baseStyles = 'transition-colors duration-200 ease-in-out';
    const disabledStyles = disabled ? 'cursor-not-allowed opacity-50' : '';
    const variantStyle = variantStyles[variant];

    const combinedClassName = `${baseStyles} ${variantStyle} ${disabledStyles} ${className}`.trim();

    const linkProps = {
        className: combinedClassName,
        href: disabled ? '#' : href,
        ...(external && {target: '_blank', rel: 'noopener noreferrer'}),
        onClick: (e: React.MouseEvent) => {
            if (disabled) {
                e.preventDefault();
            }
        }
    };

    return <a {...linkProps}>{children}</a>;
};

export default Link;