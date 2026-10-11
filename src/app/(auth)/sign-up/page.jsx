'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/auth-client';

const SignUpPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (password !== confirmPassword) {
            setErrorMessage('পাসওয়ার্ড দুটি মিলছে না!');
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await signUp.email({
                name,
                email,
                password,
                callbackURL: "/sign-in",
            });

            console.log("Signup Response Data:", data);
            console.log("Signup Error Data:", error);

            if (error) {
                setErrorMessage(error.message || "সাইন আপ করতে সমস্যা হয়েছে");
            } else {
                console.log("User successfully created and sent to MongoDB via Better Auth!");
                router.push('/sign-in');
            }
        } catch (err) {
            console.error("Catch Error:", err);
            setErrorMessage("কোথাও কোনো সমস্যা হয়েছে, আবার চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center font-sans bg-stone-50 p-6">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-sm border border-stone-100 p-10">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-stone-950 mb-2">অ্যাকাউন্ট তৈরি করুন</h1>
                    <p className="text-base text-stone-600">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
                </div>

                {errorMessage && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm text-center">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-stone-700">নাম</label>
                        <input 
                            id="name"
                            name="name"
                            type="text" 
                            placeholder="যেমন: রহিম উদ্দিন" 
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent placeholder:text-stone-400"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-stone-700">ইমেইল</label>
                        <input 
                            id="email"
                            name="email"
                            type="email" 
                            placeholder="you@example.com" 
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent placeholder:text-stone-400"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-stone-700">পাসওয়ার্ড</label>
                        <div className="relative">
                            <input 
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"} 
                                placeholder="কমপক্ষে ৮ অক্ষর" 
                                className="w-full px-4 py-3 pr-12 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent placeholder:text-stone-400"
                                required
                                minLength={8}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-800 text-sm focus:outline-none"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-stone-700">পাসওয়ার্ড নিশ্চিত করুন</label>
                        <div className="relative">
                            <input 
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"} 
                                placeholder="আবার লিখুন" 
                                className="w-full px-4 py-3 pr-12 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent placeholder:text-stone-400"
                                required
                                minLength={8}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-800 text-sm focus:outline-none"
                            >
                                {showConfirmPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3.5 rounded-xl transition duration-200 disabled:opacity-50"
                    >
                        {loading ? 'প্রসেসিং হচ্ছে...' : 'অ্যাকাউন্ট তৈরি করুন'}
                    </button>
                </form>

                <div className="relative flex items-center my-6">
                    <div className="flex-grow border-t border-stone-200"></div>
                    <span className="flex-shrink mx-4 text-sm text-stone-500 bg-white px-2">অথবা</span>
                    <div className="flex-grow border-t border-stone-200"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-3 w-full border border-stone-200 hover:bg-stone-50 py-3 rounded-xl transition duration-200">
                        <img src="https://authjs.dev/img/providers/google.svg" alt="Google" className="h-5 w-5" />
                        <span className="text-sm font-medium text-stone-800">Google দিয়ে চালিয়ে যান</span>
                    </button>
                    
                    <button className="flex items-center justify-center gap-3 w-full border border-stone-200 hover:bg-stone-50 py-3 rounded-xl transition duration-200">
                        <img src="https://authjs.dev/img/providers/github.svg" alt="GitHub" className="h-5 w-5" />
                        <span className="text-sm font-medium text-stone-800">GitHub দিয়ে চালিয়ে যান</span>
                    </button>
                </div>

                <div className="text-center mt-8 text-sm text-stone-600">
                    অ্যাকাউন্ট আছে?{' '}
                    <Link href="/sign-in" className="text-green-700 font-medium hover:underline">
                        সাইন ইন করুন
                    </Link>
                </div>
            </div>

            <Link href="/" className="mt-6 text-sm text-stone-500 hover:text-stone-800 hover:underline">
                ← হোম পেজে ফিরে যান
            </Link>
        </div>
    );
};

export default SignUpPage;