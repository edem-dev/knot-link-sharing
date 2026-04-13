import React from 'react';
import PublicProfilePage from "@/components/sectional/UserSectionals/PublicProfilePage";
import {Globe} from "lucide-react";

const page = () => {
    return (
        <div>
        {/*Todo: Implement [userPublic] profile page with data from db*/}
            <PublicProfilePage
                 // avatarSrc="/alex.jpg"
                 name="Alex Rivers"
                 tagline="Digital Artist & Creative Developer"
                 bio="Building tools for the next generation of creators."
                 location="San Francisco, CA"
                 links={[
                   { id: '1', title: 'Portfolio',       href: 'https://...',  icon: <Globe /> },
                   { id: '2', title: 'Buy Me a Coffee', href: 'https://...',  highlighted: true },
                 ]}
                 stats={{ likes: '1.2k', shares: '428' }}
                 showBranding
               />
        </div>
    );
};

export default page;
