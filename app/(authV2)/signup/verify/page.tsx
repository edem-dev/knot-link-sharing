'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import VerifyEmailPage from '@/components/sectional/AuthSections/VerifyEmailPage'

function VerifyContainer() {
    const [loading, setLoading]               = useState(false)
    const [resendLoading, setResendLoading]   = useState(false)
    const [errorMessage, setErrorMessage]     = useState<string | undefined>()
    const [successMessage, setSuccessMessage] = useState<string | undefined>()

    const router       = useRouter()
    const searchParams = useSearchParams()
    const email        = searchParams.get('email') ?? ''

    async function handleSubmit({ token }: { token: string }) {
        setLoading(true)
        setErrorMessage(undefined)

        const supabase = createClient()
        const { error } = await supabase.auth.verifyOtp({ email, token, type: 'email' })

        if (error) {
            setErrorMessage(error.message)
            setLoading(false)
            return
        }

        router.push('/onboarding')
    }

    async function handleResend() {
        setResendLoading(true)
        setErrorMessage(undefined)
        setSuccessMessage(undefined)

        const supabase = createClient()
        const { error } = await supabase.auth.resend({ type: 'signup', email })

        if (error) {
            setErrorMessage(error.message)
        } else {
            setSuccessMessage('A new code has been sent to your email.')
        }

        setResendLoading(false)
    }

    return (
        <VerifyEmailPage
            email={email}
            onSubmit={handleSubmit}
            onResend={handleResend}
            loading={loading}
            resendLoading={resendLoading}
            errorMessage={errorMessage}
            successMessage={successMessage}
        />
    )
}

export default function VerifyPage() {
    return (
        <Suspense fallback={<div className={"text-brand-600 "}>Loading...</div>}>
            <VerifyContainer />
        </Suspense>
    )
}