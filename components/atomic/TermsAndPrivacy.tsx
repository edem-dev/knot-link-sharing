'use client';
import React from 'react';
import Link from "next/link";

const TermsAndPrivacy = () => {
    return (
        <p
            className={[
                'text-center text-xs font-display',
                'text-slate-400 dark:text-slate-500',
                'mt-4 leading-relaxed',
            ].join()}
        >
            By creating an account, you agree to our{' '}
            <Link
                href="/terms"
                className={[
                    'text-brand-600  hover:text-brand-700',
                    'dark:text-brand-400  hover:underline',
                    'transition-colors duration-150',
                ].join(' ')}
            >
                Terms of Service
            </Link>
            {' '}and{' '}
            <Link
                href="/privacy"
                className={[
                    'text-brand-600  hover:text-brand-700',
                    'dark:text-brand-400  hover:underline',
                    'transition-colors duration-150',
                ].join(' ')}
            >
                Privacy Policy
            </Link>
            .
        </p>

    );
};

export default TermsAndPrivacy;
