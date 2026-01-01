'use client'
import React from 'react';
import Card from "@/components/atomic/Card";
import Avatar from "@/components/atomic/Avatar";
import CardText from "@/components/atomic/CardText";
import IconButton from "@/components/atomic/IconButton";
import {Globe, Instagram, Youtube} from "lucide-react";
import { Facebook } from 'lucide-react';

// import { useRouter } from "next/navigation";

// Create custom x icon
import { createLucideIcon } from 'lucide-react';
import UserDetails from "@/components/molecular/UserDetails";

// const XIcon = createLucideIcon('X', '<path d="M4 3h16c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V4c0-.6.4-1 1-1zM12 12l-2-2m2 2l2-2m-2 2l2 2m-2-2l-2 2"/>');

// In your component:
// <XIcon className="w-5 h-5" fill="currentColor" />


const UserProfile = () => {

    // const router = useRouter();

    // <button onClick={() => router.push("/login")}>
    //     Login
    // </button>


    return (
        <div className={"flex flex-col justify-center items-center"}>
            <UserDetails/>
        {/*    Links card starts here*/}
         <div className={"max-w-[320px] mb-8 flex flex-col items-center justify-center gap-4"}>
             <Card
                 size={"small"}
                 variant={'outlined'}
                 translateY={true}
                 className={"flex flex-col items-center justify-center gap-4"}
             >
                 <CardText
                     title={"My Latest Blog Post"}
                     subtitle={"Read about my latest project and how I built it."}
                     center={true}
                 />
             </Card>
             <Card
                 size={"small"}
                 variant={'outlined'}
                 translateY={true}
                 className={"flex flex-col items-center justify-center gap-4"}
             >
                 <CardText
                     title={"View my Youtube Channel"}
                     subtitle={"Watch my latest videos and learn more about my journey."}
                     center={true}
                 />
             </Card>
         </div>

        </div>
    );
};

export default UserProfile;
