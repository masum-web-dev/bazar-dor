"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function NavBar() {
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Dhaka' };
        const dateStr = new Intl.DateTimeFormat('bn-BD', options).format(new Date());
        setCurrentDate(dateStr);
    }, []);

    return (
        <header className="w-full bg-base-100 border-b border-base-200 px-6 py-3 shadow-xs">
            <div className="grid grid-cols-2 lg:grid-cols-3 items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-3 justify-start">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md" style={{ backgroundColor: "#0c833d" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <div>
                        <Link href="/" className="text-xl font-bold tracking-wide">
                            বাজার দর
                        </Link>
                        <p className="text-xs opacity-70">
                            {currentDate}
                        </p>
                    </div>
                </div>

                <div className="hidden lg:flex justify-center">
                </div>

                <div className="flex items-center justify-end gap-3">
                    <Link href="/sign-in">
                        <button className="btn btn-ghost btn-sm font-medium">
                            সাইন ইন
                        </button>
                    </Link>
                    <Link href="/sign-up">
                        <button className="btn btn-sm text-white shadow-md" style={{ backgroundColor: "#0c833d" }}>
                            সাইন আপ
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
}