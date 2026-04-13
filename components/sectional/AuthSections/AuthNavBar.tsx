'use client';
import React from 'react';
import KnottedLogo from "@/components/atomic/KnottedLogo";
import Button from "@/components/atomic/Button";
import {useRouter} from "next/navigation";

export type AuthNavBarMode = "sign-in" | "sign-up" | "onboarding"

export interface AuthNavBarProps {
    mode?:AuthNavBarMode;
    step?:number;
    totalSteps?:number;
    className?:string;
}

const AuthNavBar: React.FC<AuthNavBarProps> = ({
        mode = "sign-in",
        step = 1,
        totalSteps = 1,
        className}
) => {

    const router = useRouter();

    return (
        <header
            className={`${className} mb-8 py-2 px-4 flex justify-between border-b border-slate-100 dark:border-slate-800`}
        >
            <KnottedLogo asLink={true} logoText={true}/>

            <nav className={"flex justify-center items-center"}>
                {/*Sign in mode render-----------------------------*/}
                {mode === "sign-in" &&(
                    <div className={"flex items-center "}>
                        <Button variant={"ghost"} size={"sm"}>Developers</Button>
                        <Button onClick={() => router.push("/sign-up")} variant={"dark"} size={"sm"}>Sign-Up</Button>
                    </div>
                )}
                {/*Sign-up mode render--------------------------------------r*/}
                {mode === "sign-up" &&(
                    <div className={"flex items-center"}>
                        <Button variant={"ghost"} size={"sm"}>Developers</Button>
                        <Button onClick={() => router.push("/sign-in")} variant={"dark"} size={"sm"}>Sign-In</Button>
                    </div>
                )}
                {/*Onboarding mode render--------------------------------------r*/}
                {mode === "onboarding" &&(
                    <div className={"flex items-center"}>
                        <Button variant={"ghost"} size={"sm"}>
                            Step {step} of {totalSteps}
                        </Button>
                        <Button onClick={() => router.push("/sign-in")} variant={"dark"} size={"sm"}>Sign-Up</Button>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default AuthNavBar;
