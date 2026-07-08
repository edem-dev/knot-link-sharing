'use client'
import {useRouter} from "next/navigation";
import {useState} from "react";
import {createClient} from "@/lib/supabase/client";
import SignUpPage from "@/components/sectional/AuthSections/SignUpPage";
import React from 'react';

export default function SignUpRoute() {
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const router = useRouter()

    async function handleSubmit(data:{name:string, email:string, password:string}) {
        setLoading(true)
        setErrorMessage(undefined)

        const supabase = createClient()
        const {error} = await supabase.auth.signUp({
            email: data.email,
            password : data.password,
            options:{
                data:{full_name: data.name}
            },
        })

        if (error) {
            setErrorMessage(error.message)
            setLoading(false)
            return
        }

        // Pass email along so the verify route knows who to verify
        router.push(`/signup/verify?email=${encodeURIComponent(data.email)}`)
    }

    async function handleGoogleSignUp() {
        const supabase = createClient()
        const {error:oauthError} =  await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })

        if(oauthError){
            setErrorMessage(oauthError.message)
            return
        }
    }


    return (
        <SignUpPage
            onSubmit={handleSubmit}
            onGoogleSignUp={handleGoogleSignUp}
            loading={loading}
            errorMessage={errorMessage}
        />
    );
}


