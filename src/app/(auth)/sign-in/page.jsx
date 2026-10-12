'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth-client';
import { createAuthClient } from "better-auth/client";
import toast from 'react-hot-toast';

const authClient = createAuthClient();

const SignInPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            // fetchResponse: true ব্যবহার করে রেসপন্স হ্যান্ডেল করা হলো যাতে ডাবল টোস্ট না ওঠে
            const { data, error } = await signIn.email({
                email,
                password,
            }, {
                onRequest: () => {
                    // লডিং স্টেট বা রিকোয়েস্ট শুরু হলে এখানে হ্যান্ডেল করা যায়
                },
                onSuccess: () => {
                    toast.dismiss(); // আগের যেকোনো টোস্ট ক্লিয়ার করে দিবে
                    toast.success('সাইন ইন সফল হয়েছে!');
                    setTimeout(() => {
                        router.push('/');
                    }, 1000);
                },
                onError: (ctx) => {
                    const errorMsg = ctx.error.message || "সাইন ইন করতে সমস্যা হয়েছে";
                    setErrorMessage(errorMsg);
                    toast.dismiss();
                    toast.error(errorMsg);
                }
            });

            if (error) {
                setErrorMessage(error.message || "সাইন ইন করতে সমস্যা হয়েছে");
            }
        } catch (err) {
            console.error("Catch Error:", err);
            setErrorMessage("কোথাও কোনো সমস্যা হয়েছে, আবার চেষ্টা করুন।");
            toast.error("কোথাও কোনো সমস্যা হয়েছে, আবার চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (err) {
            console.error("Google Sign-In Error:", err);
            setErrorMessage("গুগল দিয়ে সাইন ইন করতে সমস্যা হয়েছে।");
            toast.error("গুগল দিয়ে সাইন ইন করতে সমস্যা হয়েছে।");
        }
    };

    const handleGithubSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
            });
        } catch (err) {
            console.error("GitHub Sign-In Error:", err);
            setErrorMessage("গিথাব দিয়ে সাইন ইন করতে সমস্যা হয়েছে।");
            toast.error("গিথাব দিয়ে সাইন ইন করতে সমস্যা হয়েছে।");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center font-sans bg-stone-50 p-6">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-sm border border-stone-100 p-10">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-stone-950 mb-2">সাইন ইন</h1>
                    <p className="text-base text-stone-600">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
                </div>

                {errorMessage && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm text-center">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
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
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3.5 rounded-xl transition duration-200 disabled:opacity-50"
                    >
                        {loading ? 'প্রসেসিং হচ্ছে...' : 'সাইন ইন'}
                    </button>
                </form>

                <div className="relative flex items-center my-6">
                    <div className="flex-grow border-t border-stone-200"></div>
                    <span className="flex-shrink mx-4 text-sm text-stone-500 bg-white px-2">অথবা</span>
                    <div className="flex-grow border-t border-stone-200"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="flex items-center justify-center gap-3 w-full border border-stone-200 hover:bg-stone-50 py-3 rounded-xl transition duration-200"
                    >
                        <img src="https://authjs.dev/img/providers/google.svg" alt="Google" className="h-5 w-5" />
                        <span className="text-sm font-medium text-stone-800">Google দিয়ে চালিয়ে যান</span>
                    </button>
                    
                    <button 
                        type="button"
                        onClick={handleGithubSignIn}
                        className="flex items-center justify-center gap-3 w-full border border-stone-200 hover:bg-stone-50 py-3 rounded-xl transition duration-200"
                    >
                        <img src="https://authjs.dev/img/providers/github.svg" alt="GitHub" className="h-5 w-5" />
                        <span className="text-sm font-medium text-stone-800">GitHub দিয়ে চালিয়ে যান</span>
                    </button>
                </div>

                <div className="text-center mt-8 text-sm text-stone-600">
                    অ্যাকাউন্ট নেই?{' '}
                    <Link href="/sign-up" className="text-green-700 font-medium hover:underline">
                        সাইন আপ করুন
                    </Link>
                </div>
            </div>

            <Link href="/" className="mt-6 text-sm text-stone-500 hover:text-stone-800 hover:underline">
                ← হোম পেজে ফিরে যান
            </Link>
        </div>
    );
};

export default SignInPage;