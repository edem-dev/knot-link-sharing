'use client'

import React, {useState} from 'react';
import TabsTrigger from "@/components/atomic/tabsTrigger";
import TabsContent from "@/components/atomic/tabsContent";
import Dashboard from "@/app/dashboard/tabs/Dashboard";
import Analytics from "@/app/dashboard/tabs/Analytics";
import Settings from "@/app/dashboard/tabs/Settings";

const DashboardClient = () => {
    const [activeTab, setActiveTab] = useState("dashboard");

    return (
        <section className="w-full">
            <div className="w-full flex flex-row justify-between items-center sticky top-0 bg-white border-b">
                {/*Tabs trigger*/}
                <TabsTrigger value={"dashboard"} onChange={setActiveTab} activeTab={activeTab} className="flex-1">
                    Dashboard
                </TabsTrigger>
                <TabsTrigger value="analytics" activeTab={activeTab} onChange={setActiveTab} className="flex-1">
                    Analytics
                </TabsTrigger>
                <TabsTrigger value="settings" activeTab={activeTab} onChange={setActiveTab} className="flex-1">
                    Settings
                </TabsTrigger>
            </div>
            <div className="w-full mx-auto">
                {/*    Tabs content*/}
                <TabsContent value={"dashboard"} activeTab={activeTab}>
                    <Dashboard/>
                </TabsContent>
                <TabsContent value={"analytics"} activeTab={activeTab}>
                    <Analytics/>
                </TabsContent>
                <TabsContent value={"settings"} activeTab={activeTab}>
                    <Settings/>
                </TabsContent>
            </div>
        </section>
    );
};

export default DashboardClient;