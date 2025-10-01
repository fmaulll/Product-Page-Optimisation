"use client";

import { Product } from "@/types/products";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductList({
  products,
  categories,
}: {
  products: Product[];
  categories: string[];
}) {
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const filtered = [...products]
    .filter((p) => (category === "all" ? true : p.category === category))
    .sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));

  return (
    <div className="space-y-8">
      {/* Filter Bar */}
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-4 rounded-xl border border-gray-200 bg-white shadow-md p-4">
        <label className="flex items-center gap-2 text-sm font-medium">
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-black focus:outline-none"
          >
            <option value="all">All</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm font-medium">
          Sort
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-black focus:outline-none"
          >
            <option value="asc">Price: Low → High</option>
            <option value="desc">Price: High → Low</option>
          </select>
        </label>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((p) => (
          <Link key={p.id} href={`/product/${p.id}`} className="group">
            <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ">
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-xl">
                <Image
                  src={p.thumbnail}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between p-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold line-clamp-1">
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {p.description}
                  </p>
                </div>

                {/* Price + Stock */}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-black">
                    ${p.price}
                  </span>
                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                    In Stock
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
