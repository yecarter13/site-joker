"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const images = [
  "/siege.webp",
  "/siege1.webp",
  "/siege2.webp",
  "/siege3.webp",
  "/siege4.webp",
  "/siege5.webp",
  "/siege6.webp",
  "/siege7.webp",
];

export default function SiegeSection() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), []);

  useEffect(() => {
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="relative py-16 md:py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Nos <span className="text-red-400">sièges</span>
        </h2>
        <p className="text-gray-400 mt-2">Découvrez nos différents espaces</p>
      </div>
      <div className="relative max-w-5xl mx-auto px-4">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
          {images.map((src, i) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={src}
                alt={`Siège ${i + 1}`}
                fill
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
        >
          <HiChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
        >
          <HiChevronRight size={20} />
        </button>
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                i === current ? "bg-red-400 w-6" : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
