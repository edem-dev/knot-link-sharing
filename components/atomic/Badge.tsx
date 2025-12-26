import React from 'react';
import { X } from 'lucide-react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'warning'|'error'|'info'|'neutral';
    size?: 'small' | 'medium' | 'large';
    icon?: React.ReactNode;
    dismissable?: boolean;
}

const variants = {
    success: 'bg-blue-100 text-blue-700',
    warning: 'bg-yellow-100 text-yellow-700',
    error: 'bg-red-100 text-red-700',
    info: 'bg-purple-100 text-purple-700',
    neutral: 'bg-gray-100 text-gray-700'
}

const sizes = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
}

const Badge:React.FC<BadgeProps> = (
    {
        children,
        variant = 'neutral',
        size='small',
        icon,
        dismissable = false
    }
) => {
    return (
        <div className={`flex items-center gap-2 px-2 py-1 rounded-md ${variants[variant]} ${size}`}>
            {icon && <span> icon</span>}
            <span>
                {children}
            </span>
            {dismissable &&
                <button>
                    <X  size={16}/>
                </button>
            }
        </div>
    );
};

export default Badge;
