'use client';

import React, { useState } from 'react';
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import SignUpPage from "@/components/sectional/AuthSections/SignUpPage";
import  {useGoogleAuth}  from "@/hooks/useGoogleAuth"; // ✅ FIX: import the hook, not a function

//==============================================================//
// 🔍 Helper: Extract human-friendly Clerk error messages
//==============================================================//
const getClerkErrorMessage = (err: unknown): string => {
    if (
        err &&
        typeof err === 'object' &&
        'errors' in err &&
        Array.isArray((err as { errors: unknown[] }).errors)
    ) {
        const clerkErr = err as { errors: { code: string; message: string }[] };
        const code = clerkErr.errors[0].code ?? '';

        const errorMessageMap: Record<string, string> = {
            form_password_pwned:
                'This password has appeared in a data breach. Please choose a different one.',
            form_password_length_too_short:
                'Password must be at least 8 characters.',
            form_identifier_exists:
                'An account with this email already exists. Try signing in instead.',
            form_param_format_invalid:
                'Please enter a valid email address.',
            form_param_nil:
                'Please fill in all required fields.',
        };

        return (
            errorMessageMap[code] ??
            clerkErr.errors[0]?.message ??
            'Something went wrong. Please try again.'
        );
    }

    return 'Something went wrong. Please try again.';
};

//==============================================================//
// 🚀 Sign Up Route Component
//==============================================================//
export default function SignUpRoute() {

    //==========================================================//
    // ⚠️ Clerk v7 returns a SIGNAL (proxy object)
    // BUT: Turbopack + current typings can break `.value`
    //
    // ✅ SOLUTION: Cast to "any" to safely access runtime fields
    //==========================================================//
    const signUp = useSignUp() as any;

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    //==========================================================//
    // ✅ Google Auth Hook (correct usage)
    //==========================================================//
    // Your hook returns the function — so we call the hook first
    const { signInWithGoogle } = useGoogleAuth();

    //==========================================================//
    // 🧠 Handler: Email/Password Sign Up Flow
    //==========================================================//
    const handleSignUp = async ({
                                    name,
                                    email,
                                    password,
                                }: {
        name: string;
        email: string;
        password: string;
    }) => {

        //------------------------------------------------------//
        // Guard: Wait until Clerk is fully loaded
        //------------------------------------------------------//
        if (!signUp?.isLoaded) return;

        setLoading(true);
        setError('');

        try {
            //--------------------------------------------------//
            // Step 1: Split full name into first + last name
            //--------------------------------------------------//
            const nameParts = name.trim().split(/\s+/);
            const firstName = nameParts[0] ?? '';
            const lastName = nameParts.slice(1).join(' ') || '';

            //--------------------------------------------------//
            // Step 2: Create Clerk user
            //--------------------------------------------------//
            await signUp.create({
                firstName,
                lastName,
                emailAddress: email,
                password,
            });

            //--------------------------------------------------//
            // Step 3: Send email verification (magic link)
            //--------------------------------------------------//
            await signUp.prepareEmailAddressVerification({
                strategy: 'email_link',

                // Redirect after user clicks email link
                redirectUrl: `${window.location.origin}/sign-up/username`,
            });

            //--------------------------------------------------//
            // Step 4: Redirect to waiting screen
            //--------------------------------------------------//
            router.push('/sign-up/verify-email');

        } catch (err) {
            setError(getClerkErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    //==========================================================//
    // 🧱 Render Guard
    //==========================================================//
    // Prevent rendering before Clerk is ready
    if (!signUp) return null;

    return (
        <SignUpPage
            onSubmit={handleSignUp}

            //--------------------------------------------------//
            // ⚠️ IMPORTANT:
            // Pass function reference, NOT execution
            //--------------------------------------------------//
            onGoogleSignUp={signInWithGoogle}

            loading={loading}
            errorMessage={error || undefined}
        />
    );
}