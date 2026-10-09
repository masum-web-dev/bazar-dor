import { Suspense } from "react";

// ইংরেজি সংখ্যাকে বাংলায় রূপান্তর করার ফাংশন
const convertToBengaliNumber = (num) => {
    if (num === undefined || num === null) return "";
    const englishToBengali = {
        '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
        '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯', '.': '.'
    };
    return num.toString().split('').map(char => englishToBengali[char] || char).join('');
};

async function MarqueeContent() {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products", {
        cache: "force-cache",
    });
    const marqueeData = await res.json();

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
                        className="inline-flex items-center gap-2 px-6 border-r border-base-300 text-sm shrink-0"
                    >
                        <span>{item.image || item.categoryIcon || "🛒"}</span>
                        <span className="font-semibold text-base-content">{item.nameBn}</span>
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