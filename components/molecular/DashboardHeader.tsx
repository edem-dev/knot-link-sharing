"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/atomic/Button";
import Avatar from "@/components/atomic/Avatar";
import Navbar from "@/components/molecular/Navbar";

export default function DashboardHeader() {
    const router = useRouter();

    return (
        <Navbar>
            <header className={"flex justify-between items-center gap-4"}>
                <Button
                    size={"medium"}
                    variant={"outlined"}
                    onClick={() => router.push("/login")}
                >
                    View Public Profile
                </Button>
                <Avatar
                    name={"Jane doe"}
                    size={"md"}
                />
            </header>
        </Navbar>
    );
}
