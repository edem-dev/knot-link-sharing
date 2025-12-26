import React from 'react';

interface TabsTriggerProps {
     value:string;
     onChange:(value: string)=>void;
     activeTab:string;
     children:React.ReactNode;
     disabled?:boolean;
}

const tabsTrigger:React.FC<TabsTriggerProps> = (
    {
        value,
        onChange,
        activeTab,
        children,
        disabled = false
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
            `px-4 py-2 text-sm font-body border-b-2 transition-colors
            ${
                isaActive
                    ? "border-blue-500 text-blue-600"
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
