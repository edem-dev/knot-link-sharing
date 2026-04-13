"use client";

import React from "react";

type StatItem = {
    icon: React.ReactNode;
    count?: number | string;
    label: string;
    onClick?: () => void;
};

interface StatBarProps {
    stats: StatItem[];
    className?: string;
}

/*  Smart formatter */
function formatCount(value: number | string) {
    if (typeof value !== "number") return value;

    if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
    }

    if (value >= 1_000) {
        return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
    }

    return value.toString();
}

const StatBar: React.FC<StatBarProps> = ({
        stats,
        className})=> {
    return (
        <div
            className={[
                "flex items-center justify-start gap-6",
                "text-slate-400",
                className,
            ].join(" ")}
        >
            {stats.map((stat, index) => {
                const isClickable = !!stat.onClick;

                return (
                    <div
                        key={index}
                        onClick={stat.onClick}
                        className={[
                            "flex items-center gap-1.5",
                            isClickable
                                ? "cursor-pointer hover:text-slate-500 transition-colors duration-150"
                                : "",
                        ].join(" ")}
                    >
                        {/* Icon */}
                        <span className="flex items-center justify-center">
              {stat.icon}
            </span>

                        {/* Count or Label */}
                        <span className="text-sm font-medium text-slate-500">
              {formatCount(stat.count ?? stat.label)}
            </span>
                    </div>
                );
            })}
        </div>
    );
}

export default StatBar;
