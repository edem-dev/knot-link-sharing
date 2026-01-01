import React from "react";

interface AnalyticsProgressProps {
    progress: number; // 0–100
}

const AnalyticsProgressBar: React.FC<AnalyticsProgressProps> = ({progress,}) => {
    // const clampedProgress = Math.min(100, Math.max(0, progress));

    return (
        <div className="flex  items-center gap-2">
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />

            </div>
            <p className={"font-body text-sm"}>{progress}%</p>
        </div>
    );
};

export default AnalyticsProgressBar;
