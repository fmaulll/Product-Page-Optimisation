import InfiniteProducts from "./InfiniteProducts";
import { Category, Product } from "@/types/products";

export default function ProductList({
  products,
  total,
  categories,
  query,
}: {
  products: Product[];
  total: number;
  categories: Category[];
  query: {
    q?: string | null;
    category?: string | null;
    sort?: string | null;
    limit?: number;
  };
}) {
  const { q, category, sort, limit = 20 } = query || {};

  return (
    <div className="space-y-8">
      <form
        method="get"
        className="sticky top-0 z-10 flex flex-wrap items-center gap-4 rounded-xl border border-gray-200 bg-white shadow-md p-4"
      >
        <input
          name="q"
          defaultValue={q ?? ""}
          placeholder="Search products..."
          className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-black focus:outline-none"
        />

        <label className="flex items-center gap-2 text-sm font-medium">
          Category
          <select
            name="category"
            defaultValue={category ?? ""}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-black focus:outline-none"
          >
            <option value="">All</option>
            {categories.map((c: Category) => {
              // handle both string and object shapes
              const value = typeof c === "string" ? c : c.slug ?? c.name ?? "";
              const label =
                typeof c === "string" ? c : c.name ?? c.slug ?? "Unknown";
              return (
                <option key={value} value={value}>
                  {label.charAt(0).toUpperCase() + label.slice(1)}
                </option>
              );
            })}
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm font-medium">
          Sort
          <select
            name="sort"
            defaultValue={sort ?? ""}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-black focus:outline-none"
          >
            <option value="">Default</option>
            <option value="asc">Price: Low → High</option>
            <option value="desc">Price: High → Low</option>
          </select>
        </label>

        <input type="hidden" name="limit" value={String(limit)} />

        <button
          type="submit"
          className="ml-auto rounded-md bg-[#65c1ff] px-3 py-2 text-sm text-white cursor-pointer"
        >
          Apply
        </button>
      </form>

      <InfiniteProducts
        initialProducts={products}
        total={total}
        initialLimit={limit}
        initialQuery={{
          q: q ?? undefined,
          category: category ?? undefined,
          sort: sort ?? undefined,
        }}
      />
    </div>
  );
}
