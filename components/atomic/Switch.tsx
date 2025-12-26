import React from 'react';

interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean)=>void;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

const Switch: React.FC<SwitchProps> = ({checked, onChange, disabled = false, size = 'md'}) => {
    // Size mappings for switch container
    const containerSizes = {
        sm: 'w-8 h-4',
        md: 'w-11 h-6',
        lg: 'w-14 h-7'
    };

    // Size mappings for toggle circle
    const circleSizes = {
        sm: 'w-3 h-3',
        md: 'w-5 h-5',
        lg: 'w-6 h-6'
    };

    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={() => !disabled && onChange(checked)}
            className={`
                ${containerSizes[size]}
                ${checked ? 'bg-blue-600' : 'bg-gray-200'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                relative inline-flex items-center rounded-full
                transition-colors duration-200 ease-in-out focus:outline-none
            `}
        >
            <span
                className={`
                    ${circleSizes[size]}
                    ${checked ? 'translate-x-full' : 'translate-x-0'}
                    bg-white rounded-full shadow transform
                    transition-transform duration-200 ease-in-out
                    pointer-events-none inline-block
                `}
            />
        </button>
    );
};

export default Switch;
