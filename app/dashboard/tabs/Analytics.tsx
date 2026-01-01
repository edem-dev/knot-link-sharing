'use client'
import React from 'react';
import SectionTitle from "@/components/atomic/sectionTitle";
import Dropdown from "@/components/atomic/Dropdown";
import Card from "@/components/atomic/Card";
import AnalyticsCardWrapper from "@/components/molecular/AnalyticsCardWrapper";
import AnalyticsProgressBar from "@/components/molecular/AnalyticsProgressBar";
import CardText from "@/components/atomic/CardText";
import AnalyticsProgress from "@/components/molecular/AnalyticsProgress";
const Analytics = () => {


    return (
        <section className={"my-6 px-4 gap-4  flex flex-col"}>
            {/*Title and days drop down*/}
            <div className={"flex justify-between items-center"}>
                <SectionTitle title={"Analytics Overview"}/>
                <Dropdown/>
            </div>
            <AnalyticsCardWrapper/>
        {/*    Analytics progress*/}
            <Card
            translateY={false}
            >
                <CardText title={"Top Performing Links "}/>
                <div>
                    <AnalyticsProgress borderBottom={true} linkName={"My portfolio website"} progress={80}/>
                    <AnalyticsProgress borderBottom={true} linkName={"My Youtube Chanel"} progress={30}/>
                    <AnalyticsProgress borderBottom={true} linkName={"Newsletter signup"} progress={70}/>
                    <AnalyticsProgress borderBottom={true} linkName={"Spotify playlist"} progress={43}/>
                    <AnalyticsProgress borderBottom={false} linkName={"Design course"} progress={67}/>
                </div>
            </Card>
        </section>
    );
};

export default Analytics;
