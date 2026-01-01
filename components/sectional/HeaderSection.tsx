import React from 'react';
import Navbar from "@/components/molecular/Navbar";
import Button from "@/components/atomic/Button";

const HeaderSection = () => {
    return (
        <>
                <Navbar>
                    {/*    navigation goes here*/}
                    <nav >
                        <ul className="flex flex-col md:flex-row gap-4 font-body text-sm text-gray-500">
                            <Button
                                variant="ghost"
                                size="medium"
                            >
                                Pricing
                            </Button>
                            <Button
                                variant="ghost"
                                size="medium"
                            >
                                Features
                            </Button>
                            <Button
                                variant="outlined"
                                size="medium"
                            >
                                Login
                            </Button>
                        </ul>
                    </nav>
                </Navbar>

        </>
    );
};

export default HeaderSection;
