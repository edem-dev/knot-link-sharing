// app/(auth)/layout.tsx
import AuthFooter from "@/components/sectional/AuthSections/AuthFooter";
import AuthNavBar from "@/components/sectional/AuthSections/AuthNavBar";
// ↑ Adjust import path to match your project structure

export default function AuthLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-brand-50/30 to-slate-100 dark:from-slate-950 dark:via-brand-950/20 dark:to-slate-900">

            {/* AuthNavbar — mode is set per-page via the page component, not here.
          We render a neutral version at layout level; each page overrides if needed.
          If AuthNavbar requires a mode prop, move it into each page's wrapper instead. */}
            <AuthNavBar mode="sign-in" />

            {/* Centered content — Clerk component slots in here */}
            <main className="flex-1 flex items-center justify-center px-4 py-12">
                {children}
            </main>

            {/* Minimal footer — matches existing SignInPage */}
           <AuthFooter/>
        </div>
    )
}