import React, {useState} from 'react';
import {GripVertical, Pencil, Trash} from 'lucide-react';
import Card from "@/components/atomic/Card";
import IconButton from "@/components/atomic/IconButton";
import Switch from "@/components/atomic/Switch";

interface EditLinkCardProps {
    linkName?:string;
    linkType?:string | React.ReactNode;
    icon?:React.ReactNode;
}

const EditLinkCard:React.FC<EditLinkCardProps> = (
    {
        linkName,
        linkType,
        icon
    }
) => {
    const [checked, setChecked] = useState(false)
    // Handle switch change
    const handleToggle = () => {
        setChecked(prev => !prev);
    };

    return (

            <Card
                className="min-w-[500px] flex gap-4 font-body  items-center justify-start "
            >
            {/*    link drag icons*/}
                <div>
                    <IconButton icon={<GripVertical/>} size={"small"} shape={"square"} variant={"ghost"}/>
                </div>
                {/*    link drag icons*/}
                <div className={"flex md:flex-row flex-col gap-2 w-full  justify-between"}>
                    <div className={"flex justify-between items-center gap-2 w-full"}>
                        {/* Link type Icon*/}
                        <IconButton icon={icon} size={"small"} shape={"square"} variant={"ghost"}/>
                        {/*    icon Name*/}
                        <div className="flex grow justify-center items-center gap-6">
                            <p className={"text-sm"}>{linkName}</p>
                            <span className={"text-sm"}>{linkType}</span>
                        </div>
                    </div>
                    <div className="flex justify-center  items-center  gap-2">
                        {/*    Disable link toggle*/}
                        <Switch checked={checked} size={"md"} onChange={handleToggle} />
                        {/*    Edit links buttons*/}
                        <div className="flex  gap-2">
                            <IconButton icon={<Pencil />} size={"small"} shape={"square"} variant={"secondary"}/>
                            <IconButton icon={<Trash />} size={"small"} shape={"square"} variant={"secondary"}/>
                        </div>
                    </div>
                </div>

            </Card>

    );
};

export default EditLinkCard;
