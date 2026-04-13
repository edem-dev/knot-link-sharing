'use client';

import React, {useEffect, useState} from 'react';
import { CheckCircle2, Loader2, ArrowRight } from 'lucide-react';


// Components Used--------------------------------------------->
// Atomic imports---------------------------------------------->
import Input from '@/components/atomic/Input';
import Button from '@/components/atomic/Button';
import StatusIndicator from '@/components/atomic/StatusIndicator';

// Molecular imports------------------------------------------->
import FormField from "@/components/molecular/Formfield";
import SocialProof from "@/components/molecular/SocialProof";

// Sectional imports------------------------------------------->
import AuthNavBar from "@/components/sectional/AuthSections/AuthNavBar";
import OnboardingFooter from "@/components/sectional/onboardingSectionals/OnboardingFooter";

//Availability types------------------------------------------->
export type UsernameAvailability = 'idle' | 'checking' | 'available' | 'taken';

// Interface--------------------------------------------------->
interface UsernameOnboardingPageProps {
    step?:number;
    totalSteps?:number;
    onClaim?:(username:string) => void;
    className?:string;
}

const UsernameOnboardingPage:React.FC<UsernameOnboardingPageProps> = ({
    step = 1,
    totalSteps = 1,
    onClaim,
    className = '',
}) => {

    // Username state check------------------------------------>
    const [username, setUsername] = useState<string>('');
    // Availability state check-------------------------------->
    const [availability, setAvailability] = useState<UsernameAvailability>('idle');

    //useEffect - debounced availability check------------------->
     useEffect(() => {
         //Usernames shorter than 3 chars are not valid and will
         // trigger an 'idle' state.

         if (username.length < 3) {
             setAvailability('idle');
             return;
         }

        //for good UX show and spinner which the 'checking' state owns.
        //So that the [userPublic] knows that something is happening.
         setAvailability('checking');

        //Now schedule the 500ms check.
         const timer = setTimeout(async () => {
             try {
                 //Todo: Replace this cod e block with an actual API call

                 //-Simulation-Always 'available' for demo purposes
                 setAvailability('available');
             }catch {
                 // Network error or server error — reset to idle so the [userPublic] can retry.
                 // We don't show an error message here because the field is still valid —
                 // we just couldn't check. The [userPublic] can continue typing or submit.
                 setAvailability('idle');
             }
         },3000)
         return () => clearTimeout(timer);

     }, [username]);

     //Input Change handler function------------------------------>
    const handleUsernameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const sanitized = e.target.value
            .toLowerCase()
            .replace(/[^a-z0-9_]/g, '');

        setUsername(sanitized);
    }

    //Form Submit Handler ---------------------------------------->
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
    //     Guard the submission-> If the username is available, then proceed.
        if (availability !== 'available') return;
         onClaim?.(username);
    };

    //Feedback map ------------------------------------------------>
    //Basically you want to visually display feedback for only two
    //availability  states 'available' and 'taken' so, this takes care of that.
    const feedbackMap: Partial<Record<UsernameAvailability, {
        message: string;
        variant: 'success' | 'error';
    }>> = {
        available: {
            message: 'This username is available!',
            variant: 'success',
        },
        taken: {
            message: 'That username is already taken.',
            variant: 'error',
        },
    };

    // Get the current feedback entry (This may be undefined for 'idle' and 'checking')
    const currentFeedback = feedbackMap[availability];

    // Derived input states----------------------------------------------->
    // Computed from availability — no extra useState needed.
    const inputState =
        availability === 'available' ? 'success' as const
            : availability === 'taken'   ? 'error'   as const
                : 'default' as const;
    return (
        <div
            className={[
                'min-h-screen bg-white dark:bg-slate-950 flex flex-col',
                className,
            ].join(' ')}
        >
            {/*Auth NavBar--------------------------------------------->*/}
            <AuthNavBar mode={"onboarding"} step={step} totalSteps={totalSteps}/>
            {/*Main content--------------------------------------------->*/}
            <main
                className={"flex-1 gap-6 flex flex-col items-center justify-center px-6 py-12"}
                aria-labelledby={'onboarding-heading'}
            >
            {/*Heading---------------------------------------------------*/}
                <div className={"flex flex-col text-center items-center justify-center"}>
                    <h1
                        id={'onboarding-heading'}
                        className={[
                            "font-display font-extrabold text-3xl",
                            "sm:text-5xl text-slate-900 dark:text-white mb-2",
                        ].join(" ")}
                    >
                        Pick your username
                    </h1>
                    <p
                    className={[
                        "font-body text-slate-600",
                        "dark:text-slate-400 text-center mb-10",
                    ].join(" ")}
                    >
                        Your public URL will be{' '}
                        <span className={"font-medium text-brand-600 dark:text-brand-400"}>
                            knotted.to/username
                        </span>
                    </p>
                </div>

            {/*Form----------------------------------------------------*/}
                <form
                    noValidate={true}
                    onSubmit={handleSubmit}
                    className={"w-full max-w-md flex flex-col gap-e"}
                >
                {/*Username Selection Form Field----------------------------->*/}
                    <FormField
                        label={"Claim your unique link"}
                        htmlFor={"username"}>
                        <Input
                            id={"username"}
                            type={"text"}
                            prefix={"knotted.to/"}
                            placeholder={"yourname"}
                            autoComplete={"off"}
                            spellCheck={false}
                            value={username}
                            onChange={handleUsernameChange}
                            inputState={inputState}
                            trailingIcon={
                                availability === 'checking'
                                    ? (
                                        <Loader2
                                            className="w-4 h-4 text-slate-400 animate-spin"
                                            size={16}  aria-hidden={"true"}/>
                                        )
                                    : availability === 'available'
                                    ?   (
                                        <CheckCircle2
                                            className={"w-4 h-4 text-brand-600 dark:text-brand-400"}
                                            aria-hidden={"true"}/>
                                        )
                                    : undefined
                            }
                        />
                    </FormField>
                {/*Status Indicator----------------------------*/}
                    {currentFeedback && (
                        <StatusIndicator
                            message={currentFeedback.message}
                            variant={currentFeedback.variant}
                        />
                    )}

                {/*Claim Username Button----------------------------->*/}
                    <Button
                        variant={"primary"}
                        size={"xl"}
                        fullWidth={true}
                        type={"submit"}
                        disabled={availability !== 'available'}
                        rightIcon={<ArrowRight className={"w-4 h-4"}/>}
                        className={"mt-4"}
                    >
                        Claim username
                    </Button>
                </form>

                <SocialProof
                    avatars={[
                        "/Image/av-2.png",
                        "/Image/av-3.png",
                        "/Image/av-4.png",
                    ]}
                    count="10,000+"
                    label="sharing their best work"
                    className="mt-12"
                />

            </main>
            {/*Onboarding Footer--------------------------------------------->*/}
            <OnboardingFooter/>

        </div>
    );
};

export default UsernameOnboardingPage;
