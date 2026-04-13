import React from 'react';
import Button from "@/components/atomic/Button";
import {router} from "next/client";
import {useRouter} from "next/navigation";

export type AuthMode = "sign-in" | "sign-up" | 'onboarding';

export interface AuthModeProps {
    mode?: AuthMode;
    step?: number;
    totalSteps?: number;
    className?: string;
}

const AuthMode: React.FC<AuthModeProps> = ({
    mode,
    step,
    totalSteps,
    className = "",
}) => {

    const router = useRouter();

    return (
        <div
            className={`flex items-center gap-2 ${className}`}
        >
            {/*Render sign-in mode buttons--------------------------------*/}
            {mode === "sign-in" &&(
                <div className={"flex items-center gap-2"}>
                    <Button variant={"ghost"} size={"sm"}>Developers</Button>
                    <Button onClick={() => router.push("/sign-up")} variant={"dark"} size={"sm"}>Sign-Up</Button>
                </div>
            )}
            {/*Render sign-up mode buttons--------------------------------*/}
            {mode === "sign-up" &&(
                <div className={"flex items-center gap-2"}>
                    <Button variant={"ghost"} size={"sm"}>Developers</Button>
                    <Button onClick={() => router.push("/sign-in")} variant={"dark"} size={"sm"}>Sign-In</Button>
                </div>
            )}
            {/*Onboarding mode render--------------------------------------r*/}
            {mode === "onboarding" &&(
                <div className={"flex items-center gap-2"}>
                    <Button variant={"ghost"} size={"sm"}>
                        Step {step} of {totalSteps}
                    </Button>
                    <Button onClick={() => router.push("/sign-up")} variant={"dark"} size={"sm"}>Sign-Up</Button>
                </div>
            )}

        </div>
    );
};

export default AuthMode;
