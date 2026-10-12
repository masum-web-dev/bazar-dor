'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function ProfilePage() {
    const { data: session, isPending, refetch } = useSession();
    const router = useRouter();
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (session?.user?.name) {
            setName(session.user.name);
        }
    }, [session]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const { data, error } = await authClient.updateUser({
                name: name,
            });

            if (error) {
                setErrorMessage(error.message || 'নাম আপডেট করতে সমস্যা হয়েছে');
            } else {
                setSuccessMessage('তথ্য সফলভাবে আপডেট করা হয়েছে!');
                if (refetch) {
                    await refetch();
                }
                router.refresh();
            }
        } catch (err) {
            console.error('Update Error:', err);
            setErrorMessage('কোথাও কোনো সমস্যা হয়েছে, আবার চেষ্টা করুন।');
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/sign-in');
                },
            },
        });
    };

    if (isPending) {
        return <div className="min-h-screen flex items-center justify-center">লোড হচ্ছে...</div>;
    }

    const currentName = session?.user?.name || 'ব্যবহারকারী';
    const userEmail = session?.user?.email || '';
    const userInitial = currentName.charAt(0).toUpperCase();

    return (
        <div className="min-h-screen bg-stone-50 py-10 px-4 font-sans flex flex-col items-center">
            <div className="w-full max-w-3xl space-y-6">
                
                <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm">
                    <h1 className="text-2xl font-bold text-stone-900 mb-1">আমার প্রোফাইল</h1>
                    <p className="text-sm text-stone-500 mb-6">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

                    <div className="flex items-center justify-between p-4 rounded-2xl border border-stone-100 bg-stone-50/50">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-green-700 text-white flex items-center justify-center text-xl font-bold shadow-md">
                                {userInitial}
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-stone-900">{currentName}</h2>
                                <p className="text-sm text-stone-500">{userEmail}</p>
                            </div>
                        </div>

                        <button 
                            onClick={handleSignOut}
                            className="flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-sm font-medium transition duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            সাইন আউট
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm">
                    <h2 className="text-xl font-bold text-stone-900 mb-6">তথ্য</h2>

                    {successMessage && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm">
                            {successMessage}
                        </div>
                    )}

                    {errorMessage && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-stone-700">নাম</label>
                            <input 
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-stone-800"
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-[#0c833d] hover:bg-[#0a6c32] text-white font-semibold py-3.5 rounded-xl transition duration-200 shadow-md disabled:opacity-50"
                        >
                            {loading ? 'প্রসেসিং হচ্ছে...' : 'আপডেট'}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}