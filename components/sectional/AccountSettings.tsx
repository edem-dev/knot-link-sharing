'use client'
import React, { useState } from 'react';
import Card from "@/components/atomic/Card";
import Button from "@/components/atomic/Button";
import Switch from "@/components/atomic/Switch";
import Modal from "@/components/atomic/Modal";
import CardText from "@/components/atomic/CardText";
import {X} from "lucide-react";
import IconButton from "@/components/atomic/IconButton";

const AccountSettings = () => {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [open, setOpen] = useState(false)

    return (
        <Card variant="outlined" translateY={false} className="max-w-4xl mx-auto">
            <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Settings</h2>

                {/* Email Address Section */}
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-gray-700">Email Address</span>
                        <span className="text-gray-600">jane.doe@example.com</span>
                    </div>
                    <Button variant="outlined" size="small">
                        Change Email
                    </Button>
                </div>

                {/* Password Section */}
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-gray-700">Password</span>
                        <span className="text-gray-600">••••••••</span>
                    </div>
                    <Button variant="outlined" size="small">
                        Change Password
                    </Button>
                </div>

                {/* Two-Factor Authentication Section */}
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Two-Factor Authentication</span>
                    <Switch 
                        checked={twoFactorEnabled} 
                        onChange={() => setTwoFactorEnabled(!twoFactorEnabled)} 
                    />
                </div>

                {/* Delete Account Section */}
                <div className="flex flex-col items-end gap-1 mt-4">
                    <Button  variant={"danger"} onClick={()=> setOpen(true)}>
                        Delete Account
                    </Button>
                    <p className="text-xs text-gray-400 italic">
                        Warning: Deleting your account is permanent and cannot be undone.
                    </p>
                </div>
            </div>

            {/*Modal*/}
            <Modal
                closeIcon={
                <IconButton variant={"ghost"} size={"small"} shape={"circle"}
                onClick={() => setOpen(false)}
                icon={<X size={24}/>}
                />}
                open={open}
                onClose={() => setOpen(false)}
            >
                <Card
                    size={"small"} variant="outlined" translateY={false}
                    className={"flex flex-col items-center justify-center gap-4 px-4 "}
                >
                    <CardText title="Are you sure you want to delete your  account?" />
                    <div className={"flex justify-between w-full gap-4"}>
                        <Button variant="outlined" size="medium" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button variant="danger" size="medium" onClick={() => setOpen(false)}>Delete Account</Button>
                    </div>
                </Card>
            </Modal>

            {/*
            --- HOW IT WAS MADE & TIPS AND TRICKS ---
            
            1. Layout with Flexbox: 
               - Used `flex flex-col gap-6` for the main container to ensure consistent spacing between rows.
               - Used `flex justify-between items-center/start` for rows to push the action buttons to the right.
            
            2. Typography:
               - Labels use `text-sm font-medium` to distinguish them from the values.
               - Values use `text-gray-600` for a slightly softer look than the labels.
            
            3. Atomic Components:
               - Leveraged the predefined `Card`, `Button`, and `Switch` components to maintain design consistency.
               - `translateY={false}` on `Card` to keep it static as it's a settings pane.
            
            4. State Management:
               - Used `useState` for the 2FA switch to make it interactive.
            
            5. Responsive/Alignment:
               - `max-w-4xl mx-auto` ensures the card doesn't stretch too wide on large screens.
               - Used `items-start` for Email/Password rows because the buttons are taller than a single line of text, which keeps the text aligned to the top.
               - Used `items-center` for the Switch row to keep the label and toggle vertically aligned.
            
            6. Lightweight & Bug-free:
               - No heavy external libraries used beyond React and the existing atomic components.
               - Clean, semantic HTML structure.
            */}
        </Card>
    );
};

export default AccountSettings;
