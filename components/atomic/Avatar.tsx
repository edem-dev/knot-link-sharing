"use client";

import React from "react";
import Image from "next/image";
import {Pencil} from "lucide-react";

const getInitials = (name: string): string => {
  if (!name?.trim()) return "";

  const parts  = name.trim().split(/\s+/);
  const first  = parts[0];
  const last   = parts[parts.length - 1];

  const raw = parts.length === 1 ? first[0] : first[0] + last[0];
  return raw.toUpperCase();
};

const SIZES = {
  sm: {px: 32, text: "text-xs"},
  md: {px: 40, text: "text-sm"},
  lg: {px: 56, text: "text-base"},
  xl: {px: 80, text: "text-lg"},
} as const;

type AvatarSize = keyof typeof SIZES;

export interface AvatarProps {
  src?: string;
  name: string;
  size?: AvatarSize;
  className?: string;
  alt?: string;
  ariaLabel?: string;
  onClick?: () => void;
  editable?: boolean;
  onEdit?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size      = "md",
  className = "",
  alt,
  ariaLabel,
  onClick,
  editable  = false,
  onEdit,
}) => {

  const initials = getInitials(name);
  const config = SIZES[size];

  return (
      <div
          style={{
        width:  config.px,
        height: config.px,
        flexShrink: 0,
      }}
      className={[
        "relative inline-block select-none",
        onClick
          ? "cursor-pointer hover:opacity-90 transition-opacity duration-150"
          : "",
        className,
      ].join(" ")}
      role={onClick ? "button" : undefined}
      aria-label={ariaLabel || name}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
    >
      <div
        className={[
          "w-full h-full",
          "flex items-center justify-center rounded-full overflow-hidden",
          "ring-2 ring-white dark:ring-slate-800",
          "shadow-md",
        ].join(" ")}
      >
        {src ? (
          <Image
            src={src}
            alt={alt || name}
            width={config.px}
            height={config.px}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className={[
              "w-full h-full",
              "flex items-center justify-center",
              "bg-gradient-to-br from-brand-500 to-brand-700",
              "text-white font-display font-bold tracking-wide",
              config.text,
            ].join(" ")}
            aria-hidden="true"
          >
            {initials}
          </div>
        )}
      </div>

        {editable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.();
          }}
          aria-label="Edit profile photo"
          className={[
            "absolute -bottom-0.5 -right-0.5",
            "w-6 h-6 rounded-full",
            "bg-brand-600 hover:bg-brand-700",
            "text-white flex items-center justify-center",
            "shadow-sm transition-colors duration-150 border border-white dark:border-slate-800",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-brand-600 focus-visible:ring-offset-1",
          ].join(" ")}
        >
          <Pencil className="w-3 h-3" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default Avatar;
