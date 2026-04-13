"use client"
import React from 'react';

interface FormFieldProps {
    label:string;
    htmlFor:string;
    helperText?:string;
    isError?:boolean;
    labelAction?:React.ReactNode;
    children:React.ReactNode;
    className?:string;
}

const FormField:React.FC<FormFieldProps> = ({
    label,
    htmlFor,
    helperText,
    isError = false,
    labelAction,
    children,
    className,
}) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
        {/*    Label row*/}
            <div className="flex items-center justify-between">
            <label
                htmlFor={htmlFor}
                className={`text-sm font-body font-medium ${isError ? "text-red-500" : "text-slate-700 dark:text-slate-300"}`}
            >
                {label}
            </label>
            {labelAction && <div className="text-xs font-display text-slate-500 shrink-0">{labelAction}</div>}
            </div>
        {/*    Form Input*/}
            {children}
        {/*    Helper text + error message*/}
            {helperText && (
              <p
                className={`text-xs  font-body 
                    ${isError ?
                        "text-red-500" 
                            :"text-slate-400 dark:text-slate-500"}
                `}
                role={isError ? "alert" : undefined}
              >
                  {helperText}
              </p>
            )}
        </div>
    );
};

export default FormField;
