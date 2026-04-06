'use client'
import React, {useEffect, useRef, useId} from 'react';
import  { X } from "lucide-react";
import {createPortal} from "react-dom";

// Type aliases
export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalProps {
    isOpen:boolean;
    onClose:()=>void;
    size?:ModalSize;
    title?:string;
    description?:string;
    children?:React.ReactNode;
    footer?:React.ReactNode;
    preventClose?:boolean;
    className?:string;
}

// Size lookup
const panelWidths: Record<ModalSize, string> = {
    sm:   "max-w-sm",
    md:   "max-w-md",
    lg:   "max-w-lg",
    xl:   "max-w-xl",
    full: "max-w-full mx-4",
};


const Modal:React.FC<ModalProps> = (
    {
        isOpen,
        onClose,
        title,
        description,
        className = '',
        children,
        size = "md",
        footer,
        preventClose = false,
    }
) => {

    // Get title and description IDs
    const titleId = useId();
    const descriptionId = useId();
    const panelRef = useRef<HTMLDivElement>(null)
    const previousFocus = useRef<HTMLElement | null>(null)

    useEffect(()=>{
        if(!isOpen) return;
        //Save currently focused element
        previousFocus.current = document.activeElement as HTMLElement;
        //Help focus on elemnts
        const getFocusableElememts = ():HTMLElement[] =>{
            return Array.from (
                panelRef.current?.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
                ) ?? []
            );
        };

    //     Handle keydown
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                if(!preventClose){
                    onClose();
                }
                return;
            }
            // Tab keu focus trap
            if (event.key === "Tab"){
                const focusable = getFocusableElememts()

            //     No elemeant in modal -> tab focus eill not funtion
                if (focusable.length === 0){
                    event.preventDefault();
                    return;
                }
                const firstElement = focusable[0];
                const lastElement = focusable[focusable.length - 1];

                if (event.shiftKey){
                    if (document.activeElement === firstElement){
                        event.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement){
                        event.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };

        document.addEventListener("keydown",handleKeyDown)

        const timer = setTimeout(()=>{
            const focusable = getFocusableElememts();
            if(focusable.length > 0){
                focusable[0].focus();
            }else{
                panelRef.current?.focus();
            }
        },0);

    //     Clean up function
        return () => {
            document.removeEventListener("keydown",handleKeyDown);
            clearTimeout(timer);
            if(previousFocus.current){
                previousFocus.current.focus();
            }
        };
    },[isOpen,preventClose,onClose])

    // Useefect -> scroll lock
    useEffect(() => {
        if (isOpen){
            document.body.style.overflow = "hidden";
        }else{
            document.body.style.overflow = "";
        }

    //     CleanUP
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);


    if (!isOpen) return null;

    return createPortal(
        // Backdrop
        <div
            className="fixed inset-0 z-[1000] w-full h-full flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80"
            style={{ zIndex: 1000 }}
            onClick={!preventClose ? onClose : undefined}
            aria-hidden={!isOpen}
        >
        {/*    Panel*/}
            <div
                ref={panelRef}
                tabIndex={-1}
                role={"dialog"}
                aria-modal={true}
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                onClick={(e) => e.stopPropagation()}
                className={`relative py-4 w-full flex flex-col max-h-[100vh] ${panelWidths[size]} bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-black/20 border border-slate-200 dark:border-slate-800 ${className}`}
            >
            {/*Haeder---------------------------------*/}
                <header
                className={`flex items-start justify-between gap-4 px-6 py-2 
                border-slate-100 dark:border-slate-800 flex-shrink-0`}
                >
                    <div className={"min-w-0"}>
                        <h2
                            id={titleId}
                            className={`font-display font-bold text-lg
                            text-slate-900 dark:text-white leading-tight`}
                        >
                            {title}
                        </h2>

                    {/*    Option description condionally rendered*/}
                        {description &&(
                            <p
                                id={descriptionId}
                                className={`mt-1 text-sm font-body text-slate-500
                                dark:text-slate-400 leading-relaxed`}
                            >
                                {description}
                            </p>
                        )}
                    </div>

                {/*    Close button - This is hidden when preventClose = true*/}
                    {!preventClose && (
                        <button
                            type={"button"}
                            onClick={onClose}
                            aria-label={"Close modal"}
                            className="absolute top-4 right-4 shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                        >
                            <X className="w-5 h-5"  aria-hidden="true"/>
                        </button>
                    )}
                </header>

            {/*    Body---------------------------------*/}
                <div className={"min-h-0 flex-1 px-6 py-5 overflow-y-auto"}>
                    {children}
                </div>

            {/*    Footer---------------------------------*/}
                {footer && (
                    <footer
                        className={`flex items-center justify-end gap-3
                         px-6 py-2  shrink-0`}
                    >
                        {footer}
                    </footer>
                )}

            </div>
        </div>,document.body
    );
};

export default Modal;
