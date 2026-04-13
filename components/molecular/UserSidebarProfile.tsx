'use client'
import React from 'react';
import Avatar from "@/components/atomic/Avatar";

export interface UserSidebarProfileProps {
    name:string;
    role:string;
    avatarSrc?:string;
    className?:string;
}

const UserSidebarProfile:React.FC<UserSidebarProfileProps> = ({
    name,
    role,
    avatarSrc,
    className = '',
}) => {
    return (
        <div
            className={[
                'flex flex-row items-center gap-2',
                'py-3 px-3 rounded-2xl bg-slate-50 dark:bg-slate-800',
                className,
            ].join(' ')}
        >
        {/*Avatar"-----------------------------------------*/}
            <Avatar
                name={name}
                src={avatarSrc}
                alt={name}
                size={"sm"}
            />

        {/*    Name + role  -----------------------------------*/}
            <div className={"min-w-0"}>
                <p className={"text-sm font-display font-semibold text-slate-900 dark:text-white truncate"}>
                    {name}
                </p>
                <p className={"text-xs font-body text-slate-400 dark:text-slate-400 truncate"}>
                    {role}
                </p>
            </div>
        </div>
    );
};

export default UserSidebarProfile;
