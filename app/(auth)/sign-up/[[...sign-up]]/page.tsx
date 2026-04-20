// app/(auth)/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from '@clerk/nextjs'
import { clerkAppearance } from '@/lib/clerk-appearance'

export default function SignUpPage() {
    return (
        <SignUp
            forceRedirectUrl="/username"       // ← was afterSignUpUrl
            signInUrl="/sign-in"
            appearance={clerkAppearance}
        />
    )
}