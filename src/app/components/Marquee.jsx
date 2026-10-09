import { Suspense } from "react";

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
                        <span className="text-base-content/70">৳{item.today} টাকা/{item.unit}</span>
                        <span className={`font-bold flex items-center gap-0.5 ${item.change.dir === 'up' ? 'text-success' : 'text-error'}`}>
                            <span>{item.change.dir === 'up' ? '▲' : '▼'}</span>
                            <span>{item.change.pct}%</span>
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