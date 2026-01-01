'use client'
import React, {useState} from 'react';
import {Menu, X} from 'lucide-react';
import Image from "next/image";
import IconButton from "@/components/atomic/IconButton";

interface NavbarProps {
    children?: React.ReactNode;
}

const Navbar = ({children}: NavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className=" w-full bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-2">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                        {/* The logo goes here*/}
                            <Image
                                width={100}
                                height={100}
                                src={`/Image/knotted-logo.svg`}
                                alt={"Knotted logo"}/>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center space-x-4">
                            {children}
                        </div>
                    </div>
                    {/*Toggles the hamburger menu icon on mobile */}
                    <div className="md:hidden">
                        { children &&
                        <IconButton
                            shape={"square"}
                            icon={isOpen ? <X size={24}/> : <Menu size={24}/>}
                            variant="ghost"
                            onClick={() => setIsOpen(!isOpen)}
                        />
                        }
                    </div>
                </div>
            </div>
            {/*The hamburger menu on mobile*/}
            {isOpen && (
                <div className="md:hidden ">
                    <div className=" px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {children}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
