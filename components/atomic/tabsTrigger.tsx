import React from 'react';

interface TabsTriggerProps {
     value:string;
     onChange:(value: string)=>void;
     activeTab:string;
     children:React.ReactNode;
     disabled?:boolean;
     className?:string;

}

const tabsTrigger:React.FC<TabsTriggerProps> = (
    {
        value,
        onChange,
        activeTab,
        children,
        disabled = false,
        className
    }
) => {

    const isaActive = value === activeTab

    const handleClick = () =>{
        if(disabled) return;
        onChange(value)
    }

    return (
        <button
            type={"button"}
            onClick={handleClick}
            disabled={disabled}
            aria-selected={isaActive}
            role={"tab"}
            className={
            `${className} px-4 py-4 text-sm font-body border-b-2 transition-colors
            ${
                isaActive
                    ? "border-primary text-primary"
                    :"border-transparent text-gray-500 hover:text-gray-700"
            }
            ${disabled? "opacity-50 cursor-not-allowed":""}
            `
            }
        >
            {children}
        </button>
    );
};

export default tabsTrigger;
