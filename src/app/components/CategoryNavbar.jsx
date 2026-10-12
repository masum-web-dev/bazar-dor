'use client';

import { Suspense, useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

function CategoriesList() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        fetch("https://api.abcz.workers.dev/api/bazardor/categories", {
            cache: "force-cache",
        })
            .then(res => res.json())
            .then(data => {
                setCategories(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleCategoryClick = (e, slug) => {
        e.preventDefault();
        if (!session) {
            router.push('/sign-in');
            return;
        }
        router.push(`/category/${slug}`);
    };

    if (loading) {
        return <div className="py-3 px-6 text-sm opacity-70 text-center">Loading...</div>;
    }

    return (
        <div className="w-full bg-base-100 border-b border-base-200">
            <div className="max-w-7xl mx-auto py-2.5">
                <div className="grid grid-cols-4 sm:flex sm:items-center sm:gap-8 gap-2 sm:overflow-x-auto sm:scrollbar-none">
                    {Array.isArray(categories) && categories.map((item) => (
                        <div
                            key={item.id}
                            onClick={(e) => handleCategoryClick(e, item.slug)}
                            className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2 p-2 sm:py-1.5 rounded-lg transition-all duration-300 ease-in-out hover:bg-base-200/60 cursor-pointer whitespace-nowrap group text-center sm:text-left"
                        >
                            <span className="text-lg sm:text-base inline-block transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-12 group-hover:scale-110">
                                {item.icon}
                            </span>
                            <span className="text-xs sm:text-sm font-medium transition-colors duration-300 group-hover:text-[#0c833d] truncate w-full sm:w-auto">
                                {item.nameBn}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function CategoryNavbar() {
    return (
        <Suspense fallback={<div className="py-3 px-6 text-sm opacity-70">Loading...</div>}>
            <CategoriesList />
        </Suspense>
    );
}