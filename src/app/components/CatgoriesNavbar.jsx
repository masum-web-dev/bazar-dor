import { Suspense } from "react";
import Link from "next/link";

async function CategoriesNavbar() {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories", {
        cache: "force-cache",
    });
    const categories = await res.json();

    return (
        <div className="w-full bg-base-100 border-b border-base-200">
            <div className="max-w-7xl mx-auto py-2.5">
                {/* Mobile: Grid with 4 columns, Desktop: Flex row with scrolling */}
                <div className="grid grid-cols-4 sm:flex sm:items-center sm:gap-8 gap-2 sm:overflow-x-auto sm:scrollbar-none">
                    {Array.isArray(categories) && categories.map((item) => (
                        <Link 
                            key={item.id} 
                            href={`/category/${item.slug}`}
                            className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2 p-2 sm:py-1.5 rounded-lg transition-all duration-300 ease-in-out hover:bg-base-200/60 cursor-pointer whitespace-nowrap group text-center sm:text-left"
                        >
                            <span className="text-lg sm:text-base inline-block transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-12 group-hover:scale-110">
                                {item.icon}
                            </span>
                            <span className="text-xs sm:text-sm font-medium transition-colors duration-300 group-hover:text-[#0c833d] truncate w-full sm:w-auto">
                                {item.nameBn}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function CategoryNavbar() {
    return (
        <Suspense fallback={<div className="py-3 px-6 text-sm opacity-70">Loading...</div>}>
            <CategoriesNavbar />
        </Suspense>
    );
}