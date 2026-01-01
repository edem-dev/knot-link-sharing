import React from 'react';

interface TabsContentProps {
    value:string;
    activeTab:string;
    children:React.ReactNode;
    bordered?:boolean;
}

const tabsContent:React.FC<TabsContentProps> = (
    {
        value,
        activeTab,
        children,
        bordered = true
    }
) => {
    if(value !== activeTab) return null;

    return (
        <div
        role={"tabpanel"}
        className={`  text-sm text-gray-700 ${bordered?"border-t border-gray-200 ":""}`}
        >
            {children}
        </div>
    );
};

export default tabsContent;
