'use client'
import React from 'react';
import Button from "@/components/ui/Button";
import {useRouter} from "next/navigation";
// interface ButtonsWrapperProps {
//     children?: React.ReactNode;
// }

const ButtonsWrapper = (

) => {
    const router = useRouter();
    return (
        <>
            <Button
                title={"Get started"}
                onClick={()=>router.push("/(auth)/login")}
                className={"bg-tertiary font-semibold text-secondary px-4 py-3 rounded-full border-2 border-secondary"}
            />
            <Button
                title={"Explore"}
                onClick={()=>router.push("#explore")}
                className={"bg-secondary font-semibold text-primary  px-4 py-3 rounded-full border-2 border-tertiary"}
            />
        </>
    );
};

export default ButtonsWrapper;
