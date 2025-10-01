"use client";
import { useState } from "react";
import Image from "next/image";

export default function Carousel({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  if (!images?.length) return null;

  return (
    <div>
      {/* Main Image */}
      <div className="relative w-full h-[420px] rounded-lg border border-gray-200 bg-white shadow-sm">
        <Image
          src={images[idx]}
          alt={`image-${idx}`}
          fill
          className="object-contain p-2"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
        />
      </div>

      {/* Thumbnails */}
      <div className="mt-4 flex gap-3 overflow-x-auto">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`relative h-20 w-24 flex-shrink-0 rounded-md border ${
              idx === i
                ? "border-2 border-black"
                : "border border-gray-300 hover:border-gray-400"
            }`}
          >
            <Image
              src={src}
              alt={`thumb-${i}`}
              fill
              className="object-cover rounded-md"
              sizes="100px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
