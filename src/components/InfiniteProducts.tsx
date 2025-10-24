"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/products";

export default function InfiniteProducts({
  initialProducts,
  total,
  initialLimit = 20,
  initialQuery = {},
}: {
  initialProducts: Product[];
  total: number;
  initialLimit?: number;
  initialQuery?: { q?: string; category?: string; sort?: string };
}) {
  const [items, setItems] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(initialProducts.length);
  const [hasMore, setHasMore] = useState(initialProducts.length < total);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setItems(initialProducts);
    setSkip(initialProducts.length);
    setHasMore(initialProducts.length < total);
  }, [initialProducts, total]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore && !loading) {
            loadMore();
          }
        });
      },
      { rootMargin: "300px" }
    );

    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);

    // ✅ Always return a proper cleanup function
    return () => {
      if (sentinel) observer.unobserve(sentinel);
      observer.disconnect();
    };
  }, [hasMore, loading]);

  const buildDummyUrl = (nextSkip: number) => {
    const base = "https://dummyjson.com";
    const limit = initialLimit;
    const { q, category } = initialQuery;

    if (q)
      return `${base}/products/search?q=${encodeURIComponent(
        q
      )}&limit=${limit}&skip=${nextSkip}`;
    if (category)
      return `${base}/products/category/${encodeURIComponent(
        category
      )}?limit=${limit}&skip=${nextSkip}`;
    return `${base}/products?limit=${limit}&skip=${nextSkip}`;
  };

  const loadMore = async () => {
    setLoading(true);
    try {
      const url = buildDummyUrl(skip);
      const res = await fetch(url);
      const data = await res.json();

      const newProducts: Product[] = data.products ?? [];
      if (initialQuery.sort === "asc")
        newProducts.sort((a, b) => a.price - b.price);
      if (initialQuery.sort === "desc")
        newProducts.sort((a, b) => b.price - a.price);

      setItems((prev) => [...prev, ...newProducts]);
      setSkip((s) => s + (data.limit ?? newProducts.length));
      setHasMore(items.length + newProducts.length < (data.total ?? total));
    } catch (err) {
      console.error("Failed to load more:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((p) => (
          <Link key={p.id} href={`/product/${p.id}`} className="group">
            <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-xl">
                <Image
                  src={p.thumbnail}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold line-clamp-1">
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {p.description}
                  </p>
                </div>
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

      <div ref={sentinelRef} />
      <div className="flex justify-center py-6">
        {loading ? (
          <span className="text-sm text-gray-500">Loading…</span>
        ) : !hasMore ? (
          <span className="text-sm text-gray-500">No more products</span>
        ) : null}
      </div>
    </div>
  );
}
