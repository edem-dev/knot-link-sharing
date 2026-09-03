'use client';

import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { BarChart2, Globe, MousePointerClick } from 'lucide-react';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';

//===========================Analytics Panel ==========================================//
// Shared between Desktop `DashboardPage` and `MobileDashboardPage`.
// Shown when activePath === '/analytics'. Fetches real data from
// GET /api/analytics on mount — no more hardcoded numbers.
interface LinkStat {
    id: string
    title: string
    clicks: number
}

interface AnalyticsData {
    totalViews: number
    totalClicks: number
    links: LinkStat[]
}

const AnalyticsPanel: React.FC = () => {
    const [data, setData]       = useState<AnalyticsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError]     = useState('')

    useEffect(() => {
        let cancelled = false

        const load = async () => {
            setLoading(true)
            setError('')

            try {
                const res  = await fetch('/api/analytics')
                const body = await res.json()

                if (!res.ok) throw new Error(body.error ?? 'Could not load analytics')
                if (!cancelled) setData(body)
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Could not load analytics')
                }
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        load()
        // Guards against setting state after unmount — e.g. the user
        // navigates off the /analytics tab before the fetch resolves.
        return () => { cancelled = true }
    }, [])

    const overviewStats = data
        ? [
            { label: 'Total Views', value: data.totalViews.toLocaleString(),  Icon: Globe             },
            { label: 'Link Clicks', value: data.totalClicks.toLocaleString(), Icon: MousePointerClick },
        ]
        : []



    return (
        <div className="flex flex-col gap-6">
            {/* ================== Overview Stats Section ==================*/}
            <section
                className={clsx(
                    'bg-white dark:bg-slate-900',
                    'rounded-3xl border border-slate-100',
                    'dark:border-slate-800 p-6'
                )}
            >
                <h2
                    id="analytics-overview-heading"
                    className={clsx(
                        'font-display font-bold text-base',
                        'text-slate-800 dark:text-white',
                        'flex items-center gap-2 mb-6'
                    )}
                >
                    <BarChart2 className="w-5 h-5 text-brand-500" aria-hidden="true" />
                    Overview
                </h2>

                {loading && (
                    <div className="grid grid-cols-2 gap-4">
                        {[0, 1].map((i) => (
                            <div
                                key={i}
                                className="h-24 bg-slate-50 dark:bg-slate-800 rounded-2xl animate-pulse"
                            />
                        ))}
                    </div>
                )}

                {!loading && error && (
                    <p className="text-sm font-body text-red-500" role="alert">
                        {error}
                    </p>
                )}

                {!loading && !error && data && (
                    <div className="grid grid-cols-2 gap-4">
                        {overviewStats.map(({ label, value, Icon }) => (
                            <div
                                key={label}
                                className={clsx(
                                    'flex flex-col gap-2',
                                    'bg-slate-50 dark:bg-slate-800',
                                    'rounded-2xl p-4'
                                )}
                            >
                                <div className="flex items-center gap-2">
                                    <Icon className="w-5 h-5 text-brand-500 dark:text-brand-400" aria-hidden="true" />
                                    <span
                                        className={clsx(
                                            'font-display font-semibold text-xs',
                                            'uppercase tracking-widest text-slate-500 dark:text-slate-400'
                                        )}
                                    >
                                        {label}
                                    </span>
                                </div>
                                <p
                                    className={clsx(
                                        'font-display font-extrabold text-2xl',
                                        'text-slate-900 dark:text-white'
                                    )}
                                >
                                    {value}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/*============================= Top Links Stats Section============================*/}
            <section
                aria-labelledby="analytics-top-links-heading"
                className={clsx(
                    'bg-white dark:bg-slate-900',
                    'rounded-3xl border border-slate-100',
                    'dark:border-slate-800 p-6'
                )}
            >
                <h2
                    id="analytics-top-links-heading"
                    className={clsx(
                        'font-display font-bold text-base',
                        'text-slate-800 dark:text-white mb-6'
                    )}
                >
                    Top Links
                </h2>

                {loading && (
                    <div className="h-48 bg-slate-50 dark:bg-slate-800 rounded-2xl animate-pulse" />
                )}

                {!loading && !error && data && data.links.length === 0 && (
                    <p className="text-sm font-body text-slate-400 dark:text-slate-500 text-center py-8">
                        No links yet — add some links to start tracking clicks.
                    </p>
                )}

                {!loading && !error && data && data.links.length > 0 && (
                    <div style={{ width: '100%', height: Math.max(160, data.links.length * 48) }}>
                        <ResponsiveContainer>
                            <BarChart
                                data={data.links}
                                layout="vertical"
                                margin={{ top: 0, right: 24, bottom: 0, left: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} className="stroke-slate-100 dark:stroke-slate-800" />
                                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
                                <YAxis
                                    type="category"
                                    dataKey="id"                              // unique category
                                    width={140}
                                    tick={{ fontSize: 12 }}
                                    tickFormatter={(id: string) => {
                                        const title = data.links.find(l => l.id === id)?.title ?? ''
                                        return title.length > 18 ? `${title.slice(0, 18)}…` : title
                                    }}
                                />
                                <Tooltip formatter={(value) => `${value} clicks`} />
                                <Bar dataKey="clicks" fill="#7C3AED" radius={[0, 6, 6, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </section>
        </div>
    );
};

export default AnalyticsPanel;