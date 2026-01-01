import React from 'react';
import Input from "@/components/atomic/Input";
import IconButton from "@/components/atomic/IconButton";
import { Trash, Pencil } from 'lucide-react';

interface SocialMediaLinksProps {
    icon: React.ReactNode;
    value: string;
    onEdit?: () => void;
    onDelete?: () => void;
}

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({
    icon,
    value,
    onEdit,
    onDelete
}) => {
    return (
        <div className="flex items-center gap-4 w-full">
            <div className="text-gray-500">
                {icon}
            </div>
            <div className="flex-grow -my-4">
                <Input
                    value={value}
                    onChange={() => {}}
                    disabled={true}
                    variant="outline"
                    width="w-full"
                />
            </div>
            <div className="flex items-center gap-2">
                <IconButton
                    icon={<Trash size={18} />}
                    onClick={onDelete}
                    variant="ghost"
                    size="small"
                    ariaLabel="Delete"
                />
                <IconButton
                    icon={<Pencil size={18} />}
                    onClick={onEdit}
                    variant="ghost"
                    size="small"
                    ariaLabel="Edit"
                />
            </div>
        </div>
    );
};

export default SocialMediaLinks;
