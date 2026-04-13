'use client';
import React from 'react';
import Badge from "@/components/atomic/Badge";

export interface LinkCountBadgeProps {
    count: number;
    className?: string;
}


const LinkCountBadge:React.FC<LinkCountBadgeProps> = ({
    count,
    className = '',
}) => {
    return (
        <Badge
            className={className}
            variant={'purple'}
            size={'sm'}
            aria-label={`${count} active ${count === 1 ? 'link' : 'links'}`}
        >
            {count} {count === 1 ? 'link' : 'links'}
        </Badge>
    );
};

export default LinkCountBadge;
