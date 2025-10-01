import ProductList from "@/components/ProductList";
import { Product } from "@/types/products";

async function getProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=100", {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data.products as Product[];
}

export default async function Page() {
  const products = await getProducts();
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-10">
      {/* Hero Header */}
      <header className="space-y-3 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          🛍️ Marketplace
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover amazing deals on your favorite products
        </p>
      </header>

      {/* Product Grid */}
      <section>
        <ProductList products={products} categories={categories} />
      </section>
    </div>
  );
}
