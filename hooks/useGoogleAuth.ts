'use client';

import { useSignIn } from "@clerk/nextjs";

//==============================================================//
// 🚀 Google OAuth Hook (Unified Flow)
//==============================================================//
export function useGoogleAuth() {

    const { signIn, isLoaded } = useSignIn() as any;

    const signInWithGoogle = async () => {
        if (!isLoaded || !signIn) return;

        try {
            await signIn.authenticateWithRedirect({
                strategy: 'oauth_google',

                //--------------------------------------------------//
                // OAuth returns here first
                //--------------------------------------------------//
                redirectUrl: '/sso-callback',

                //--------------------------------------------------//
                // Final destination after session is created
                //--------------------------------------------------//
                redirectUrlComplete: '/dashboard',
            });

        } catch (err) {
            console.error('Google OAuth error:', err);
        }
    };

    return { signInWithGoogle };
}