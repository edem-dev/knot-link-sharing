'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import SignInPage from '@/components/sectional/AuthSections/SignInPage' // adjust path to match your project

export default function SignInRoute() {
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const router = useRouter()

    async function handleSubmit(data: { email: string; password: string }) {
        setLoading(true)
        setErrorMessage(undefined)

        const supabase = createClient()

        const { error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        })

        if (error) {
            setErrorMessage(error.message)
            setLoading(false)
            return
        }


        router.push('/dashboard')
        router.refresh();
    }

    async function handleGoogleSignIn() {
        const supabase = createClient()
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: `${window.location.origin}/auth/callback` },
        })
    }

    return (
        <SignInPage
            onSubmit={handleSubmit}
            onGoogleSignIn={handleGoogleSignIn}
            loading={loading}
            errorMessage={errorMessage}
        />
    )
}