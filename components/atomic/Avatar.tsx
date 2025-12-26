import React from 'react';
import Image from "next/image";


interface AvatarProps {
    src?: string;
    name: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    alt?: string;
    ariaLabel?: string;
    onClick?: () => void;
}

const getInitials = (name: string) => {
    if (!name) return '';

    return name
        .trim()
        .split(/\s+/)
        .map(word => word[0])
        .join('')
        .toUpperCase();
};

const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-14 w-14 text-lg',
};

const Avatar: React.FC<AvatarProps> = (
    {
        src,
        name,
        size = 'md',
        className = '',
        alt,
        ariaLabel,
        onClick,
    }) => {
    const initials = getInitials(name);

    return (
        <div
            className={`
        inline-flex items-center justify-center
        rounded-full overflow-hidden
        ${sizes[size]}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            aria-label={ariaLabel || name}
            tabIndex={onClick ? 0 : undefined}
        >
            {src ? (
                <Image
                    width={10}
                    height={10}
                    src={src}
                    alt={alt || name}
                    className="h-full w-full object-cover"
                />
            ) : (
                <span className=" flex h-full w-full items-center justify-center border-2 border-blue-300 bg-gray-200 font-medium rounded-full">
          {initials}
        </span>
            )}
        </div>
    );
};

export default Avatar;
