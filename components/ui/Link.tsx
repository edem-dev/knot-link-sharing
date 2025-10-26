'use client';

import React from 'react';
import Link from 'next/link'

interface LinkProps{
    linkTitle:string;
    href:string;
    target?:string;
}

const LinkComponent:React.FC<LinkProps> = (
    {
        linkTitle,
        href,
        target
    }
) => {
    return (
        <>
        <Link target={target} href={href}>{linkTitle}</Link>
        </>
    );
};

export default LinkComponent;
