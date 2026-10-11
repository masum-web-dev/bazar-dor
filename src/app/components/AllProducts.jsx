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

async function AllProductsContent() {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products", {
        cache: "force-cache",
    });
    const products = await res.json();

    return (
        <div id="all-products" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 scroll-mt-8">
            <div className="mb-6">
                <h1 className="text-2xl font-extrabold text-gray-900 mb-1">সব পণ্য</h1>
                <p className="text-sm text-gray-500">
                    মোট <span className="font-bold">{convertToBengaliNumber(products.length)}টি</span> পণ্য দেখানো হচ্ছে
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    products.map(product => {
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
                    })
                }
            </div>
        </div>
    );
}

const AllProducts = () => {
    return (
        <Suspense fallback={<div className="py-8 text-center text-gray-500">লোড হচ্ছে...</div>}>
            <AllProductsContent />
        </Suspense>
    );
};

export default AllProducts;