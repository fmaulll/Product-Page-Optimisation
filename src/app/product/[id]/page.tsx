import Carousel from "@/components/Carousel";
import { getProduct } from "@/lib/api";
import Link from "next/link";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await the params first
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 py-8">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-block rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100"
      >
        ← Back to Products
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        {/* LEFT: Carousel */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <Carousel images={product.images} />
        </div>

        {/* RIGHT: Product Info */}
        <div className="flex flex-col justify-between space-y-6">
          {/* Title + Category */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              {product.category}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Price + Stock */}
          <div className="space-y-3">
            <div className="text-4xl font-extrabold text-black">
              ${product.price}
            </div>
            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
              In Stock
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button className="flex-1 rounded-lg bg-black px-6 py-3 text-white font-medium hover:bg-gray-800">
              Add to Cart
            </button>
            <button className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-100">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Extra Info Section */}
      <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Product Details</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-gray-600">
          <li>High quality material</li>
          <li>Category: {product.category}</li>
          <li>Ships in 2-3 business days</li>
          <li>30-day return policy</li>
        </ul>
      </div>
    </div>
  );
}