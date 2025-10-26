'use client';

import React from 'react';

interface NavLinksWrapperProps{
    children:React.ReactNode;
    links?:string;
}

const NavLinksWrapper:React.FC<NavLinksWrapperProps> = (
    {
        children,
        links
    }
) => {
    return (
        <div className={"flex items-center gap-4"}>{children}</div>
    );
};

export default NavLinksWrapper;
