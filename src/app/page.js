'use client';

import { useState, useEffect } from 'react';
import AllProductsContent from "./components/AllProducts";
import Hero from "./components/Hero";
import PriceDecreased from "./components/PriceDecreased";
import PriceInCreased from "./components/PriceInCreased";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showIntro) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0c833d] flex items-center justify-center">
        <div className="text-center animate-pulse">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-wide drop-shadow-lg">
            বাজার দরে আপনাকে স্বাগতম
          </h1>
          <div className="mt-4 flex justify-center items-center gap-2">
            <span className="w-2.5 h-2.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-2.5 h-2.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-2.5 h-2.5 bg-white rounded-full animate-bounce"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Hero></Hero>
      <PriceInCreased></PriceInCreased>
      <PriceDecreased></PriceDecreased>
      <AllProductsContent></AllProductsContent>
    </div>
  );
}