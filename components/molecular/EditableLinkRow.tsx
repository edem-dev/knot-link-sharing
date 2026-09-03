'use client';

import React from 'react';
import { GripVertical, Trash2, Eye, EyeOff } from 'lucide-react';
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

import type { LinkRowData } from '@/types';

export interface EditableLinkRowProps {
    /**
     * The link data this row represents.
     * This component is controlled — the parent owns the state.
     */
    link: LinkRowData;

    /**
     * Called when the title or URL changes.
     */
    onChange: (
        id: string,
        field: 'title' | 'url',
        value: string
    ) => void;

    /**
     * Called when the visibility/eye toggle is clicked.
     */
    onToggleActive: (id: string) => void;

    /**
     * Called when the delete button is clicked.
     */
    onDelete: (id: string) => void;

    /**
     * Extra Tailwind classes for the outer wrapper.
     */
    className?: string;
}

export const EditableLinkRow: React.FC<EditableLinkRowProps> = (
    {
        link,
        onChange,
        onDelete,
        onToggleActive,
        className = '',
    }) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({id: link.id});

    const style: React.CSSProperties = {
        transform:CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging? 10: undefined,
        opacity: isDragging ? 0.5 : undefined,
    }

    return(
    <div
        ref={setNodeRef}
        style={style}
        className={[
            // Layout
            'flex items-center gap-3',

            // Spacing
            'px-4 py-3',

            // Background
            'bg-white dark:bg-slate-900',

            // Border
            'border border-slate-200 dark:border-slate-700',
            'hover:border-slate-300 dark:hover:border-slate-600',

            // Shape
            'rounded-2xl',

            // Group
            'group',

            // Visibility / opacity
            link.isActive ? 'opacity-100' : 'opacity-40',

            // Smooth opacity transition
            'transition-opacity duration-200',

            className,
        ]
            .filter(Boolean)
            .join(' ')}
    >
        {/* Drag Handle */}
        <button
            type="button"
            aria-label="Drag to reorder"
            {...attributes}
            {...listeners}
            className={[
                'shrink-0',
                'cursor-grab active:cursor-grabbing',
                'text-slate-300 dark:text-slate-600',
                'group-hover:text-slate-400 dark:group-hover:text-slate-500',
                'hover:text-slate-500 dark:hover:text-slate-400',
                'transition-colors duration-150',
                'focus-visible:outline-none',
                'focus-visible:ring-2',
                'focus-visible:ring-brand-600',
                'rounded',
                'p-0.5',
            ].join(' ')}
        >
            <GripVertical
                className="w-4 h-4"
                aria-hidden="true"
            />
        </button>

        {/* Title */}
        <input
            type="text"
            value={link.title}
            onChange={(e) =>
                onChange(link.id, 'title', e.target.value)
            }
            placeholder="Title"
            aria-label="Link title"
            className={[
                'flex-1 min-w-0',
                'bg-transparent outline-none',
                'text-sm font-display font-medium',
                'text-slate-800 dark:text-white',
                'placeholder:text-slate-300 dark:placeholder:text-slate-600',
            ].join(' ')}
        />

        {/* Divider */}
        <div
            className="w-px h-4 bg-slate-200 dark:bg-slate-700 shrink-0"
            aria-hidden="true"
        />

        {/* URL */}
        <input
            type="url"
            value={link.url}
            onChange={(e) =>
                onChange(link.id, 'url', e.target.value)
            }
            placeholder="https://..."
            aria-label="Link URL"
            className={[
                'flex-1 min-w-0',
                'bg-transparent outline-none',
                'text-sm font-body',
                'text-brand-600 dark:text-brand-400',
                'placeholder:text-slate-300 dark:placeholder:text-slate-600',
            ].join(' ')}
        />

        {/* Visibility Toggle */}
        <button
            type="button"
            onClick={() => onToggleActive(link.id)}
            aria-label={
                link.isActive
                    ? `Hide link: ${link.title || 'untitled'}`
                    : `Show link: ${link.title || 'untitled'}`
            }
            aria-pressed={link.isActive}
            className={[
                'shrink-0',
                link.isActive
                    ? 'text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300'
                    : 'text-slate-300 dark:text-slate-600 hover:text-slate-400 dark:hover:text-slate-500',
                'transition-colors duration-150',
                'focus-visible:outline-none',
                'focus-visible:ring-2',
                'focus-visible:ring-brand-600',
                'rounded',
                'p-0.5',
            ].join(' ')}
        >
            {link.isActive ? (
                <Eye
                    className="w-4 h-4"
                    aria-hidden="true"
                />
            ) : (
                <EyeOff
                    className="w-4 h-4"
                    aria-hidden="true"
                />
            )}
        </button>

        {/* Delete */}
        <button
            type="button"
            onClick={() => onDelete(link.id)}
            aria-label={`Delete link: ${link.title || 'untitled'}`}
            className={[
                'shrink-0',
                'text-slate-300 dark:text-slate-600',
                'hover:text-red-500 dark:hover:text-red-400',
                'transition-colors duration-150',
                'focus-visible:outline-none',
                'focus-visible:ring-2',
                'focus-visible:ring-red-400',
                'rounded',
                'p-0.5',
            ].join(' ')}
        >
            <Trash2
                className="w-4 h-4"
                aria-hidden="true"
            />
        </button>
    </div>
    );
};

export default EditableLinkRow;