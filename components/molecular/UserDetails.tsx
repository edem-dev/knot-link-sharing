import React from 'react';
import Card from "@/components/atomic/Card";
import CardText from "@/components/atomic/CardText";
import Avatar from "@/components/atomic/Avatar";
import IconButton from "@/components/atomic/IconButton";
import {Facebook, Globe, Instagram, Youtube} from "lucide-react";

const UserDetails = () => {
    return (
        <div>
            {/*Profile and bio card starts here*/}
            <Card
                variant={'ghost'}
                translateY={false}
                className={"flex flex-col items-center justify-center gap-4"}
            >
                <Avatar
                    name={"Jane Doe"}
                    size={"xl"}
                    className={"mx-auto"}
                />
                <CardText
                    title={"Jane Doe"}
                    subtitle={`Artist, designer, and content creator 
                sharing my latest projects and favorite tools. 
                Follow my journey!`  }
                    center={true}
                />

                <div className="flex justify-center gap-2">
                    <IconButton
                        icon={ <Instagram/>}
                        variant={"ghost"}
                        size={"small"}
                        shape={"square"}
                        onClick={() => window.open("https://instagram.com", "_blank", "noopener,noreferrer")}
                    />
                    <IconButton
                        icon={<Globe />
                        }
                        variant={"ghost"}
                        size={"small"}
                        shape={"square"}
                        onClick={() => window.open("https://example.com", "_blank", "noopener,noreferrer")}
                    />
                    <IconButton
                        icon={<Facebook/>}
                        variant={"ghost"}
                        size={"small"}
                        shape={"square"}
                        onClick={() => window.open("https://facebook.com", "_blank", "noopener,noreferrer")}
                    />
                    <IconButton
                        icon={ <Youtube/>}
                        variant={"ghost"}
                        size={"small"}
                        shape={"square"}
                        onClick={() => window.open("https://youtube.com", "_blank", "noopener,noreferrer")}
                    />
                </div>
            </Card>
            {/*    Profile and bio card ends here*/}
        </div>
    );
};

export default UserDetails;
