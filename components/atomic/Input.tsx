'use client';
import React, {useState} from 'react';
import {Eye , EyeOff} from "lucide-react";

export type InputState = "default" | "success" |"error";

export interface InputProps
    extends  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    leadingIcon?:React.ReactNode;
    trailingIcon?:React.ReactNode;
    prefix?:string;
    inputState?:InputState;
}

const Input:React.FC<InputProps> = (
    {
        leadingIcon,
        trailingIcon,
        prefix,
        inputState = "default",
        className,
        type,
        disabled,
        ...theRest
    }
) => {

    const [showPassword, setShowPassword] = useState(false)
    const isPasswordField = type === "password";

    // Custom Styling
    const stateClasses : Record<InputState, string> = {
        default:`border-slate-200 dark:border-slate-700
         focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-200
          dark:focus-within:ring-brand-90`,
        success: `border-emerald-400 focus-within:border-emerald-500 
        focus-within:ring-2 focus-within:ring-emerald-200 dark:focus-within:ring-emerald-900/40`,
        error:`border-red-400 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-200 dark:focus-within:ring-red-900/40`

    }

    const resolvedType = isPasswordField && showPassword ? "text" : type;

    return (
        <div
        className={`flex items-center gap-2 px-3 py-2.5 bg-white dark:bg-slate-900 
         transition-all  duration-150 border border-slate-200 rounded-lg ${className} ${stateClasses[inputState]}`}
        >
            {/*LOeading icon*/}
            {leadingIcon && (
                <span
                className="text-slate-400 shrink-0 [&>svg]:w-4 [&>svg]:h-4"
                aria-hidden="true"
                >
                {leadingIcon}
                </span>
            )}

        {/*    Prefix*/}
            {prefix && (
                <span className="text-slate-400 text-sm font-body select-none whitespace-nowrap">
                {prefix}
                </span>
            )}

        {/*    Native Input*/}
            <input
                type={resolvedType}
                disabled={disabled}
                className={[
                    "flex-1 min-w-0",
                    "bg-transparent outline-none",
                    "text-sm font-body",
                    "text-slate-900 dark:text-white",
                    "placeholder:text-slate-400",
                    // When disabled, reduce opacity so it looks inactive
                    "disabled:opacity-50",
                ].join(" ")}
                {...theRest}
            />

        {/*    Password toggle*/}
            {isPasswordField
              ? (
                  <button
                      type="button"
                      onClick={() =>setShowPassword((prev) => !prev)}
                      disabled={disabled}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className={[
                          "shrink-0",
                          "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300",
                          "transition-colors duration-150",
                          // Focus ring for keyboard accessibility
                          "focus-visible:outline-none focus-visible:ring-2",
                          "focus-visible:ring-brand-600 rounded",
                          "disabled:opacity-50 disabled:cursor-not-allowed",
                      ].join(" ")}
                  >
                      {showPassword
                          ? <EyeOff className="w-4 h-4" />
                          : <Eye className="w-4 h-4" />

                      }
                  </button>
                ):(
                    trailingIcon && (
                        <span
                            className="text-slate-400 shrink-0 [&>svg]:w-4 [&>svg]:h-4"
                            aria-hidden="true"
                        >
              {trailingIcon}
            </span>
                    )
                )
            }
        </div>
    );
};

export default Input;
