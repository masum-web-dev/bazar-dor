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

function MarqueeContent() {
    const [marqueeData, setMarqueeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        fetch("https://api.abcz.workers.dev/api/bazardor/products", {
            cache: "force-cache",
        })
            .then(res => res.json())
            .then(data => {
                setMarqueeData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleItemClick = (e, productId) => {
        e.preventDefault();
        if (!session) {
            router.push('/sign-in');
            return;
        }
        router.push(`/products/${productId}`);
    };

    if (loading) {
        return <div className="py-2.5 text-center text-sm opacity-70">Loading...</div>;
    }

    return (
        <div className="w-full bg-base-100 border-b border-base-200 py-2.5 overflow-hidden relative">
            <style>{`
                @keyframes customMarquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-custom-marquee {
                    display: flex;
                    width: max-content;
                    animation: customMarquee 70s linear infinite;
                }
                .animate-custom-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
            <div className="animate-custom-marquee">
                {[...marqueeData, ...marqueeData].map((item, index) => (
                    <div 
                        key={`${item.id}-${index}`} 
                        onClick={(e) => handleItemClick(e, item.id)}
                        className="inline-flex items-center gap-2 px-6 border-r border-base-300 text-sm shrink-0 cursor-pointer group transition-colors"
                    >
                        <span>{item.image || item.categoryIcon || "🛒"}</span>
                        <span className="font-semibold text-base-content group-hover:text-[#0c833d] relative">
                            {item.nameBn}
                            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#0c833d] transition-all duration-300 group-hover:w-full"></span>
                        </span>
                        <span className="text-base-content/70">৳{convertToBengaliNumber(item.today)} টাকা/{item.unit}</span>
                        <span className={`font-bold flex items-center gap-0.5 ${item.change.dir === 'up' ? 'text-error' : 'text-[#0c833d]'}`}>
                            <span>{item.change.dir === 'up' ? '▲' : '▼'}</span>
                            <span>{convertToBengaliNumber(item.change.pct)}%</span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Marque() {
    return (
        <Suspense fallback={<div className="py-2.5 text-center text-sm opacity-70">Loading...</div>}>
            <MarqueeContent />
        </Suspense>
    );
}