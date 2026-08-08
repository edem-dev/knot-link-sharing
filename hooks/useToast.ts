'use client';

import React, {useCallback, useState} from 'react';
import type {ToastVariant} from "@/components/atomic/Toast";

interface ToastState{
    id:number;
    message:string;
    variant:ToastVariant
}

export function useToast(){
    const [toast, setToast] = useState<ToastState | null>(null)

    const show = useCallback((message:string, variant:ToastVariant) => {
        setToast({id: Date.now(), message, variant})
    }, [])

    const dismiss = useCallback(() => {
        setToast(null)
    }, [])

    return {toast, show, dismiss}
};


