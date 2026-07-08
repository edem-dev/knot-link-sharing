'use client';

import React from 'react';
import { clsx } from 'clsx';
import { BarChart2, Globe, MousePointerClick, TrendingUp, Users } from 'lucide-react';

//===========================Analytics Panel ==========================================//
// Shared between Desktop `DashboardPage` and `MobileDashboardPage`.
// This panel is shown when 'activePath === "/analytics"'. Contains hardcoded data.
// TODO: Replace hardcoded data with actual analytics data from API.
const AnalyticsPanel: React.FC = () => {
    //===================Overview stats data ==========================//
    const overviewStats = [
        { label: 'Total Views',  value: '12,847', delta: '+12% this week', Icon: Globe             },
        { label: 'Link Clicks',  value: '3,291',  delta: '+8% this week',  Icon: MousePointerClick },
        { label: 'Followers',    value: '1,024',  delta: '+24 this week',  Icon: Users             },
        { label: 'Top Link CTR', value: '34.2%',  delta: 'Portfolio',      Icon: TrendingUp        },
    ];

    //================== Top Links ====================================//
    const topLinks = [
        { title: 'Portfolio Website', clicks: 892, pct: 72 },
        { title: 'Latest Case Study', clicks: 421, pct: 34 },
        { title: 'YouTube Channel',   clicks: 210, pct: 17 },
    ];

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

                {/*==============================Analytics Data ==========================*/}
                <div className="grid grid-cols-2 gap-4">
                    {overviewStats.map(({ label, value, delta, Icon }) => (
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
                            <p className="text-xs font-body text-slate-400 dark:text-slate-500">{delta}</p>
                        </div>
                    ))}
                </div>
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
                {/*=====================Top Links Heading ========================*/}
                <h2
                    id="analytics-top-links-heading"
                    className={clsx(
                        'font-display font-bold text-base',
                        'text-slate-800 dark:text-white mb-6'
                    )}
                >
                    Top Links
                </h2>
                {/*======================Top Links Content=====================*/}
                <div className="flex flex-col gap-4">
                    {topLinks.map(({ title, clicks, pct }) => (
                        <div key={title}>
                            <div className="flex items-center justify-between mb-2">
                                <span
                                    className={clsx(
                                        'text-sm font-body font-medium',
                                        'text-slate-700 dark:text-slate-200',
                                        'truncate'
                                    )}
                                >
                                    {title}
                                </span>
                                <span className="text-sm font-body text-slate-500 flex-shrink-0 ml-3">
                                    {clicks} clicks
                                </span>
                            </div>
                            {/*=====================Progress Bar =======================*/}
                            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-brand-600 rounded-full transition-all duration-500"
                                    style={{ width: `${pct}%` }}
                                    // inline style — Tailwind can't generate arbitrary % widths
                                    // from dynamic values. Inline style is correct here.
                                    role="progressbar"
                                    aria-valuenow={pct}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-label={`${title}: ${pct}% of clicks`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AnalyticsPanel;
