import React from 'react';
import SectionTitle from "@/components/atomic/sectionTitle";
import Card from "@/components/atomic/Card";
import IconButton from "@/components/atomic/IconButton";
import { Link } from 'lucide-react';
import CardText from "@/components/atomic/CardText";
import { CircleDollarSign } from 'lucide-react';
import { ChartNoAxesCombined } from 'lucide-react';
import { Brush } from 'lucide-react';





const FeaturesSection = () => {
    return (
        <section className="min-h-[600px] mt-10  py-10 bg-gray-50 flex flex-col items-center justify-start gap-8">
        {/*    Section title goes here*/}
            <div>
                <SectionTitle
                    title={"Everything You Need in One Place"}
                    subtitle={"Powerful features to grow your audience and monetize your content"}
                    center={true}
                />
            </div>
        {/*    Section content goes here*/}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-16">
                {/*Card starts here*/}
                <Card
                    variant={'outlined'}
                    className={'w-full  flex flex-col items-start justify-center pt-4'}
                >
                    <IconButton
                        icon={<Link/>}
                        shape={"square"}
                        size={"small"}
                        variant={"secondary"}
                    />
                    <CardText
                        title={"All Your Links in One Place"}
                        subtitle={"Consolidate your social profiles, content, products, and services into a single, easy-to-share link that works everywhere"}

                    />
                    
                </Card>
                {/* Card ends  here   */}
                {/*Card starts here*/}
                <Card
                    variant={'outlined'}
                    className={'w-full  flex flex-col items-start justify-center pt-4'}
                >
                    <IconButton
                        icon={<CircleDollarSign />}
                        shape={"square"}
                        size={"small"}
                        variant={"secondary"}
                    />
                    <CardText
                        title={"Monetize Directly"}
                        subtitle={`
                        Sell products, accept payments, and offer 
                        premium content directly from your link page. 
                        No complicated setup required.
                        `}
                    />
                </Card>
                {/* Card ends here   */}
                {/*Card starts here*/}
                <Card
                    variant={'outlined'}
                    className={'w-full  flex flex-col items-start justify-center pt-4'}
                >
                    <IconButton
                        icon={<ChartNoAxesCombined />}
                        shape={"square"}
                        size={"small"}
                        variant={"secondary"}
                    />
                    <CardText
                        title={"Understand Your Audience"}
                        subtitle={`
                        Track clicks, views, and engagement with detailed analytics.
                         Make data-driven decisions to optimize your link strategy.
                        `}
                    />
                </Card>
                {/* Card ends  here   */}
                {/*Card starts here*/}
                <Card
                    variant={'outlined'}
                    className={'w-full  flex flex-col items-start justify-center pt-4'}
                >
                    <IconButton
                        icon={<Brush />}
                        shape={"square"}
                        size={"small"}
                        variant={"secondary"}
                    />
                    <CardText
                        title={"Customizable Design"}
                        subtitle={`
                            Personalize your link page with custom colors, fonts, and 
                            layouts that match your brand identity and style.
                        `}
                    />
                </Card>
                {/* Card ends here   */}
            </div>

        </section>
    );
};

export default FeaturesSection;
