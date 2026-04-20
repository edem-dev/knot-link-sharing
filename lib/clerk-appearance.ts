// lib/clerk-appearance.ts
import type { Appearance } from '@clerk/types'

// ─────────────────────────────────────────────────────────────────────────────
// Design tokens — lifted directly from knotted-components.tsx
// ─────────────────────────────────────────────────────────────────────────────
const tokens = {
    brand600:  '#7C3AED',   // primary action colour
    brand700:  '#6D28D9',   // hover
    brand200:  '#DDD6FE',   // focus ring
    brand100:  '#EDE9FE',   // secondary button background
    brand50:   '#F5F3FF',   // subtle tint

    slate900:  '#0f172a',   // primary text
    slate500:  '#64748b',   // muted text / labels
    slate400:  '#94a3b8',   // placeholder / icons
    slate200:  '#e2e8f0',   // borders
    slate100:  '#f1f5f9',   // card border
    white:     '#ffffff',

    red500:    '#ef4444',   // error
    emerald500:'#10b981',   // success
}

export const clerkAppearance: Appearance = {
    variables: {
        // ── Colours ──────────────────────────────────────────────────────────────
        colorPrimary:                 tokens.brand600,
        colorText:                    tokens.slate900,
        colorTextSecondary:           tokens.slate500,
        colorTextOnPrimaryBackground: tokens.white,
        colorBackground:              tokens.white,      // card background
        colorInputBackground:         tokens.white,
        colorInputText:               tokens.slate900,
        colorNeutral:                 tokens.slate400,
        colorDanger:                  tokens.red500,
        colorSuccess:                 tokens.emerald500,

        // ── Typography ───────────────────────────────────────────────────────────
        // fontFamilyButtons uses Plus Jakarta Sans (display) — matches Button component
        // fontFamily uses DM Sans (body) — matches all body text in the app
        fontFamily:        '"DM Sans", sans-serif',
        fontFamilyButtons: '"Plus Jakarta Sans", sans-serif',
        fontSize:          '14px',

        // ── Radius ───────────────────────────────────────────────────────────────
        // 1rem = rounded-2xl in Tailwind — used for inputs and buttons
        // Card uses rounded-3xl (1.5rem) — overridden in elements.card below
        borderRadius: '1rem',

        // ── Spacing ──────────────────────────────────────────────────────────────
        spacingUnit: '1rem',
    },

    elements: {
        // ── Root wrapper ─────────────────────────────────────────────────────────
        // Remove Clerk's default centering/padding — our layout handles that
        rootBox: 'w-full',

        // ── Card ─────────────────────────────────────────────────────────────────
        // rounded-3xl (1.5rem) matches the existing SignInPage card shape exactly
        card: [
            'w-full shadow-xl shadow-slate-200/60',
            'border border-slate-100',
            'rounded-3xl',          // larger radius than inputs — matches existing card
            'px-8 py-10',
        ].join(' '),

        // ── Header ───────────────────────────────────────────────────────────────
        headerTitle: 'font-display font-extrabold text-3xl text-slate-900',
        headerSubtitle: 'font-body text-slate-400 text-sm mt-1',

        // Hide Clerk's default logo — KnottedLogo lives in AuthNavbar
        logoBox: 'hidden',
        logoImage: 'hidden',

        // ── Social OAuth button (Google) ──────────────────────────────────────────
        // Matches the Button variant="outline" from knotted-components.tsx
        socialButtonsBlockButton: [
            'border border-slate-200 bg-white',
            'hover:bg-slate-50 active:bg-slate-100',
            'text-slate-800 font-display font-semibold text-sm',
            'rounded-2xl shadow-sm',
            'transition-all duration-200',
            'h-11',                 // consistent height with the app's lg button
        ].join(' '),
        socialButtonsBlockButtonText: 'font-display font-semibold text-sm text-slate-800',
        socialButtonsBlockButtonArrow: 'hidden',

        // ── Divider ("or" separator) ──────────────────────────────────────────────
        dividerLine: 'bg-slate-200',
        dividerText: 'text-xs font-body font-medium text-slate-400 tracking-widest uppercase',

        // ── Form field labels ─────────────────────────────────────────────────────
        // Matches the FormField label style from knotted-components.tsx
        formFieldLabel: [
            'text-xs font-display font-semibold',
            'uppercase tracking-widest',
            'text-slate-500',
        ].join(' '),

        // ── Inputs ───────────────────────────────────────────────────────────────
        // Matches the Input atom: rounded-2xl, white bg, brand focus ring
        formFieldInput: [
            'border border-slate-200 rounded-2xl',
            'bg-white text-slate-900 text-sm font-body',
            'placeholder:text-slate-400',
            'transition-all duration-150',
            'focus:border-brand-500 focus:ring-2 focus:ring-brand-200',
            'outline-none',
        ].join(' '),

        // Show/hide password eye button
        formFieldInputShowPasswordButton: [
            'text-slate-400 hover:text-slate-600',
            'transition-colors duration-150',
        ].join(' '),

        // ── Inline field actions (e.g. "Forgot password?") ────────────────────────
        formFieldAction: [
            'text-xs font-body font-medium',
            'text-brand-600 hover:text-brand-700',
            'transition-colors duration-150',
        ].join(' '),

        // ── Error messages ────────────────────────────────────────────────────────
        formFieldErrorText: 'text-xs font-body text-red-500 mt-0.5',
        formFieldSuccessText: 'text-xs font-body text-emerald-600 mt-0.5',

        // ── Alert banners (global form errors) ───────────────────────────────────
        alert: 'rounded-2xl',
        alertText: 'font-body text-sm',

        // ── Primary submit button ─────────────────────────────────────────────────
        // Matches Button variant="primary" size="xl" fullWidth from knotted-components.tsx
        formButtonPrimary: [
            'bg-brand-600 hover:bg-brand-700 active:bg-brand-900',
            'text-white font-display font-semibold text-base',
            'rounded-2xl',
            'shadow-md hover:shadow-lg shadow-brand-600/25',
            'transition-all duration-200',
            'h-12',                 // xl size height
        ].join(' '),

        // ── OTP / verification code inputs ────────────────────────────────────────
        // Used for email verification code step
        otpCodeFieldInput: [
            'border border-slate-200 rounded-xl',
            'text-center font-display font-bold text-slate-900',
            'focus:border-brand-500 focus:ring-2 focus:ring-brand-200',
        ].join(' '),

        // ── Footer links ──────────────────────────────────────────────────────────
        // "Don't have an account? Sign up" / "Already have an account? Sign in"
        footerActionText: 'font-body text-slate-500 text-sm',
        footerActionLink: [
            'font-body font-medium text-sm',
            'text-brand-600 hover:text-brand-700',
            'transition-colors duration-150',
        ].join(' '),

        // ── Internal nav links (back buttons etc.) ────────────────────────────────
        backLink: [
            'text-xs font-body font-medium',
            'text-slate-500 hover:text-slate-700',
            'transition-colors duration-150',
        ].join(' '),

        // ── Identity preview (shown after email is entered in sign-in) ────────────
        identityPreviewEditButton: [
            'text-xs font-body font-medium',
            'text-brand-600 hover:text-brand-700',
            'transition-colors duration-150',
        ].join(' '),
    },
}