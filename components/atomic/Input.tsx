import React from 'react';

interface InputProps {
    value: string;
    onChange: (value: string)=>void;
    type?: 'text' | 'password'|'email'|'number';
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    label?: string;
    error?: string;
    variant?: 'outline'| 'filled';
    width?: string;
}

const base = `py-2 px-4 rounded-md`
const variants = {
    outline: 'border border-gray-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50',
    filled: 'bg-gray-100 focus:bg-white'
}

const Input:React.FC<InputProps> = (
    {
        value,
        onChange,
        type = 'text',
        placeholder,
        disabled = false,
        required = false,
        label,
        error,
        variant = 'outline',
        width
    }
) => {
    return (
        <div className={"flex flex-col"}>
            {label && <label>{label}</label>}
            <input
                type={type}
                value={value}
                onChange={(e)=>onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className={`${base} ${width} ${variants[variant]} ${error ? 'border-red-500' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} focus:outline-2 outline-gray-300`}
            />
            {error && <p className={"text-red-500"}>{error}</p>}
        </div>
    );
};

export default Input;
