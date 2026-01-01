import React from 'react';
import Card from "@/components/atomic/Card";
import SectionTitle from "@/components/atomic/sectionTitle";
import Button from "@/components/atomic/Button";
import EditLinkCard from "@/components/molecular/EditLinkCard";
import UserDetails from "@/components/molecular/UserDetails";
import CardText from "@/components/atomic/CardText";
import IconButton from "@/components/atomic/IconButton";
import {Book, BriefcaseBusiness, Files, FolderKanban, Instagram} from "lucide-react";
import Badge from "@/components/atomic/Badge";


const Dashboard = () => {
    return (
        <div className="p-4  justify-center items-center flex md:flex-row flex-col gap-4 md:gap-8">
            {/*Left hand side*/}
            <div className={"flex flex-col min-w-[500px]"}>
                <Card
                    variant={"ghost"}
                    translateY={false}
                >
                    <SectionTitle
                        title={"Dashboard"}
                        subtitle={"Your Links"}
                    />
                    {/*    Add link Button*/}
                    <Button
                        children={"Add new link"}
                    />
                </Card>
                {/*    Edit links cards*/}
                <div className={"flex flex-col gap-4 mb-6"}>
                    <EditLinkCard
                    linkName={"My Latest Project"}
                    icon={<FolderKanban/>}
                    linkType={<Badge variant={"neutral" } children={"Standard link"} size={"small"}/>}
                    />
                    <EditLinkCard
                    linkName={"My Portfolio website"}
                    icon={<BriefcaseBusiness />}
                    linkType={<Badge variant={"neutral" } children={"Standard link"} size={"small"}/>}
                    />
                    <EditLinkCard
                    linkName={"My Instagram"}
                    icon={<Instagram/>}
                    linkType={<Badge variant={"neutral" } children={"Social link"} size={"small"}/>}
                    />
                    <EditLinkCard
                    linkName={"My Design Course"}
                    icon={<Book/>}
                    linkType={<Badge variant={"neutral" } children={"Course link"} size={"small"}/>}
                    />
                </div>
            </div>
        {/*    Left hand side*/}
        {/*    Right hand side*/}
            <div className={"flex flex-col gap-4"}>
                {/*Profile preview card*/}
                <Card
                    className={"flex flex-col items-center"}
                    translateY={false}
                >
                    <CardText title={"Profile Preview"} center={true}/>
                    <UserDetails/>
                    <Button
                        size={"large"}
                        variant={"outlined"}
                    >
                        Edit Profile
                    </Button>
                   <span className={'w-full flex justify-between items-center'}>
                       <div>Your public url: {'knotted/janedoe'}</div>
                       <IconButton
                           variant={"secondary"}
                           size={"small"}
                           shape={"circle"}
                           icon={<Files/>}
                       />
                   </span>
                </Card>
                {/*Profile preview card*/}
                <Card>
                    <CardText
                        title={"Basic Analytics"}
                    />
                </Card>
            </div>
        {/*    Right hand side*/}
        </div>
    );
};

export default Dashboard;
