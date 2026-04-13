'use client';
 import React, {useState} from 'react';

 // imported components
// Each is fully documented in its own file under @/components/atoms/.
import KnottedLogo    from '@/components/atomic/KnottedLogo';
import Button         from '@/components/atomic/Button';
import Input          from '@/components/atomic/Input';
import Divider        from '@/components/atomic/Divider';
import StatusIndicator from '@/components/atomic/StatusIndicator';
import GoogleIcon     from '@/components/atomic/GoogleIcon';

 // sectional components
 import AuthNavBar from "@/components/sectional/AuthSections/AuthNavBar";
 import AuthFooter from "@/components/sectional/AuthSections/AuthFooter";

 // molecular components
import FormField  from "@/components/molecular/Formfield";

 // Lucide Icons
import { Mail, Lock } from 'lucide-react';

 // Interface: The onSubmit call back is passed with an object already
// destructured in it.=> fn?: (data:{email:string; password:string}) => void

export interface SignInPageProps {
    onSubmit?: (data:{email:string; password:string}) => void;
    onGoogleSignIn?: () => void;
    loading?: boolean;
    errorMessage?: string;
    className?: string;
}

 const SignInPage: React.FC<SignInPageProps> = ({
    onSubmit,
    onGoogleSignIn,
    loading = false,
    errorMessage,
    className = "",
 }) => {

     // Form State-----------------------------------------------------
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

     // Form Submission handler
     const handleSubmit = (e:React.FormEvent)=>{
         e.preventDefault();
         // onSubmit?.() -> this is an optional calling of a function call.
         //It simply prevents the app from crashing even if the parent does not ps the prop.
         onSubmit?.({email:email.trim(), password});
     }

     return (
         // Outer Div with subtle gradient
         <div
            className={[
                'min-h-screen flex flex-col',
                'bg-linear-to-br from-slate-50 via-brand-50/30 to-slate-100',
                'dark:from-slate-950 dark:via-brand-950/20 dark:to-slate-900',
                className,
            ].join(" ")}
         >
         {/*Auth nav bar ------------------------------------------------*/}
             <AuthNavBar mode={"sign-in"}/>
         {/*    Main Content---------------------------------------------*/}
             <main className={'flex-1 flex items-center justify-center px-4 py-12'}>
                {/*Sign In card---------------------------------------------*/}
                 <div
                    className={[
                        'w-full max-w-md',
                        'bg-white dark:bg-slate-900',
                        'rounded-3xl',
                        'shadow-xl shadow-slate-200/60 dark:shadow-black/40',
                        'border border-slate-100 dark:border-slate-800',
                        'px-8 py-10'
                    ].join(" ")}

                    aria-labelledby={"sign-in-heading"}
                 >
                    {/*Heading section --------------------------------------*/}
                     <div className={'flex flex-col items-center gap-2 justify-center mb-5'}>
                         <KnottedLogo/>
                         <h1
                            id={"sign-in-heading"}
                            className={[
                                'font-display',
                                'font-extrabold text-3xl',
                                'text-slate-900 dark:text-white',
                                'mb-1'
                            ].join(" ")}
                         >
                             Welcome back
                         </h1>
                         <p className={'font-body text-sm text-slate-400 dark:text-slate-500'}>
                             Continue your journey with Knotted.
                         </p>
                     </div>
                     {/*Heading section --------------------------------------*/}
                     {/*Google SignIn Option-------------------------------------- */}
                     <Button
                        variant={"outline"}
                        size={"lg"}
                        fullWidth={true}
                        leftIcon={<GoogleIcon/>}
                        onClick={onGoogleSignIn}
                        type={"button"}
                        className={"my-4"}
                     >
                         Sign in with Google
                     </Button>
                 {/*    Divider------------------------------------*/}
                     <Divider label="or use email" className="mb-5" />
                     {/*Form-----------------------------------------------------*/}
                     <form
                         onSubmit={handleSubmit}
                         noValidate={true}
                         className={'flex flex-col my-4 gap-4'}
                         aria-label={'Sign in with email'}
                     >
                         {/*Email form field--------------------------------------*/}
                         <FormField
                             label="Email Address"
                             htmlFor="email"
                         >
                             <Input
                                 id="email"
                                 type="email"
                                 placeholder="name@company.com"
                                 autoComplete="email"
                                 leadingIcon={<Mail className="w-4 h-4" />}
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 required
                             />
                         </FormField>
                     {/*Password form field ----------------------------------------*/}
                         <FormField
                             label="Password"
                             htmlFor="password"
                             labelAction={
                                 // This anchor sits to the right of the "Password" label.
                                 // FormField renders it via its `labelAction` slot prop.
                                 // Styling is applied here, not inside FormField.
                                 <a
                                     href="/forgot-password"
                                     className={[
                                         'text-xs font-body font-medium',
                                         'text-brand-600 hover:text-brand-700',
                                         'dark:text-brand-400 dark:hover:text-brand-300',
                                         'transition-colors duration-150',
                                         'focus-visible:outline-none focus-visible:ring-1',
                                         'focus-visible:ring-brand-600 rounded',
                                     ].join(' ')}
                                 >
                                     Forgot password?
                                 </a>
                             }
                         >
                             <Input
                                 id="password"
                                 type="password"
                                 // type="password" activates the built-in Eye/EyeOff toggle
                                 // inside the Input atom. No extra state or props are needed here.
                                 placeholder="••••••••"
                                 autoComplete="current-password"
                                 leadingIcon={<Lock className="w-4 h-4" />}
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 required
                             />
                         </FormField>
                     {/*Password form field ----------------------------------------*/}
                     {/*Error message conditionally rendered*/}
                         {errorMessage && (
                             <StatusIndicator
                                 variant="error"
                                 message={errorMessage}
                             />
                         )}

                     {/*    Sign-in button*/}
                         <Button
                             variant="primary"
                             size="xl"
                             fullWidth
                             loading={loading}
                             type="submit"
                             className="mt-1"
                         >
                             Sign in
                         </Button>
                     </form>

                     {/* ── Create account link ─────────────────────────────────────── */}
                     <p className="text-center text-sm font-body text-slate-500 dark:text-slate-400 mt-6">
                         New to Knotted?{' '}
                         <a
                             href="/sign-up"
                             className={[
                                 'font-medium',
                                 'text-brand-600 hover:text-brand-700',
                                 'dark:text-brand-400 dark:hover:text-brand-300',
                                 'transition-colors duration-150',
                                 'focus-visible:outline-none focus-visible:ring-1',
                                 'focus-visible:ring-brand-600 rounded',
                             ].join(' ')}
                         >
                             Create account
                         </a>
                     </p>
                 </div>
                 {/*Sign In card---------------------------------------------*/}
             </main>

         {/*    Knotted Footer*/}
             <AuthFooter/>
         </div>
     );
 };
 
 export default SignInPage;
 