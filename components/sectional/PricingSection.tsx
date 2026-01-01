import React from 'react';
import SectionTitle from "@/components/atomic/sectionTitle";
import Button from "@/components/atomic/Button";
import CardText from "@/components/atomic/CardText";

const PricingSection = () => {
    return (
        <section className="min-h-[400px] border-t-1 border-gray-200 py-10 px-4 bg-background flex flex-col md:items-center  justify-start gap-4">
            <SectionTitle
                title={"Ready to Share Your World?"}
                subtitle={`Join thousands of creators, entrepreneurs, 
                    and influencers who use LinkShare to connect with their 
                    audience`}
                center={true}
            />
            <Button variant="primary" size="large">Get Started
                Create Your Free Profile now
            </Button>
            <CardText
                center={true}
                subtitle={"Free forever. No credit card required. Upgrade anytime for advanced features."}
            />
        </section>
    );
};

export default PricingSection;
