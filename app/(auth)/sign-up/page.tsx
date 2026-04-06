import React from 'react';
import { SignUp} from "@clerk/nextjs";

const page = () => {
    return (
        <main style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}>
            <SignUp />
        </main>
    );
};

export default page;
 