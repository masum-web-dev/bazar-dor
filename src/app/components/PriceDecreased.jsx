'use client';

import { Suspense, useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const convertToBengaliNumber = (num) => {
    if (num === undefined || num === null) return "";
    const englishToBengali = {
        '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
        '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯', '.': '.'
    };
    return num.toString().split('').map(char => englishToBengali[char] || char).join('');
};

function PriceDecreasedContent() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        fetch("https://api.abcz.workers.dev/api/bazardor/products", {
            cache: "force-cache",
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleProductClick = (e, productId) => {
        e.preventDefault();
        if (!session) {
            router.push('/sign-in');
            return;
        }
        router.push(`/products/${productId}`);
    };

    if (loading) {
        return <div className="py-8 text-center text-gray-500">লোড হচ্ছে...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex items-center gap-2 mb-6 text-gray-900 font-bold text-lg">
                <span className="text-[#0c833d]">▼</span>
                <span>আজ দাম কমেছে</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    products
                        .filter(product => product.change.dir === 'down')
                        .slice(0, 6)
                        .map(product => (
                            <div 
                                key={product.id}
                                onClick={(e) => handleProductClick(e, product.id)}
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
                                    <div className="bg-[#e8f5e9] text-[#0c833d] px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                                        <span>▼</span>
                                        <span>{convertToBengaliNumber(product.change.pct)}%</span>
                                    </div>
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    );
}

const PriceDecreased = () => {
    return (
        <Suspense fallback={<div className="py-8 text-center text-gray-500">লোড হচ্ছে...</div>}>
            <PriceDecreasedContent />
        </Suspense>
    );
};

export default PriceDecreased;