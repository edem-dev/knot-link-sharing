'use client'
import React from 'react';
import Link from '@/components/atomic/Links';


const FooterSection = () => {
    return (
        <section className="w-full bg-background border-t border-gray-200 py-8 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col items-center md:items-start gap-4">
                    <h3 className="text-xl font-headings font-bold text-primary">Knotted</h3>
                    <div className="font-body flex flex-col md:flex-row items-center gap-4">
                        <Link external={true} href="/terms">Terms of Service</Link>
                        <Link external={true} href="/privacy">Privacy Policy</Link>
                        <Link external={true} href="/help">Help Center</Link>
                    </div>
                </div>
                <div className="text-sm text-gray-500 text-center md:text-right">
                    <p>&copy; 2025 </p>
                    <p>All rights reserved</p>
                </div>
            </div>
        </section>
    );
};

export default FooterSection;
