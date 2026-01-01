'use client'
import React, {useState} from 'react';
import Button from "@/components/atomic/Button";
import Input from "@/components/atomic/Input";
import IconButton from "@/components/atomic/IconButton";
import {Files} from "lucide-react";
import Avatar from "@/components/atomic/Avatar";
import dummyImage from "./../../public/myPic-1.jpg"
import Badge from "@/components/atomic/Badge";
import Switch from "@/components/atomic/Switch";
import TabsTrigger from "@/components/atomic/tabsTrigger";
import TabsContent from "@/components/atomic/tabsContent";
import PhoneWrapper from "@/components/molecular/PhoneWrapper";
import UserProfile from "@/components/sectional/UserProfile";
import SocialMediaLinks from "@/components/molecular/SocialMediaLinks";
import {Instagram} from "lucide-react";

const page = () => {

    const [value, setValue] = useState('')
    const [checked, setChecked] = useState(false)
    const [activeTab, setActiveTab] = useState("profile");


    const handleToggle = () => {
        setChecked(prev => !prev);
    };

    return (
        <div className={"p-4"}>
            <h1>Test all components here</h1>
            <h2>All buttons and their types</h2>
            <div className={"flex gap-4"}>
                <Button
                    variant={"primary"}
                    size={"medium"}
                    onClick={()=>console.log("clicked")}
                    disabled={false}
                    children={"Primary"}
                />
                <Button
                    variant={"secondary"}
                    size={"medium"}
                    onClick={()=>console.log("clicked")}
                    disabled={false}
                    children={"Secondary"}
                />
                <Button
                    variant={"danger"}
                    size={"medium"}
                    onClick={()=>console.log("clicked")}
                    disabled={false}
                    children={"Danger"}
                />
                <Button
                    variant={"ghost"}
                    size={"medium"}
                    onClick={()=>console.log("clicked")}
                    disabled={false}
                    children={"Ghost"}
                />
                <Button
                    variant={"link"}
                    size={"medium"}
                    onClick={()=>console.log("clicked")}
                    children={"Link"}
                    disabled={false}
                />
            </div>
        {/*    Test all inputs*/}
            <div className={"mt-10 flex flex-col gap-4"}>
            <h2 className={"mt-10"}>All inputs and their types</h2>
            <Input
                value={value}
                onChange={(value)=>setValue(value)}
                placeholder={"This is an outline input"}
                label={"Outline"}
                variant={"outline"}
                width={"w-1/2"}
            />
            <Input
                value={value}
                onChange={(value)=>setValue(value)}
                placeholder={"This is a filled input"}
                label={"Filled"}
                variant={"filled"}
                width={"w-1/2"}
            />
            <Input
                value={value}
                onChange={(value)=>setValue(value)}
                placeholder={"This is a disabled input"}
                label={"Disabled"}
                variant={"outline"}
                width={"w-1/2"}
                disabled={true}
            />
            </div>
        {/*    Icons are tested here*/}
                <h2 className={'mt-10'}>All icons ar tested here</h2>
            <div className={" flex items-center gap-4"}>
                <IconButton
                    icon={<Files size={20}/>}
                    ariaLabel={"test"}
                    onClick={()=>console.log("clicked")}
                    size={"small"}
                    shape={"circle"}
                    variant={"primary"}
                />
                <IconButton
                    icon={<Files size={20}/>}
                    ariaLabel={"test"}
                    onClick={()=>console.log("clicked")}
                    size={"medium"}
                    shape={"circle"}
                    variant={"primary"}
                />
                <IconButton
                    icon={<Files size={20}/>}
                    ariaLabel={"test"}
                    onClick={()=>console.log("clicked")}
                    size={"large"}
                    shape={"circle"}
                    variant={"primary"}
                />
                <IconButton
                    icon={<Files size={20}/>}
                    ariaLabel={"test"}
                    onClick={()=>console.log("clicked")}
                    size={"small"}
                    shape={"square"}
                    variant={"primary"}
                    disabled={true}
                />
            </div>
        {/*    Avatars*/}
            <h2 className={'mt-10'}>All avatars are tested here</h2>
            <div className={"flex gap-4"}>
               <Avatar
                   name={"Michael Kumah"}
                   size={"lg"}
               />
                <Avatar
                    src={dummyImage}
                    name={""}
                    size={"lg"}
                />
                <Avatar
                    name={"Elie Ama Darko"}
                    size={"lg"}
                />
            </div>
                {/*Tested all badges*/}
            <h2>Badges are tested here</h2>
            <div className={"flex gap-4"}>
                <Badge variant={"success"} size={"small"}>Success</Badge>
                <Badge variant={"warning"} size={"small"}>Warning</Badge>
                <Badge variant={"error"} size={"small"}>Error</Badge>
                <Badge variant={"info"} size={"small"}>Info</Badge>
                <Badge variant={"neutral"} size={"small"}>Neutral</Badge>
                <Badge variant={"neutral"} size={"small"} dismissable={true}>Neutral with icon</Badge>
            </div>
        {/*    Test all switches*/}
            <h2 className={'mt-10'}>All switches are tested here</h2>
            <div className={"flex gap-4"}>
                <Switch checked={checked} onChange={handleToggle} size={"md"}/>
                <Switch checked={checked} onChange={handleToggle} size={"md"}/>
            </div>

        {/*    Test the tabs*/}
            <h2 className={'mt-10'}>Tabs are tested here</h2>
            <div className={"flex"}>
                <TabsTrigger value={"profile"} onChange={setActiveTab} activeTab={activeTab}>
                    Profile
                </TabsTrigger>
                <TabsTrigger value="settings" activeTab={activeTab} onChange={setActiveTab}>
                    Security
                </TabsTrigger>
                <TabsTrigger value="analytics" activeTab={activeTab} onChange={setActiveTab}>
                    Notifications
                </TabsTrigger>

            </div>
            {/*    Content*/}
                <TabsContent value={"profile"} activeTab={activeTab}>
                    Profile content goes here
                </TabsContent>
            <TabsContent value={"settings"} activeTab={activeTab}>
                Security content goes here
            </TabsContent>
            <TabsContent value={"analytics"} activeTab={activeTab}>
                Notifications content goes here
            </TabsContent>
            Phone wrapper is tested here
            <div>
                <PhoneWrapper>
                    <UserProfile/>
                </PhoneWrapper>
            </div>
            <h2 className={'mt-10'}>SocialMediaLinks component is tested here</h2>
            <div className="w-1/2">
                <SocialMediaLinks
                    icon={<Instagram size={20}/>}
                    value="@janedoe_design"
                    onEdit={() => console.log("Edit clicked")}
                    onDelete={() => console.log("Delete clicked")}
                />
            </div>
        </div>
    );
};

export default page;
