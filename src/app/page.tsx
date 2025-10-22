import ProductList from "@/components/ProductList";
import { Product } from "@/types/products";

const DEFAULT_LIMIT = 20;

async function fetchInitialProducts(params: {
  q?: string | null;
  category?: string | null;
  sort?: string | null;
  limit?: number;
  skip?: number;
}) {
  const { q, category, sort, limit = DEFAULT_LIMIT, skip = 0 } = params;
  const base = "https://dummyjson.com";

  let url = "";
  if (q) {
    url = `${base}/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`;
  } else if (category) {
    url = `${base}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
  } else {
    url = `${base}/products?limit=${limit}&skip=${skip}`;
  }

  const res = await fetch(url, { next: { revalidate: 60 } });
  const data = await res.json();

  let products: Product[] = data.products ?? [];
  const total = data.total ?? products.length;

  // server-side sort
  if (sort === "asc") products.sort((a, b) => a.price - b.price);
  if (sort === "desc") products.sort((a, b) => b.price - a.price);

  return { products, total };
}

async function fetchCategories() {
  const res = await fetch("https://dummyjson.com/products/categories", { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  return (await res.json()) as string[];
}

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;

  const q = (params?.q as string) ?? null;
  const category = (params?.category as string) ?? null;
  const sort = (params?.sort as string) ?? null;
  const limit = Number((params?.limit as string) ?? DEFAULT_LIMIT);
  const skip = Number((params?.skip as string) ?? 0);


  const [categories, { products, total }] = await Promise.all([
    fetchCategories(),
    fetchInitialProducts({ q, category, sort, limit, skip }),
  ]);

  return (
    <div className="relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl space-y-8 px-6 py-10">
        <header className="space-y-3 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">🛍️ Marketplace</h1>
          <p className="text-white">
            Discover amazing deals on your favorite products
          </p>
        </header>

        <ProductList
          products={products}
          total={total}
          categories={categories}
          query={{ q, category, sort, limit }}
        />
      </div>
    </div>
  );
}
