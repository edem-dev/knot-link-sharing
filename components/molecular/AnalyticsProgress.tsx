'use client'
import React from "react";

interface AnalyticsProgressProps {
    progress: number;
    linkName: string;
    borderBottom:boolean;
}

const AnalyticsProgress: React.FC<AnalyticsProgressProps> = (
    {
        progress,
        linkName,
        borderBottom
    }
) => {
    return (
        <div
            className={`${borderBottom? "border-b border-gray-100":""} flex flex-col gap-2 md:flex-row items-center justify-between py-4`}
        >
            {/* Link Name */}
            <div className="font-body w-full text-sm font-bold">
                {linkName}
            </div>

            {/* Progress Bar */}
            <div className="flex  w-full items-center gap-2">
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="font-body text-sm">{progress}%</p>
            </div>
        </div>
    );
};

export default AnalyticsProgress;
