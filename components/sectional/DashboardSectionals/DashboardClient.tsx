'use client';

import React, { useEffect, useState } from 'react';
import DashboardPage from "@/components/sectional/DashboardSectionals/DashboardPage";
import MobileDashboardPage from "@/components/sectional/DashboardSectionals/MobileDashboardPage";

// ✅ Responsive hook (avoids rendering both components)
function useIsMobile() {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();

        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return isMobile;
}

const Page = () => {
    const isMobile = useIsMobile();

    // ✅ Single source of truth
    const initialProfile = {
        name: 'Michael Kumah',
        bio: 'Knotted creator',
        role: 'Pro',
    };

    const initialLinks = [
        { id: '1', title: 'Portfolio', url: 'https://alexrivers.design' },
    ];

    // ✅ Reusable + safe API handler
    const handlePublish = async ({ name, bio, links }: any) => {
        try {
            const res = await fetch('/api/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // ✅ FIXED
                },
                body: JSON.stringify({ name, bio, links }),
            });

            if (!res.ok) {
                throw new Error('Failed to publish profile');
            }
        } catch (error) {
            console.error('Publish error:', error);
        }
    };

    // ✅ Prevent hydration mismatch flicker
    if (isMobile === null) return null;

    return (
        <div>
            {isMobile ? (
                <MobileDashboardPage
                    initialProfile={initialProfile}
                    initialLinks={initialLinks}
                    username="alexrivers"
                    onPublish={handlePublish}
                />
            ) : (
                <DashboardPage
                    initialProfile={initialProfile}
                    initialLinks={initialLinks}
                    username="alexrivers"
                    onPublish={handlePublish}
                />
            )}
        </div>
    );
};

export default Page;