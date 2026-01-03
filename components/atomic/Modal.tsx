import React from 'react';
import IconButton from "@/components/atomic/IconButton";
import { X } from 'lucide-react';

interface ModalProps{
    open:boolean;
    onClose:()=> void;
    children:React.ReactNode;
    closeIcon?:React.ReactNode;
}

const Modal:React.FC<ModalProps> = (
    {
        open,
        onClose,
        children,
        closeIcon
    }
) => {
    return (
        // backdrop
        <div
            onClick={onClose}
            className={` fixed inset-0 z-50 flex justify-center items-center transition-colors
            ${open?"visible bg-black/10":"invisible"}
            `}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`max-w-[400px] w-full transition-all duration-300
                ${open?"scale-100 opacity-100":"scale-125 opacity-0"}
                `}
            >
                {
                    closeIcon &&  <div className={"absolute top-3 right-2"}>{closeIcon}</div>
                }
                {children}
            </div>
        </div>
    );
};

export default Modal;
