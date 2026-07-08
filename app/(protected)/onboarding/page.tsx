'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import  UsernameOnboardingPage  from '@/components/sectional/onboardingSectionals/UsernameOnboardingPage'


export default function UsernamePage() {
    const router = useRouter()
    const [error, setError]     = useState('')
    const [loading, setLoading] = useState(false)

    const handleClaim = async (username: string) => {
        setLoading(true)
        setError('')

        const res = await fetch('/api/onboarding', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        });

        const data = await res.json();

        if (res.ok){
            router.push(`/dashboard`)
            router.refresh()
            return;
        }

        if (res.status === 409) {
            setError('That username already taken - please try another.')
        }else {
            setError(data.error ?? 'Something went wrong - please try again later.')
        }

        setLoading(false);

    }

    return (
        <div>
            {error && (
                <div
                    role="alert"
                    className={[
                        'fixed top-4 left-1/2 -translate-x-1/2 z-50',
                        'bg-red-50 border border-red-200 text-red-700',
                        'text-sm font-body px-4 py-3 rounded-2xl shadow-md',
                    ].join(' ')}
                >
                    {error}
                </div>
            )}

            <UsernameOnboardingPage onClaim={handleClaim} />
        </div>
    )
}