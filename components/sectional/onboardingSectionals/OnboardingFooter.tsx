import React from 'react';

const OnboardingFooter = () => {
    return (
        <footer
            className="py-6 px-6 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800"
            role="contentinfo"
        >
            <div className="flex gap-6">
                {['Privacy Policy', 'Terms of Service', 'Help Center'].map((item) => (
                    <a
                        key={item}
                        href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                        className={[
                            'text-xs font-body',
                            'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300',
                            'transition-colors duration-150',
                        ].join(' ')}
                    >
                        {item}
                    </a>
                ))}
            </div>
            <p className="text-xs font-body text-slate-400 dark:text-slate-500">
                © {new Date().getFullYear()} Knotted Inc.
            </p>
        </footer>    );
};

export default OnboardingFooter;
