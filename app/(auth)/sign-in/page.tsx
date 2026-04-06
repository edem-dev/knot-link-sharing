import React from 'react';
import {SignIn} from "@clerk/nextjs";

const page = () => {
    return (
        <main style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}>
            <SignIn />
        </main>
    );
};

export default page;
