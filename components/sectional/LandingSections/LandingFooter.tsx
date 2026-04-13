import React from 'react';
import KnottedLogo from "@/components/atomic/KnottedLogo";
import Link from "next/link";

export interface LandingFooterProps {
    className?:string;
}

// Landing footer data
const FOOTER_COLUMNS = [
    {
        heading: 'Product',
        links: [
            { href: '/features',  label: 'Features'  },
            { href: '/templates', label: 'Templates' },
            { href: '/pricing',   label: 'Pricing'   },
        ],
    },
    {
        heading: 'Legal',
        links: [
            { href: '/privacy', label: 'Privacy' },
            { href: '/terms',   label: 'Terms'   },
            { href: '/cookies', label: 'Cookies' },
        ],
    },
    {
        heading: 'Connect',
        links: [
            { href: 'https://twitter.com/knotted', label: '@knotted' },
            { href: 'https://github.com/knotted',  label: 'GitHub'   },
            { href: '/developers',                 label: 'API'       },
        ],
    },
] as const;


const LandingFooter: React.FC<LandingFooterProps> = ({
    className= ""
}) => {
    return (
        <footer
            className={[
                'bg-white dark:bg-slate-950',
                'border-t border-slate-100 dark:border-slate-800',
                'py-10 px-6',
                className,
            ].join(" ")}
            role="contentinfo"
        >
            {/*Footer content wrapper ----------------------------*/}
            <div
                className={'mx-auto max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-10'}
            >
            {/*Left side: Brand column----------------------------------*/}
                <div className={"flex j flex-col items-center md:items-start gap-2"}>
                    {/*Knotted logo wrapper:----------------------------------------*/}
                    <div className={'flex items-center gap-2'}>
                        <KnottedLogo logoText={true} asLink={true}/>
                    </div>
                {/*    Date:--------------------------------------*/}
                    <p className={'text-xs text-center font-body text-slate-400 max-w-[14rem] leading-relaxed'}>
                        © {new Date().getFullYear()}<br/> Knotted. Built for the modern web
                    </p>
                </div>
            {/*    Right side: Social media column----------------------------------*/}
                <div className={'flex gap-12 flex-wrap'}>
                    {FOOTER_COLUMNS.map(({heading, links}) => (
                        <div key={heading}>
                        {/*    Column heading--------------------------------------*/}
                            <p
                                className={[
                                    'text-xs font-display font-bold',
                                    'uppercase tracking-widest',
                                    'text-slate-500 dark:text-slate-400 mb-3'
                                ].join(' ')}
                            >
                                {heading}
                            </p>
                        {/*    Links List*/}
                            <ul className={'flex flex-col gap-2'} role={'list'}>
                                {links.map(({href, label}) => (
                                  <li key={href}>
                                      <Link
                                        href={href}
                                        className={[
                                            'text-xs font-body text-slate-400',
                                            'hover:text-brand-600 dark:hover:text-brand-400',
                                            'transition-colors duration-150',
                                            'focus-visible:outline-none focus-visible:ring-1',
                                            'focus-visible:ring-brand-600 rounded',
                                        ].join(' ')}
                                      >
                                          {label}
                                      </Link>
                                  </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

        </footer>
    );
};

export default LandingFooter;
