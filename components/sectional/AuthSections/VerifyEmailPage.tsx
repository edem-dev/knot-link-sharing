'use client';

import React, { useRef, useState } from 'react';

// -- Sectional imports
import AuthNavBar from "@/components/sectional/AuthSections/AuthNavBar";
import AuthFooter from "@/components/sectional/AuthSections/AuthFooter";

// -- Atomic imports
import Button from "@/components/atomic/Button";
import StatusIndicator from "@/components/atomic/StatusIndicator";
import KnottedLogo from "@/components/atomic/KnottedLogo";

// -- Lucide icons
import { Mail } from "lucide-react";

// Interface
export interface VerifyEmailPageProps {
    onSubmit?:  (data: { token: string }) => void;
    onResend?:  () => void;
    email?:     string;
    loading?:   boolean;
    resendLoading?: boolean;
    errorMessage?:  string;
    successMessage?: string;
    className?: string;
}

const VerifyEmailPage: React.FC<VerifyEmailPageProps> = ({
                                                             onSubmit,
                                                             onResend,
                                                             email = '',
                                                             loading = false,
                                                             resendLoading = false,
                                                             errorMessage,
                                                             successMessage,
                                                             className,
                                                         }) => {

    //-- OTP digit state (6 individual slots) ----------------------->
    const [digits, setDigits]       = useState<string[]>(Array(6).fill(''));
    const [tokenError, setTokenError] = useState('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    //-- Digit change handler --------------------------------------->
    // Accepts only numeric input and auto-advances focus to the next slot
    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return; // digits only

        const newDigits = [...digits];
        newDigits[index] = value.slice(-1); // keep only the last typed char
        setDigits(newDigits);
        if (tokenError) setTokenError('');

        // Auto-advance to next slot on digit entry
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    //-- Keyboard handler ------------------------------------------>
    // Backspace on an empty slot moves focus back to the previous slot
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !digits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    //-- Paste handler --------------------------------------------->
    // Lets the user paste the full 6-digit code at once
    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 8);
        if (!pasted) return;

        const newDigits = [...digits];
        pasted.split('').forEach((char, i) => { if (i < 6) newDigits[i] = char; });
        setDigits(newDigits);

        // Focus the first empty slot, or the last slot if all filled
        const nextEmpty = newDigits.findIndex(d => !d);
        inputRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();
    };

    //-- Form submit handler --------------------------------------->
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const token = digits.join('');

        if (token.length < 6) {
            setTokenError('Please enter the complete 6-digit code.');
            return;
        }

        onSubmit?.({ token });
    };

    //-- Digit slot visual state helper --------------------------->
    // Mirrors the inputState pattern used in SignUpPage
    const slotBorderClass = (index: number) => {
        if (tokenError)       return 'border-red-400 dark:border-red-500';
        if (digits[index])    return 'border-brand-500 dark:border-brand-400';
        return 'border-slate-200 dark:border-slate-700';
    };

    return (
        <div
            className={[
                'min-h-screen flex flex-col',
                'bg-linear-to-br from-slate-50 via-brand-50/30 to-slate-100',
                'dark:from-slate-950 dark:via-brand-950/20 dark:to-slate-900',
                className,
            ].join(' ')}
        >
            {/*AuthNavBar--------------------------------------*/}
            <AuthNavBar mode={"sign-up"} />

            {/*Main Content------------------------------------*/}
            <main className="flex-1 flex items-center justify-center px-4 py-12">
                {/*Form Card-----------------------------------*/}
                <div
                    className={[
                        'w-full max-w-md',
                        'bg-white dark:bg-slate-900',
                        'rounded-3xl',
                        'shadow-xl shadow-slate-200/60 dark:shadow-black/40',
                        'border border-slate-100 dark:border-slate-800',
                        'px-8 py-10',
                    ].join(' ')}
                    aria-labelledby="verify-heading"
                >
                    {/*Heading section -------------------------*/}
                    <div className="flex flex-col items-center gap-2 justify-center mb-8">
                        <div className="flex items-center mb-2">
                            <KnottedLogo size="md" />
                        </div>

                        {/*Mail icon badge------------------*/}
                        <div className="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center mb-1">
                            <Mail className="w-7 h-7 text-brand-600 dark:text-brand-400" />
                        </div>

                        <h1
                            id="verify-heading"
                            className={[
                                'font-display text-center',
                                'font-extrabold md:text-3xl text-2xl',
                                'text-slate-900 dark:text-white',
                                'mb-1',
                            ].join(' ')}
                        >
                            Check your email
                        </h1>

                        <p className="font-body text-sm text-slate-400 dark:text-slate-500 text-center">
                            We sent a 6-digit code to
                        </p>
                        {email && (
                            <span className="font-body text-sm font-medium text-slate-600 dark:text-slate-300">
                                {email}
                            </span>
                        )}
                    </div>
                    {/*Heading section -------------------------*/}

                    {/*Form ------------------------------------*/}
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-6"
                        aria-label="Email verification"
                    >
                        {/*OTP digit slots ----------------------*/}
                        <div className="flex flex-col items-center gap-2">
                            <div
                                className="flex gap-2 justify-center"
                                onPaste={handlePaste}
                            >
                                {digits.map((digit, i) => (
                                    <input
                                        key={i}
                                        ref={el => { inputRefs.current[i] = el; }}
                                        type="text"
                                        inputMode="numeric"
                                        pattern="\d*"
                                        maxLength={1}
                                        value={digit}
                                        onChange={e => handleChange(i, e.target.value)}
                                        onKeyDown={e => handleKeyDown(i, e)}
                                        aria-label={`Digit ${i + 1} of 6`}
                                        className={[
                                            'w-8 h-10 text-center text-xl font-mono font-semibold',
                                            'rounded-xl border-2 transition-colors duration-150',
                                            'bg-slate-50 dark:bg-slate-800',
                                            'text-slate-900 dark:text-white',
                                            'focus:outline-none',
                                            'focus:border-brand-600 dark:focus:border-brand-400',
                                            slotBorderClass(i),
                                        ].join(' ')}
                                    />
                                ))}
                            </div>

                            {/*Per-field token error----------*/}
                            {tokenError && (
                                <p className="font-body text-xs text-red-500 text-center">
                                    {tokenError}
                                </p>
                            )}
                        </div>

                        {/*Error / success indicators-----------*/}
                        {errorMessage && (
                            <StatusIndicator variant="error" message={errorMessage} />
                        )}
                        {successMessage && (
                            <StatusIndicator variant="success" message={successMessage} />
                        )}

                        {/*Verify button------------------------*/}
                        <Button
                            type="submit"
                            size="xl"
                            fullWidth
                            loading={loading}
                        >
                            Verify Email
                        </Button>
                    </form>

                    {/*Resend code option ----------------------*/}
                    <p className="text-center text-sm font-body text-slate-500 dark:text-slate-400 mt-6">
                        Didn't receive a code?{' '}
                        <button
                            type="button"
                            onClick={onResend}
                            disabled={resendLoading}
                            className={[
                                'font-medium',
                                'text-brand-600 hover:text-brand-700',
                                'dark:text-brand-400 dark:hover:text-brand-300',
                                'transition-colors duration-150',
                                'focus-visible:outline-none focus-visible:ring-1',
                                'focus-visible:ring-brand-600 rounded',
                                'disabled:opacity-50 disabled:cursor-not-allowed',
                            ].join(' ')}
                        >
                            {resendLoading ? 'Sending...' : 'Resend code'}
                        </button>
                    </p>
                </div>
                {/*Form Card-----------------------------------*/}
            </main>

            {/*AuthFooter--------------------------------------*/}
            <AuthFooter />
        </div>
    );
};

export default VerifyEmailPage;