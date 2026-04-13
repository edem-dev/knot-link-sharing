'use client';

import React from 'react';
// --Sectional imports------------------------------------------>
import AuthNavBar  from "@/components/sectional/AuthSections/AuthNavBar";
import AuthFooter from "@/components/sectional/AuthSections/AuthFooter";

// --Atomic imports------------------------------------------>
import Button from "@/components/atomic/Button";
import Input from "@/components/atomic/Input";
import Divider from "@/components/atomic/Divider";
import GoogleIcon from "@/components/atomic/GoogleIcon";
import StatusIndicator from "@/components/atomic/StatusIndicator";

// --Molecular imports------------------------------------------>
import FormField from "@/components/molecular/Formfield";
import KnottedLogo from "@/components/atomic/KnottedLogo";
import {User, Lock} from "lucide-react";
import Link from "next/link";
import TermsAndPrivacy from "@/components/atomic/TermsAndPrivacy";

// Interface
export interface SignUpPageProps {
    onSubmit?:(data:{name:string; email:string; password:string}) => void;
    onGoogleSignUp?:() => void;
    loading?:boolean;
    errorMessage?:string;
    className?:string;
}

const SignUpPage:React.FC<SignUpPageProps> = ({
    onSubmit,
    onGoogleSignUp,
    loading = false,
    errorMessage,
    className,
}) => {

    //--Form States---------------------------------------------->
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirm, setConfirm] = React.useState("");

    //--Per-field error messages------------------------------->
    const [nameError, setNameError] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const [confirmError, setConfirmError] = React.useState("");

    //--Form Validation------------------------------------------>
    const validate = ():boolean =>{
        let valid = true;

    //--Validate name ------------------------------------------>
        if (!name.trim()){
            setNameError("Please enter your name");
            valid = false;
        }else{
            setNameError("");
        }

    // --Validate Email with regex------------------------------------>
        if (!email.trim()) {
            setEmailError('Please enter your email address.');
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setEmailError('Please enter a valid email address.');
            valid = false;
        } else {
            setEmailError('');
        }

    //--Validate Password--------------------------------------------->
        if (!password) {
            setPasswordError('Please enter a password.');
            valid = false;
        } else if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters.');
            valid = false;
        } else {
            setPasswordError('');
        }

    //--Validate Password Confirmation-------------------------------->
        if (!confirm) {
            setConfirmError('Please confirm your password.');
            valid = false;
        } else if (confirm !== password) {
            setConfirmError('Passwords do not match.');
            valid = false;
        } else {
            setConfirmError('');
        }

        return valid;
    }

    //--Form Submit handler function------------------------------------->
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) return;

        onSubmit?.({
            name: name.trim(),
            email: email.trim(),
            password,
            });
    };

    //--Derived inputSate helpers------------------------------------>
    // Name: error if nameErr exists, success if name has text, default otherwise
    const nameInputState =
        nameError ? "error" as const
            : password ? "success" as const
            : "default" as const;

    //Email: error if emailError, success if email matches the format
    const emailInputState =
        emailError ? "error" as const
            : email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'success' as const
            : "default" as const;

    //Password: error if passwordError, success once 8+ chars are entered
    const passwordInputState =
        passwordError ? "error" as const
            : password && password.length >= 8 ? 'success' as const
            : "default" as const;
    //Confirm: error if confirmError, success if confirm matches password
    const confirmInputState =
        confirmError ? "error" as const
            : confirm && confirm === password ? 'success' as const
            : "default" as const;

    return (
        <div
            className={[
                'min-h-screen flex flex-col',
                // Same gradient as SignInPage — visual consistency across auth screens
                'bg-linear-to-br from-slate-50 via-brand-50/30 to-slate-100',
                'dark:from-slate-950 dark:via-brand-950/20 dark:to-slate-900',
            ].join(" ")}
        >
        {/*AuthNavBar--------------------------------------*/}
            <AuthNavBar mode={"sign-up"}/>
        {/*Main Content------------------------------------*/}
            <main className={'flex-1 flex items-center justify-center px-4 py-12'}>
            {/*Form Card-----------------------------------*/}
               <div
                className={[
                    'w-full max-w-md',
                    'bg-white dark:bg-slate-900',
                    'rounded-3xl',
                    'shadow-xl shadow-slate-200/60 dark:shadow-black/40',
                    'border border-slate-100 dark:border-slate-800',
                    'px-8 py-10',
                ].join(" ")}
                aria-labelledby={"sign-up-heading"}
               >
               {/*Heading section -------------------------*/}
                   <div className={'flex flex-col items-center gap-2 justify-center mb-5'}>
                   {/*Knotted-logo-------------------------*/}
                       <div className={'flex items-center mb-2'}>
                           <KnottedLogo size={"md"}/>
                       </div>
                       <h1
                            id={"sign-up-heading"}
                            className={[
                                'font-display text-center',
                                'font-extrabold md:text-3xl text-2xl',
                                'text-slate-900 dark:text-white',
                                'mb-1',
                            ].join(" ")}
                       >
                           Create your account
                       </h1>
                       <p className={'font-body text-sm text-slate-400 dark:text-slate-500'}>
                           Start sharing everything in one place
                       </p>
                   </div>
               {/*Heading section -------------------------*/}
               {/*Google SignUp Option---------------------*/}
                   <Button
                        variant={"outline"}
                        size={"lg"}
                        fullWidth={true}
                        leftIcon={<GoogleIcon/>}
                        onClick={onGoogleSignUp}
                        type={"button"}
                        className={"my-4"}
                   >
                       Sign up with Google
                   </Button>
            {/*Divider-------------------------------------*/}
                <Divider label="or use email" className="mb-5"/>
               {/*Form-------------------------------------*/}
                   <form
                    onSubmit={handleSubmit}
                    noValidate={true}
                    className={'flex flex-col my-4 gap-4'}
                    aria-label={'Sign up with email'}
                   >
                       {/*Name Iput field------------------*/}
                       <FormField
                           label={"Full Name"}
                           htmlFor={"sign-up-name"}
                           helperText={nameError || undefined}
                           isError={!!nameError}
                       >
                           <Input
                            id={"sign-up-name"}
                            type={"text"}
                            placeholder={"Alex Rivers"}
                            autoComplete={"name"}
                            leadingIcon={<User className="w-4 h-4" />}
                            value={name}
                            onChange={(e)=>{
                                setName(e.target.value);
                                if (nameError) setNameError("");
                            }}
                            inputState={nameInputState}
                            required
                           />
                       </FormField>

                       {/*Email Input field--------------- */}
                           <FormField
                               label={"Email Address"}
                               htmlFor={"sign-up-email"}
                               helperText={emailError || undefined}
                               isError={!!emailError}
                           >
                               <Input
                                   id={"sign-up-email"}
                                   type={"email"}
                                   placeholder={"name@company.com"}
                                   autoComplete={"email"}
                                   leadingIcon={<User className="w-4 h-4" />}
                                   value={email}
                                   onChange={(e)=>{
                                       setEmail(e.target.value);
                                       if (emailError) setEmailError("");
                                   }}
                                   inputState={emailInputState}
                                   required
                               />
                           </FormField>
                   {/*Password Input field*/}
                       <FormField
                           label={"Password"}
                           htmlFor={"sign-up-password"}
                           helperText={
                                passwordError
                                    ? passwordError
                                    : password && password.length < 8
                                    ?`${password.length}/8 characters minimum`
                                    : undefined
                            }
                           isError={!!passwordError}
                       >
                           <Input
                                id={"sign-up-password"}
                                type={"password"}
                                placeholder={"Min. 8 characters"}
                                autoComplete={"new-password"}
                                leadingIcon={<Lock className="w-4 h-4" />}
                                value={password}
                                onChange={(e)=>{
                                    setPassword(e.target.value);
                                    if (passwordError) setPasswordError("");

                                //Clear the confirm passord error when password changes
                                    if (confirmError) setConfirmError("");
                                }}
                                inputState={passwordInputState}
                                required
                           />
                       </FormField>

                   {/*Confirm Password Input Field---------*/}
                       <FormField
                           label={"Confirm Password"}
                           htmlFor={"sign-up-confirm-password"}
                           helperText={confirmError || undefined}
                           isError={!!confirmError}
                       >
                           <Input
                                id={"sign-up-confirm-password"}
                                type={"password"}
                                placeholder={"Re-enter password"}
                                autoComplete={"new-password"}
                                leadingIcon={<Lock className="w-4 h-4" />}
                                value={confirm}
                                onChange={(e)=>{
                                    setConfirm(e.target.value);
                                    if (confirmError) setConfirmError("");
                                }}
                                inputState={confirmInputState}
                                required
                           />
                       </FormField>

                   {/*Error status Indicator--------------*/}
                       {errorMessage && (
                           <StatusIndicator
                               variant="error"
                               message={errorMessage}
                           />
                       )}

                   {/*Create Account button----------------*/}
                       <Button
                           type={"submit"}
                           size={"xl"}
                           fullWidth={true}
                           loading={loading}
                           className={"mt-4"}
                       >
                           Create Account
                       </Button>
                   </form>

               {/*Terms of fine print----------------------*/}
                   <TermsAndPrivacy />
               {/*SignIn Option --------------------------*/}
                   <p className="text-center text-sm font-body text-slate-500 dark:text-slate-400 mt-4">
                       Already have an account?{' '}
                       <a
                           href="/sign-in"
                           className={[
                               'font-medium',
                               'text-brand-600 hover:text-brand-700',
                               'dark:text-brand-400 dark:hover:text-brand-300',
                               'transition-colors duration-150',
                               'focus-visible:outline-none focus-visible:ring-1',
                               'focus-visible:ring-brand-600 rounded',
                           ].join(' ')}
                       >
                           Sign in
                       </a>
                   </p>
               </div>
            {/*Form Card-----------------------------------*/}
            </main>
        {/*AuthFooter--------------------------------------*/}
            <AuthFooter/>
        </div>
    );
};

export default SignUpPage;
