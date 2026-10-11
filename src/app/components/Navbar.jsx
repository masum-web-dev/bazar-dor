"use client";

import { useSession, signOut } from "@/lib/auth-client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NavBar() {
    const [currentDate, setCurrentDate] = useState("");
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Dhaka' };
        const dateStr = new Intl.DateTimeFormat('bn-BD', options).format(new Date());
        setCurrentDate(dateStr);
    }, []);

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in");
                },
            },
        });
    };

    const userName = session?.user?.name || "User";
    const userEmail = session?.user?.email || "";
    const userInitial = userName.charAt(0).toUpperCase();

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
                    {session ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-stone-50 transition cursor-pointer">
                                <div className="w-9 h-9 rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                                    {userInitial}
                                </div>
                                <span className="text-sm font-semibold text-stone-800">{userName}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            <div tabIndex={0} className="dropdown-content z-[1] menu p-4 shadow-xl bg-white rounded-3xl w-72 mt-3 border border-stone-100 space-y-3">
                                <div className="px-3 py-2 border-b border-stone-100">
                                    <p className="font-bold text-stone-900 text-base">{userName}</p>
                                    <p className="text-xs text-stone-500 truncate">{userEmail}</p>
                                </div>
                                <div className="space-y-1">
                                    <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-stone-50 text-stone-700 font-medium transition text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        আমার প্রোফাইল
                                    </Link>
                                    <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-red-600 font-medium transition text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                        সাইন আউট
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}