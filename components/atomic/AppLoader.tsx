// Shared visual for loading.tsx boundaries. Deliberately simple —
// no skeleton shapes, just the wordmark + a spinner. Reused directly
// by app/loading.tsx, and reusable later by any route-specific
// loading.tsx (e.g. onboarding) without duplicating markup.

import { Loader2 } from 'lucide-react'

export interface AppLoaderProps {
    /** Optional message under the spinner. Omit for spinner only. */
    label?: string
}

export default function AppLoader({ label }: AppLoaderProps) {
    return (
        <div
            role="status"
            aria-live="polite"
            className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white dark:bg-slate-950"
        >
      <span className="font-display font-bold text-[5rem] tracking-tight text-brand-600 dark:text-brand-400">
        Knotted
      </span>
            <Loader2 className="w-10 h-10 animate-spin text-brand-600 dark:text-brand-400" aria-hidden="true" />
            {label && (
                <span className="text-sm font-body text-slate-400 dark:text-slate-500">{label}</span>
            )}
            <span className="sr-only">Loading…</span>
        </div>
    )
}