import React from 'react';

interface UserFooterProps {
    userNames?:string;
}

const UserFooter:React.FC<UserFooterProps> = (
    {
       userNames
    }
) => {
    return (
        <footer className={"flex flex-col justify-center font-body items-center gap-2 text-sm text-gray-500"}>
            <span>
                &copy;
                {new Date().getFullYear()}
                {userNames}
            </span>
            <span>Powered by Knotted</span>
        </footer>
    );
};

export default UserFooter;
