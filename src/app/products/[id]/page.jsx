import { Suspense } from "react";
import Link from "next/link";

const convertToBengaliNumber = (num) => {
    if (num === undefined || num === null) return "";
    const englishToBengali = {
        '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
        '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯', '.': '.'
    };
    return num.toString().split('').map(char => englishToBengali[char] || char).join('');
};

async function ProductDetailsContent({ params }) {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products", {
        cache: "force-cache",
    });
    const products = await res.json();
    
    const product = products.find(item => item.id.toString() === id.toString());

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
                <h1 className="text-xl font-bold text-gray-700">পণ্যটি পাওয়া যায়নি!</h1>
                <Link href="/" className="inline-block mt-4 text-[#0c833d] font-medium underline">
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        );
    }

    const isUp = product.change.dir === 'up';
    const isDown = product.change.dir === 'down';
    const diff = Math.abs(product.today - product.yesterday);

    const markets = product.markets || [];
    let minPrice = product.today;
    let maxPrice = product.today;
    let totalPriceAvg = 0;

    if (markets.length > 0) {
        const mins = markets.map(m => m.min);
        const maxs = markets.map(m => m.max);
        minPrice = Math.min(...mins);
        maxPrice = Math.max(...maxs);
        
        const avgs = markets.map(m => (m.min + m.max) / 2);
        totalPriceAvg = Math.round(avgs.reduce((a, b) => a + b, 0) / markets.length);
    } else {
        totalPriceAvg = product.today;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-6">
                <Link href="/" className="hover:text-gray-900">হোম</Link>
                <span>›</span>
                <span>{product.categoryNameBn}</span>
                <span>›</span>
                <span className="text-gray-900 font-medium">{product.nameBn}</span>
            </div>

            {/* Top Main Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="flex items-center gap-5">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gray-50 flex items-center justify-center text-4xl sm:text-5xl shrink-0 border border-gray-100">
                        {product.image || product.categoryIcon || "🛒"}
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">{product.nameBn}</h1>
                        <p className="text-sm text-gray-500 mb-2">প্রতি {product.unit} · {product.categoryNameBn}</p>
                        <p className="text-xs sm:text-sm text-gray-600">
                            গতকালের তুলনায় আজ দাম{" "}
                            <span className={isUp ? "text-red-600 font-bold" : isDown ? "text-[#0c833d] font-bold" : "text-gray-600 font-bold"}>
                                {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "পরিবর্তন হয়নি"}
                            </span>{" "}
                            - {convertToBengaliNumber(diff)} টাকা
                        </p>
                    </div>
                </div>

                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 sm:p-5 text-center min-w-[180px] w-full lg:w-auto">
                    <p className="text-xs text-gray-500 mb-1">আজকের দাম</p>
                    <p className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">
                        ৳{convertToBengaliNumber(product.today)}
                    </p>
                    <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                        <span>টাকা / {product.unit}</span>
                        <span className={`px-2 py-0.5 rounded-md font-bold flex items-center gap-0.5 ${
                            isUp ? 'bg-red-100 text-red-700' : isDown ? 'bg-emerald-100 text-[#0c833d]' : 'bg-gray-100 text-gray-600'
                        }`}>
                            <span>{isUp ? '▲' : isDown ? '▼' : '—'}</span>
                            <span>{convertToBengaliNumber(product.change.pct)}%</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Price Summary Section */}
            <div className="mb-8">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">দামের সারসংক্ষেপ</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <p className="text-xs text-gray-500 mb-1">সর্বনিম্ন দাম</p>
                        <p className="text-2xl font-bold text-[#0c833d] mb-1">
                            ৳{convertToBengaliNumber(minPrice)} <span className="text-sm font-normal text-gray-600">টাকা</span>
                        </p>
                        <p className="text-xs text-gray-400">সবচেয়ে কম দামের বাজার</p>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <p className="text-xs text-gray-500 mb-1">সর্বাধিক দাম</p>
                        <p className="text-2xl font-bold text-red-600 mb-1">
                            ৳{convertToBengaliNumber(maxPrice)} <span className="text-sm font-normal text-gray-600">টাকা</span>
                        </p>
                        <p className="text-xs text-gray-400">সবচেয়ে বেশি দামের বাজার</p>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <p className="text-xs text-gray-500 mb-1">গড় দাম</p>
                        <p className="text-2xl font-bold text-gray-900 mb-1">
                            ৳{convertToBengaliNumber(totalPriceAvg)} <span className="text-sm font-normal text-gray-600">টাকা</span>
                        </p>
                        <p className="text-xs text-gray-400">প্রতি {product.unit}-এর হিসাবে</p>
                    </div>
                </div>
            </div>

            {/* Market-wise Price Table */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 text-xs sm:text-sm text-gray-500 bg-gray-50/50">
                                <th className="py-4 px-6 font-semibold">বাজার</th>
                                <th className="py-4 px-6 font-semibold">বিভাগ</th>
                                <th className="py-4 px-6 font-semibold">সর্বনিম্ন</th>
                                <th className="py-4 px-6 font-semibold">সর্বাধিক</th>
                                <th className="py-4 px-6 font-semibold">গড়</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {markets.map((m, index) => {
                                const avgMarketPrice = Math.round((m.min + m.max) / 2);
                                return (
                                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 px-6 font-medium text-gray-800">{m.market}</td>
                                        <td className="py-4 px-6 text-gray-600">{m.division}</td>
                                        <td className="py-4 px-6 text-gray-800">{convertToBengaliNumber(m.min)} টাকা</td>
                                        <td className="py-4 px-6 text-gray-800">{convertToBengaliNumber(m.max)} টাকা</td>
                                        <td className="py-4 px-6 font-semibold text-gray-900">{convertToBengaliNumber(avgMarketPrice)} টাকা</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

const ProductDetails = ({ params }) => {
    return (
        <Suspense fallback={<div className="py-12 text-center text-gray-500">লোড হচ্ছে...</div>}>
            <ProductDetailsContent params={params} />
        </Suspense>
    );
};

export default ProductDetails;