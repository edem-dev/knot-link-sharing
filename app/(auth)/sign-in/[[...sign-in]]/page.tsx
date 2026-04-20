// app/(auth)/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from '@clerk/nextjs'
import { clerkAppearance } from '@/lib/clerk-appearance'

export default function SignInPage() {
    return (
        <SignIn
            fallbackRedirectUrl="/dashboard"   // ← was afterSignInUrl
            signUpUrl="/sign-up"
            appearance={clerkAppearance}
        />
    )
}