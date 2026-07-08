import React from 'react';
import {Sparkles, ArrowLeft} from 'lucide-react';
import PublicBranding from '@/components/sectional/UserSectionals/PublicBranding';
import Link from 'next/link';

const TemplatesPage = () => {
    return (
        <section>
            <nav>
                <Link
                    href="/"
                    className={[
                        'mx-4 my-4',
                        'flex items-center gap-2',
                        'text-slate-600 dark:text-slate-400',
                        'hover:text-brand-400 dark:hover:text-brand-400',
                        'transition-colors duration-200',
                        'font-body text-sm',
                    ].join(' ')}
                >
                    <ArrowLeft className="w-4 h-4"/>
                    <span>Back to home</span>
                </Link>
            </nav>
            <div
                className={[
                    'min-h-screen bg-white dark:bg-slate-950',
                    'flex flex-col items-center justify-center',
                    'px-5 py-10',
                    'relative',
                ].join(' ')}
            >

                <main className="flex flex-col items-center text-center max-w-md w-full mb-8">
                    {/* Decorative Icon */}
                    <div
                        className={[
                            'w-20 h-20 rounded-full',
                            'bg-brand-50 dark:bg-brand-950',
                            'border-2 border-brand-200 dark:border-brand-800',
                            'flex items-center justify-center mb-6',
                        ].join(' ')}
                    >
                        <Sparkles
                            className="w-10 h-10 text-brand-400"
                            aria-hidden="true"
                        />
                    </div>

                    {/* Heading */}
                    <h1
                        className={[
                            'font-display font-extrabold mb-4',
                            'text-4xl text-slate-900 dark:text-white',
                        ].join(' ')}
                    >
                        Templates
                    </h1>

                    {/* Coming Soon Label */}
                    <p
                        className={[
                            'font-display font-bold text-sm',
                            'tracking-widest uppercase',
                            'text-brand-400 dark:text-brand-400',
                            'mb-5',
                        ].join(' ')}
                    >
                        Coming Soon
                    </p>

                    {/* Description */}
                    <p
                        className={[
                            'font-body text-base',
                            'text-slate-500 dark:text-slate-400',
                            'leading-relaxed',
                        ].join(' ')}
                    >
                        We're crafting beautiful, ready-to-use templates for your profiles.
                        Check back soon to discover designs that make your links stand out.
                    </p>
                </main>

                {/* Branding Footer */}
                <PublicBranding/>
            </div>

        </section>
 );
};

export default TemplatesPage;
