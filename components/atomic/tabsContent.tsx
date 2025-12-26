import React from 'react';

interface TabsContentProps {
    value:string;
    activeTab:string;
    children:React.ReactNode;
}

const tabsContent:React.FC<TabsContentProps> = (
    {
        value,
        activeTab,
        children
    }
) => {
    if(value !== activeTab) return null;

    return (
        <div
        role={"tabpanel"}
        className={" p-4 text-sm text-gray-700 border-t border-gray-200 "}
        >
            {children}
        </div>
    );
};

export default tabsContent;
