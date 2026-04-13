'use client'
import React from 'react';
import KnottedLogo from "@/components/atomic/KnottedLogo";

const loading = () => {
    return (
        <div
            className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-brand-50 via-white to-brand-100 dark:from-slate-950 dark:via-slate-900 dark:to-brand-950">
            <div className="flex flex-col items-center gap-8">
                {/* Animated Logo Container */}
                <div className="relative">
                    {/* Pulsing Background Glow */}
                    <div className="absolute inset-0 bg-brand-500/20 rounded-full blur-3xl animate-pulse"/>

                    {/* Logo with Rotation Animation */}
                    <div className="relative animate-spin-slow">
                        <KnottedLogo className="w-24 h-24 text-brand-600 dark:text-brand-400"/>
                    </div>

                    {/* Orbiting Dots */}
                    <div className="absolute inset-0 animate-spin">
                        <div
                            className="absolute top-0 left-1/2 w-2 h-2 bg-brand-500 rounded-full -translate-x-1/2 -translate-y-1/2"/>
                    </div>
                    <div className="absolute inset-0 animate-spin-reverse" style={{animationDelay: '0.5s'}}>
                        <div
                            className="absolute bottom-0 left-1/2 w-2 h-2 bg-brand-400 rounded-full -translate-x-1/2 translate-y-1/2"/>
                    </div>
                </div>

                {/* Loading Text with Gradient */}
                <div className="flex flex-col items-center gap-2">
                    <h2 className="text-2xl font-display font-bold bg-gradient-to-r from-brand-600 to-brand-800 dark:from-brand-400 dark:to-brand-600 bg-clip-text text-transparent">
                        Loading
                    </h2>
                    <div className="flex gap-1">
                        <span className="w-2 h-2 bg-brand-500 rounded-full animate-bounce"
                              style={{animationDelay: '0ms'}}/>
                        <span className="w-2 h-2 bg-brand-500 rounded-full animate-bounce"
                              style={{animationDelay: '150ms'}}/>
                        <span className="w-2 h-2 bg-brand-500 rounded-full animate-bounce"
                              style={{animationDelay: '300ms'}}/>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-64 h-1 bg-brand-200 dark:bg-brand-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-500 to-brand-600 animate-loading-bar"/>
                </div>
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

              @keyframes spin-reverse {
                from {
                  transform: rotate(360deg);
                }
                to {
                  transform: rotate(0deg);
                }
              }

              @keyframes loading-bar {
                0% {
                  transform: translateX(-100%);
                }
                100% {
                  transform: translateX(400%);
                }
              }

              .animate-spin-slow {
                animation: spin-slow 3s linear infinite;
              }

              .animate-spin-reverse {
                animation: spin-reverse 4s linear infinite;
              }

              .animate-loading-bar {
                animation: loading-bar 1.5s ease-in-out infinite;
              }
            `}</style>
        </div>
    );
};

export default loading;
