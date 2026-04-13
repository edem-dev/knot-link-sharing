import React from 'react';
import {Icon} from "lucide-react";

export interface FeatureCardProps {
    icon:React.ElementType;
    title:string;
    description:string;
    className?:string;
}

const FeatureCard:React.FC<FeatureCardProps> = ({
    icon:Icon,
    title,
    description,
    className = "",
}) => {
    return (
        <article
            className={[
                'bg-white dark:bg-slate-900',
                'border border-slate-100 dark:border-slate-800',
                'rounded-3xl p-6',
                'hover:shadow-md hover:-translate-y-0.5',
                'transition-all duration-200',
                className,
            ].join(' ')}
        >
            <div
                className={[
                    'w-12 h-12 rounded-2xl mb-4',
                    'bg-brand-100 dark:bg-brand-900/40',
                    'text-brand-600 dark:text-brand-400',
                    'flex items-center justify-center',
                    '[&>svg]:w-6 [&>svg]:h-6',
                    // [&>svg] is a Tailwind v4 arbitrary child selector:
                    // "target any <svg> that is a direct child of this element"
                    // This sizes the lucide icon without the caller needing to pass a className.
                ].join(" ")}
            >
                <Icon aria-hidden="true" className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-slate-900 dark:text-white text-base mb-1.5">
                {title}
            </h3>
            <p className="font-body text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {description}
            </p>
        </article>
    );
};

export default FeatureCard;
