import React from 'react';
import NewsLetter from '@/styles/NewsLetter';

const FooterSection: React.FC = () => {
  return (
    <div className="pt-16 pb-8  bg-secondary">
      <NewsLetter />

      <div className="w-[90vw] mx-auto mt-8 text-sm text-gray-700 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="order-2 md:order-1">© {new Date().getFullYear()} Knotted. All rights reserved.</p>
        <div className="order-1 md:order-2 flex items-center gap-4">
          <a href="#privacy" className="hover:underline">Privacy</a>
          <a href="#terms" className="hover:underline">Terms</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
