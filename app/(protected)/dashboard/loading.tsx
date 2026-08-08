// Next.js shows this file automatically while dashboard/page.tsx
// (the async server component) is resolving its data fetches.
// No props, no logic — pure visual placeholder.

export default function DashboardLoading() {
    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden animate-pulse">

            {/* Sidebar skeleton */}
            <aside className="w-64 flex-shrink-0 bg-white dark:bg-slate-950 border-r border-slate-100 dark:border-slate-800 px-4 py-6">
                <div className="h-8 w-32 bg-slate-200 dark:bg-slate-800 rounded-xl mb-6 mx-2" />

                <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 mb-6">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0" />
                    <div className="flex-1 space-y-1.5">
                        <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                        <div className="h-2.5 w-16 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                    </div>
                </div>

                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 mb-1" />
                ))}
            </aside>

            {/* Main content skeleton */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="h-16 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-8">
                    <div className="space-y-1.5">
                        <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                        <div className="h-3 w-40 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-48 bg-slate-100 dark:bg-slate-800 rounded-xl" />
                        <div className="h-9 w-36 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6">
                        <div className="h-5 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg mb-6" />
                        <div className="flex gap-6">
                            <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-800 flex-shrink-0" />
                            <div className="flex-1 space-y-4">
                                <div className="space-y-2">
                                    <div className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
                                    <div className="h-11 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
                                </div>
                                <div className="space-y-2">
                                    <div className="h-3 w-8 bg-slate-200 dark:bg-slate-800 rounded" />
                                    <div className="h-24 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6">
                        <div className="flex items-center justify-between mb-5">
                            <div className="h-5 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                            <div className="h-8 w-24 bg-slate-100 dark:bg-slate-800 rounded-xl" />
                        </div>
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl mb-3" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}