import React from 'react';
import Button from "@/components/atomic/Button";
import KnottedLogo from "@/components/atomic/KnottedLogo";

const PublicBranding = () => {
    return (
        <footer className="w-full flex items-center flex-col gap-4 max-w-sm">

            <p className="text-center text-xs font-display font-semibold uppercase tracking-widest text-slate-300 dark:text-slate-600 mb-3">
                Powered by Knotted
            </p>
            <KnottedLogo  size={"sm"}/>
            <div className="flex gap-4 items-center justify-between bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700  rounded-full px-4 py-3">

          <span className="text-xs font-display font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Create your own
          </span>

                <div className="flex gap-2">

                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => { window.location.href = '/sign-up'; }}
                        type="button"
                    >
                        Sign Up
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => { window.location.href = '/sign-in'; }}
                        type="button"
                    >
                        Log In
                    </Button>
                </div>

            </div>
        </footer>


    );
};

export default PublicBranding;
