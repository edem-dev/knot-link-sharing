import React from 'react';

interface PhoneWrapperProps {
    children: React.ReactNode;
}

const PhoneWrapper: React.FC<PhoneWrapperProps> = ({
                                                       children
                                                   }) => {
    return (
        <div className="relative md:mt-16 mt-0 w-[300px] h-[590px] border-4 border-gray-900 rounded-[40px] bg-white">
            {/* Notch */}
            <div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[25px] bg-black rounded-b-[14px] z-10"
            />

            {/* Content Area */}
            <div
                className="absolute inset-0 mt-[44px] py-4 px-6 overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-0 scrollbar-track-gray-0 pointer-events-auto select-auto"
            >
                {/* Demo content if no children */}
                {children}
            </div>

            {/* Home Indicator */}
            <div
                className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[120px] h-1 bg-gray-900 rounded-full"
            />
        </div>
    );
};

export default PhoneWrapper;