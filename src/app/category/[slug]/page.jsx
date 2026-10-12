'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Suspense } from 'react';

// বাংলা সংখ্যা কনভার্ট করার ফাংশন
const convertToBengaliNumber = (num) => {
    if (num === undefined || num === null) return "";
    const englishToBengali = {
        '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
        '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯', '.': '.'
    };
    return num.toString().split('').map(char => englishToBengali[char] || char).join('');
};

function CategoryContent({ params }) {
    const resolvedParams = React.use(params);
    const slug = resolvedParams?.slug;

    const [sortBy, setSortBy] = useState('default');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [catRes, prodRes] = await Promise.all([
                    fetch("https://api.abcz.workers.dev/api/bazardor/categories"),
                    fetch("https://api.abcz.workers.dev/api/bazardor/products")
                ]);
                const catData = await catRes.json();
                const prodData = await prodRes.json();
                
                setCategories(catData);
                setProducts(prodData);
            } catch (err) {
                console.error("Data fetch error:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <div className="py-12 text-center text-gray-500">লোড হচ্ছে...</div>;
    }

    const currentCategory = categories.find(c => c.slug === slug);
    const categoryProducts = products.filter(p => p.category === slug);

    const categoryNameBn = currentCategory ? currentCategory.nameBn : slug;
    const categoryIcon = currentCategory ? currentCategory.icon : "🛒";

    // নিউমেরিক ভ্যালু অনুযায়ী শর্টিং লজিক
    const sortedProducts = [...categoryProducts].sort((a, b) => {
        const priceA = Number(a.today) || 0;
        const priceB = Number(b.today) || 0;

        if (sortBy === 'low-to-high') {
            return priceA - priceB;
        } else if (sortBy === 'high-to-low') {
            return priceB - priceA;
        }
        return 0; // ডিফল্ট
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-8 flex items-center gap-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gray-50 flex items-center justify-center text-4xl sm:text-5xl shrink-0 border border-gray-100">
                    {categoryIcon}
                </div>
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
                        {categoryNameBn}
                    </h1>
                    <p className="text-sm text-gray-500">
                        {convertToBengaliNumber(categoryProducts.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    মোট <span className="font-bold text-gray-800">{convertToBengaliNumber(categoryProducts.length)}টি</span> পণ্য দেখানো হচ্ছে
                </p>
                
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-600">সাজান</span>
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-green-600 cursor-pointer"
                        >
                            <option value="default">ডিফল্ট</option>
                            <option value="low-to-high">দাম: কম থেকে বেশি</option>
                            <option value="high-to-low">দাম: বেশি থেকে কম</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map(product => {
                    const isUp = product.change.dir === 'up';
                    const isDown = product.change.dir === 'down';
                    
                    return (
                        <Link 
                            key={product.id}
                            href={`/products/${product.id}`}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md cursor-pointer"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl shrink-0">
                                    {product.image || product.categoryIcon || "🛒"}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-base">{product.nameBn}</h3>
                                    <p className="text-xs text-gray-500">প্রতি {product.unit}</p>
                                </div>
                            </div>
                            <div className="flex items-end justify-between pt-2 border-t border-gray-50">
                                <div>
                                    <p className="text-xs text-gray-500 mb-0.5">আজকের দাম</p>
                                    <p className="text-xl font-extrabold text-gray-900">
                                        ৳{convertToBengaliNumber(product.today)} <span className="text-xs font-normal text-gray-600">টাকা</span>
                                    </p>
                                </div>
                                <div className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
                                    isUp 
                                        ? 'bg-red-100 text-red-700' 
                                        : isDown 
                                        ? 'bg-[#e8f5e9] text-[#0c833d]' 
                                        : 'bg-gray-100 text-gray-600'
                                }`}>
                                    <span>{isUp ? '▲' : isDown ? '▼' : '—'}</span>
                                    <span>{convertToBengaliNumber(product.change.pct)}%</span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default function SingleCategory({ params }) {
    return (
        <Suspense fallback={<div className="py-12 text-center text-gray-500">লোড হচ্ছে...</div>}>
            <CategoryContent params={params} />
        </Suspense>
    );
}