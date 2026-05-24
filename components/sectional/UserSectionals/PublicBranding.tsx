'use client';

import React from 'react';
import Link from 'next/link';
import Button from "@/components/atomic/Button";
import KnottedLogo from "@/components/atomic/KnottedLogo";

const PublicBranding = () => {
    return (
        <footer className="w-full flex items-center flex-col gap-4 max-w-sm">

            <p className="text-center text-xs font-display font-semibold uppercase tracking-widest text-slate-300 dark:text-slate-600 mb-3">
                Powered by Knotted
            </p>
            <KnottedLogo size={"sm"}/>
            <div className="flex gap-4 items-center justify-between bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-3">

          <span className="text-xs font-display font-semibold text-slate-500 dark:text-slate-400 tracking-wider">
            Create your own
          </span>

                <div className="flex gap-2">

                    <Link href="/sign-up">
                        <Button
                            variant="primary"
                            size="sm"
                            type="button"
                        >
                            Sign Up
                        </Button>
                    </Link>

                    <Link href="/sign-in">
                        <Button
                            variant="outline"
                            size="sm"
                            type="button"
                        >
                            Log In
                        </Button>
                    </Link>
                </div>

            </div>
        </footer>


    );
};

export default PublicBranding;
