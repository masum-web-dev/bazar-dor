import Link from "next/link";
import Image from "next/image";

const Hero = () => {
    return (
        <div className="w-full bg-[#f4f7f4] py-8 border-b border-base-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500 mb-6 px-2">
                    <span>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
                    <span>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</span>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
                    <div className="lg:col-span-7 flex flex-col justify-center space-y-4 text-center lg:text-left h-full">
                        <div className="inline-block bg-[#e8f5e9] text-[#0c833d] px-3 py-1 rounded-full text-xs font-semibold w-fit mx-auto lg:mx-0">
                            মঙ্গলবারের বাজার দর
                        </div>
                        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
                            আজকের বাজারের দাম এক নজরে
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600 max-w-xl">
                            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                        </p>
                        <div className="pt-2">
                            <Link 
                                href="/products" 
                                className="inline-flex items-center justify-center bg-[#0c833d] hover:bg-[#0a6c32] text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-sm"
                            >
                                সব পণ্য দেখুন
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-5 flex items-center justify-center">
                        <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 -mt-4 sm:-mt-6">
                            <Image
                                src="/bazar-hero.png"
                                alt="বাজার দর ইলাস্ট্রেশন"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;