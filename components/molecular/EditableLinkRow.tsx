'use client';

import React from 'react';
import { GripVertical, Trash2 } from 'lucide-react';

export interface LinkRowData {
    /** Unique identifier for this link — used as the React `key` prop */
    id: string;
    /** Display title shown on the public profile page */
    title: string;
    /** Destination URL */
    url: string;
}

export interface EditableLinkRowProps {
    /**
     * The link data this row represents.
     * This component is CONTROLLED — it has no internal state.
     * The parent owns the values and passes them down as props.
     * REQUIRED.
     */
    link: LinkRowData;

    /**
     * Called every time the user changes the title OR URL input.
     *
     * NEW TYPESCRIPT: A callback that receives TWO typed arguments.
     *
     * (id: string, field: "title" | "url", value: string) => void
     *  ↑            ↑                       ↑
     *  which link   which field changed      the new value typed
     *
     * The `field` parameter is a UNION TYPE — only "title" or "url" are valid.
     * TypeScript errors if anything else is passed. This is safer than
     * `field: string` which would accept any string accidentally.
     *
     * The parent uses this to update its links array with the new value.
     * REQUIRED.
     */
    onChange: (id: string, field: 'title' | 'url', value: string) => void;

    /**
     * Called when the trash icon is clicked.
     *
     * (id: string) => void
     *  ↑
     *  the id of the link to remove
     *
     * The parent filters it out of its links array.
     * REQUIRED.
     */
    onDelete: (id: string) => void;

    /**
     * Extra Tailwind classes on the outer wrapper.
     * Optional — defaults to "".
     */
    className?: string;
}

export const EditableLinkRow: React.FC<EditableLinkRowProps> = ({
                                                                    link,
                                                                    onChange,
                                                                    onDelete,
                                                                    className = "",
                                                                }) => (
    <div
        className={[
            // Layout — flex row, all children vertically centred, gaps between them
            "flex items-center gap-3",

            // Spacing — internal padding
            "px-4 py-3",

            // Background
            "bg-white dark:bg-slate-900",

            // Border — slightly visible at rest, more visible on hover
            "border border-slate-200 dark:border-slate-700",
            "hover:border-slate-300 dark:hover:border-slate-600",

            // Shape
            "rounded-2xl",

            // Smooth border colour transition
            "transition-colors duration-150",

            // group → lets children use group-hover:
            "group",

            className,
        ].join(" ")}
    >
    <button
            type="button"
            aria-label="Drag to reorder"
            className={[
                "flex-shrink-0",
                // flex-shrink-0 → icon never gets squished even in narrow layouts
                "cursor-grab active:cursor-grabbing",
                "text-slate-300 dark:text-slate-600",
                "group-hover:text-slate-400 dark:group-hover:text-slate-500",
                "hover:text-slate-500 dark:hover:text-slate-400",
                "transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-brand-600 rounded",
                "p-0.5",
                // p-0.5 → small padding increases the clickable area slightly
            ].join(" ")}
        >
            <GripVertical className="w-4 h-4" aria-hidden="true" />
        </button>
        <input
            type="text"
            value={link.title}
            onChange={(e) => onChange(link.id, 'title', e.target.value)}
            placeholder="Title"
            aria-label="Link title"
            className={[
                // flex-1 → expands to fill its share of the row
                // min-w-0 → allows shrinking below content size in flex layouts
                //           without this, a long title would overflow the row
                "flex-1 min-w-0",
                "bg-transparent outline-none",
                // bg-transparent → no background — inherits the white row background
                // outline-none   → removes the browser's default blue focus outline
                //                  (the ROW's border provides visual feedback instead)
                "text-sm font-display font-medium",
                "text-slate-800 dark:text-white",
                "placeholder:text-slate-300 dark:placeholder:text-slate-600",
            ].join(" ")}
        />
        <div
            className="w-px h-4 bg-slate-200 dark:bg-slate-700 flex-shrink-0"
            aria-hidden="true"
        />
        <input
            type="url"
            value={link.url}
            onChange={(e) => onChange(link.id, 'url', e.target.value)}
            placeholder="https://..."
            aria-label="Link URL"
            className={[
                "flex-1 min-w-0",
                "bg-transparent outline-none",
                "text-sm font-body",
                // Brand purple — URLs are visually distinct from titles
                "text-brand-600 dark:text-brand-400",
                "placeholder:text-slate-300 dark:placeholder:text-slate-600",
            ].join(" ")}
        />
        <button
            type="button"
            onClick={() => onDelete(link.id)}
            aria-label={`Delete link: ${link.title || 'untitled'}`}
            className={[
                "flex-shrink-0",
                "text-slate-300 dark:text-slate-600",
                "hover:text-red-500 dark:hover:text-red-400",
                "transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-red-400 rounded",
                "p-0.5",
            ].join(" ")}
        >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
        </button>

    </div>
);

export default EditableLinkRow;