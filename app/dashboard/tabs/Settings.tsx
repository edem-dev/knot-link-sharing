'use client'
import React, {useState} from 'react';
import TabsTrigger from "@/components/atomic/tabsTrigger";
import ProfileSettings from "@/components/sectional/ProfileSettings";
import LinkDisplaySettings from "@/components/sectional/LinkDisplaySettings";
import AccountSettings from "@/components/sectional/AccountSettings";
import TabsContent from "@/components/atomic/tabsContent";

const Settings = () => {

    const [activeTab, setActiveTab] = useState("profile");

    return (
        <section className={"my-6 flex flex-col  items-center"}>
            {/*Tab triggers*/}
            <div className={"flex justify-between items-center border-2 border-gray-200 rounded-lg overflow-hidden"}>
                <TabsTrigger className={"grow"} value={"profile"} onChange={setActiveTab} activeTab={activeTab}>
                    Profile
                </TabsTrigger>
                <TabsTrigger className={"grow"} value={"linkAndDisplay"} onChange={setActiveTab} activeTab={activeTab}>
                    Links & Display
                </TabsTrigger>
                <TabsTrigger className={"grow"} value={"account"} onChange={setActiveTab} activeTab={activeTab}>
                    Account
                </TabsTrigger>
            </div>
        {/*    tabs content*/}
            <div className={"py-2 mt-2 flex flex-col gap-4 w-full max-w-4xl px-6"}>
                <TabsContent bordered={false} value={"profile"} activeTab={activeTab}>
                    <ProfileSettings/>
                </TabsContent>
                <TabsContent bordered={false} value={"linkAndDisplay"} activeTab={activeTab}>
                    <LinkDisplaySettings/>
                </TabsContent>
                <TabsContent bordered={false} value={"account"} activeTab={activeTab}>
                    <AccountSettings/>
                </TabsContent>
            </div>
        </section>
    );
};

export default Settings;
