import React from 'react';
import SectionTitle from "@/components/atomic/sectionTitle";
import Button from "@/components/atomic/Button";

const CallToActionWrapper = () => {
    return (
        <div className="min-w-[400px] flex flex-col items-center justify-center gap-8 py-10 px-4">
            <SectionTitle
                title={"Don't just Share your world, Share Your Digital space"}
                subtitle={"Create a single, customizable page for all your content, products, and calls-to-action. Build your audience and generate revenue with one powerful link."}
                className={`w-1/2`}

            />
            <div className="w-full flex justify-start  flex-col md:flex-row gap-4">
                <Button  variant="primary" size="large">Get Started</Button>
                <Button variant="outlined" size="large">See Example Profile</Button>
            </div>
        </div>
    );
};

export default CallToActionWrapper;
