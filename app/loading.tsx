'use client'
import React from 'react';
import KnottedLogo from "@/components/atomic/KnottedLogo";

const loading = () => {
    return (
        <div
            className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-brand-50 via-white to-brand-100 dark:from-slate-950 dark:via-slate-900 dark:to-brand-950">
            <div className="animate-spin-slow">
                <KnottedLogo className="w-24 h-24 text-brand-600 dark:text-brand-400"/>
            </div>

            <style jsx>{`
              @keyframes spin-slow {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }

              .animate-spin-slow {
                animation: spin-slow 3s linear infinite;
              }
            `}</style>
        </div>
    );
};

export default loading;
