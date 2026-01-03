'use client'
import React, {useState} from 'react';
import CardText from "@/components/atomic/CardText";
import Card from "@/components/atomic/Card";
import Avatar from "@/components/atomic/Avatar";
import Input from "@/components/atomic/Input";
import Button from "@/components/atomic/Button";
import Textarea from "@/components/atomic/Textarea";
import IconButton from "../atomic/IconButton";
import {Edit, Files, Globe, Instagram} from "lucide-react";
import SocialMediaLinks from "@/components/molecular/SocialMediaLinks";

const ProfileDetails = () => {
    const [profileName, setProfileName] = useState("")

    return (
        <div className={"my-4"}>
            <Card
            translateY={false}
            size={"large"}
            className={"w-full"}
            >
                <CardText title={"Profile Settings"}/>
                {/*Avatar settings wrapper */}
                <div className={"mx-auto flex flex-col items-center justify-center gap-4 py-2 px-4  mb-4"}>
                    {/*    avatar*/}
                    <Avatar name={"Jane Doe"} size={"xl"} className={"mx-auto"}/>
                    <Button variant={"secondary"}>Change Avatar</Button>
                </div>

            {/*    Profile input fields*/}
                <div className={"flex flex-col justify-center gap-6 items-start"}>
                    <div className={"flex flex-col justify-start  w-full text-sm"}>
                        <Input    value={profileName} onChange={setProfileName} label={"Profile Name"}/>
                        <Textarea className={"py-2 px-4 font-body"} label={"Bio"}/>
                    </div>
                    <div className={"flex w-full  items-center justify-between"}>
                        <div >
                            <CardText title={"Your Public URL"}/>
                            <span className={"flex justify-start gap-4 items-center"}>
                            <p className={'text-sm  font-headings'}>{`knotted/janedoe`}</p>
                            <IconButton icon={<Files/>} size={"small"} shape={"circle"} variant={"ghost"}/>
                        </span>
                        </div>
                        <div>
                            <Button onClick={()=> {console.log("Edit links")}} variant={"outlined"} children={`Edit URL`}/>
                        </div>
                    </div>
                </div>
            {/*    Social Links */}
                <div className={"w-full"}>
                    <CardText title={"Social Media Links"}/>
                    <div className={"flex flex-col gap-4"}>
                        <SocialMediaLinks icon={<Instagram/>} value={"@jane-UX"}/>
                        <SocialMediaLinks icon={<Globe/>} value={"My Portfolio"}/>
                    </div>
                    <div>
                        <Button variant={"outlined"}>Add Social Link</Button>
                    </div>
                </div>
            {/*    save button*/}
                <div className={"w-full flex items-center justify-end"}>
                    <Button  size={"large"}>
                        Save Changes
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default ProfileDetails;
