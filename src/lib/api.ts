import { Product } from "@/types/products";

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}