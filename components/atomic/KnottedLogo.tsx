"use client";
import Link from "next/link";
import React from "react";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

export type LogoSize = "sm" | "md" | "lg";

export interface KnottedLogoProps {
    size?: LogoSize;
    className?: string;
    asLink?: boolean;
    asMobile?: boolean;
    logoText?: boolean;
}

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

// Image path from /public folder
const LOGO_SRC = "/Image/knotted-logo-icon.svg";

// Locked brand text
const LOGO_TEXT = "Knotted";

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

export const KnottedLogo: React.FC<KnottedLogoProps> = (
    {
        size = "md",
        className = "",
        asLink,
        logoText,
        asMobile,
    }) => {
    // ─────────────────────────────────────────────────────────
    // SIZE MAP
    // ─────────────────────────────────────────────────────────
    const sizes: Record<LogoSize, { icon: string; text: string }> = {
        sm: { icon: "w-6 h-6", text: "text-base" },
        md: { icon: "w-8 h-8", text: "text-xl" },
        lg: { icon: "w-10 h-10", text: "text-2xl" },
    };

    const { icon, text } = sizes[size];

    // ─────────────────────────────────────────────────────────
    // IMAGE MARK
    // ─────────────────────────────────────────────────────────
    const Mark = ()  => (
        <img
            src={LOGO_SRC}
            alt="Knotted logo"
            className={`${icon} object-contain shrink-0`}
        />
    );

    // ─────────────────────────────────────────────────────────
    // CONTENT
    // ─────────────────────────────────────────────────────────
    const content = (
        <span className={`inline-flex items-center gap-2 ${className}`}>
            <Mark />

            {logoText && (
                <span className={`font-display font-bold tracking-tight ${text}`}>
                    {LOGO_TEXT}
                </span>
            )}

    </span>
    );

    // ─────────────────────────────────────────────────────────
    // LINK WRAP
    // ─────────────────────────────────────────────────────────
    if (asLink) {
        return (
            <Link
                href="/"
                aria-label="Knotted — go to homepage"
                className="m-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-lg"
            >
                {content}
            </Link>
        );
    }

    if (asMobile) {
        return (
            <Link
                href="/dashboard"
                aria-label="Knotted — go to homepage"
                className="m-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-lg"
            >
                {content}
            </Link>
        );
    }


    return content;
};

export default KnottedLogo;