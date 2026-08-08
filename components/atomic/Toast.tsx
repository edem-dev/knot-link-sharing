'use client';

import React, {useEffect, useState} from 'react';
import {AlertCircle, CheckCircle2,X} from "lucide-react";

export type ToastVariant = "success" | "error";

interface ToastProps {
    variant:ToastVariant;
    message:string;
    duration?:number;
    onDismiss :()=>void;
}

const Toast:React.FC<ToastProps> = (
    {
        variant,
        message,
        duration = 3500,
        onDismiss,
    }
) => {
    // ============== Visible states ======================
    const [visible, setVisible] = useState(false)

    // Effect for fade in animation
    useEffect(() => {
        // This time out allows the Dom to update before we show the toast
        const show = setTimeout(() => {
            setVisible(true);
        }, 10);

        const hide = setTimeout(() => {
            setVisible(false);
            setTimeout(onDismiss, 300)
        }, duration)

        return () => {
            clearTimeout(show)
            clearTimeout(hide)
        };
    }, [duration, onDismiss]);

    const config = {
        success: {
            icon:   CheckCircle2,
            styles: 'bg-white dark:bg-slate-900 border-emerald-200 dark:border-emerald-800',
            text:   'text-emerald-700 dark:text-emerald-400',
        },
        error: {
            icon:   AlertCircle,
            styles: 'bg-white dark:bg-slate-900 border-red-200 dark:border-red-800',
            text:   'text-red-600 dark:text-red-400',
        },
    }[variant]

    const Icon = config.icon;

    return (
        <div
            role="status"
            aria-live="polite"
            className={[
                'fixed bottom-6 left-1/2 z-50',
                '-translate-x-1/2',
                'flex items-center gap-3',
                'px-4 py-3 rounded-2xl',
                'border shadow-lg',
                'transition-all duration-300',
                config.styles,
                visible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2',
            ].join(' ')}
        >
            <Icon className={`w-4 h-4 flex-shrink-0 ${config.text}`} aria-hidden="true" />
            <p className={`text-sm font-body font-medium ${config.text}`}>
                {message}
            </p>
            <button
                type="button"
                onClick={() => {
                    setVisible(false)
                    setTimeout(onDismiss, 300)
                }}
                aria-label="Dismiss"
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 ml-1 transition-colors"
            >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
        </div>
    );
};

export default Toast;
