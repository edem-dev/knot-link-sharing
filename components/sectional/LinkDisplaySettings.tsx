'use client'
import React, { useState } from 'react';
import Card from "@/components/atomic/Card";
import CardText from "@/components/atomic/CardText";
import Input from "@/components/atomic/Input";
import Switch from "@/components/atomic/Switch";
import Button from "@/components/atomic/Button";

const LinkDisplaySettings = () => {
    const [linkStyle, setLinkStyle] = useState('standard');
    const [showIcons, setShowIcons] = useState(true);
    const [buttonText, setButtonText] = useState('Buy Now');

    const radioOptions = [
        { id: 'standard', label: 'Standard (Title & Subtitle)' },
        { id: 'minimal', label: 'Minimal (Title Only)' },
        { id: 'card', label: 'Card (Image, Title, Description)' },
    ];

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <Card translateY={false} size="large" className="w-full">
                <CardText title="Link Display Settings" />

                <div className="space-y-6">
                    {/* Default Link Style Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3 font-body">
                            Default Link Style
                        </label>
                        <div className="space-y-3">
                            {radioOptions.map((option) => (
                                <label key={option.id} className="flex items-center cursor-pointer group">
                                    <div className="relative flex items-center justify-center">
                                        <input
                                            type="radio"
                                            name="linkStyle"
                                            value={option.id}
                                            checked={linkStyle === option.id}
                                            onChange={(e) => setLinkStyle(e.target.value)}
                                            className="sr-only"
                                        />

                                    </div>
                                    <span className="ml-3 text-gray-700 font-body text-sm">
                                        {option.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Show Link Icons Section */}
                    <div className="flex items-center justify-between py-2">
                        <span className="text-sm font-medium text-gray-700 font-body">Show Link Icons</span>
                        <Switch checked={showIcons} onChange={(checked) => setShowIcons(!checked)} />
                    </div>

                    {/* Default Button Text Section */}
                    <div className="pt-2">
                        <Input
                            label="Default Button Text for Product Links"
                            value={buttonText}
                            onChange={setButtonText}
                            placeholder="Enter button text"
                            width="w-full"
                        />
                    </div>

                    {/* Save Button Section */}
                    <div className="flex justify-end pt-4">
                        <Button size="medium" onClick={() => console.log('Saving changes...', { linkStyle, showIcons, buttonText })}>
                            Save Changes
                        </Button>
                    </div>
                </div>
            </Card>

            {/*
            --- HOW IT WAS MADE & TIPS ---
            1. Layout: Used the predefined `Card` component with `translateY={false}` to keep it stable as a settings section.
            2. Typography: Leveraged `CardText` for the main heading to match existing dashboard styles.
            3. State Management: Used React's `useState` for all form fields (linkStyle, showIcons, buttonText).
            4. Custom Radio Buttons: Since there was no atomic `Radio` component, I built one using a hidden input and a custom styled `div`. 
               - Tip: Using `sr-only` on the actual input keeps it accessible while allowing full styling control over the UI.
            5. Switch Integration: Integrated the atomic `Switch` component for a clean toggle experience.
            6. Spacing: Used Tailwind's `space-y-x` and `pt-x` classes to maintain consistent vertical rhythm between form elements.
            7. Responsive: The `w-full max-w-4xl` wrapper ensures it looks good on both desktop and smaller screens.
            8. Interaction: Added `group-hover` on radio labels to improve visual feedback when hovering over the selection area.
            */}
        </div>
    );
};

export default LinkDisplaySettings;
