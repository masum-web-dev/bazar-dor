'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0c833d] flex items-center justify-center p-6 text-white font-sans">
            <div className="text-center max-w-xl mx-auto space-y-6 animate-fade-in">
                {/* অ্যানিমেটেড 404 নাম্বার */}
                <h1 className="text-8xl sm:text-9xl font-extrabold tracking-widest drop-shadow-2xl animate-pulse">
                    ৪০৪
                </h1>

                {/* বার্তা */}
                <div className="space-y-2">
                    আপনি ভুল ঠিকানায় চলে এসেছেন।
                </div>

                <p className="text-lg text-green-100 font-medium">
                    দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা পাওয়া যায়নি বা সরিয়ে ফেলা হয়েছে।
                </p>

                {/* হোমপেজে ফেরার মডার্ন বাটন */}
                <div className="pt-4">
                    <Link 
                        href="/" 
                        className="inline-block bg-white text-[#0c833d] font-bold px-8 py-4 rounded-2xl shadow-xl hover:bg-green-50 hover:scale-105 transition-all duration-300"
                    >
                        ← হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </div>
    );
}