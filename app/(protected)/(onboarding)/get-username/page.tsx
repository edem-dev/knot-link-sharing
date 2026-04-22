// app/(protected)/username/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import  UsernameOnboardingPage  from '@/components/sectional/onboardingSectionals/UsernameOnboardingPage'
// ↑ Adjust import path to match your project structure

export default function UsernamePage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError]     = useState('')

    const handleClaim = async (username: string) => {
        setLoading(true)
        setError('')

        try {
            const res = await fetch('/api/user', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({ username }),
            })

            const data = await res.json()

            if (!res.ok) {
                // Surface server-side errors — e.g. "Username already taken"
                setError(data.error ?? 'Something went wrong. Please try again.')
                return
            }

            // MongoDB document created — user is fully onboarded.
            // Redirect to Step 2: Profile setup
            router.push('/onboarding/profile')

        } catch (err) {
            setError('Network error. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <UsernameOnboardingPage
            onClaim={handleClaim}
        />
    )
}