import Carousel from "@/components/Carousel";
import { getProduct } from "@/lib/api";
import Link from "next/link";
import { Fragment } from "react";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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

      {/* Product Layout */}
      <div className="grid gap-10 md:grid-cols-2">
        {/* LEFT: Carousel */}
        <div>
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <Carousel images={product.images} />
          </div>
        </div>

        {/* RIGHT: Info */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">{product.title}</h1>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="text-4xl font-extrabold text-white">
                ${product.price.toFixed(2)}
              </div>
              <span className="text-sm text-gray-500 line-through">
                -{product.discountPercentage}% off
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-yellow-300 font-bold">
              ⭐ {product.rating.toFixed(1)} / 5
            </div>
            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
              {product.availabilityStatus}
            </span>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 rounded-lg bg-black px-6 py-3 text-white font-medium hover:bg-gray-800 cursor-pointer">
              Add to Cart
            </button>
            <button className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-100 cursor-pointer">
              Buy Now
            </button>
          </div>
          <p className="text-gray-600 leading-relaxed text-white">
            {product.description}
          </p>

          {/* PRODUCT DETAILS */}
          <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Product Details</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-gray-600">
              <li>
                <span className="font-bold">Brand</span>: {product.brand}
              </li>
              <li>
                <span className="font-bold">SKU</span>: {product.sku}
              </li>
              <li>
                <span className="font-bold">Category</span>: {product.category}
              </li>
              <li>
                <span className="font-bold">Weight</span>: {product.weight} lbs
              </li>
              <li>
                <span className="font-bold">Dimensions</span>:{" "}
                {product.dimensions.width} × {product.dimensions.height} ×{" "}
                {product.dimensions.depth} cm
              </li>
              <li>
                <span className="font-bold">Shipping Info</span>:{" "}
                {product.shippingInformation}
              </li>
              <li>
                <span className="font-bold">Warranty</span>:{" "}
                {product.warrantyInformation}
              </li>
              <li>
                <span className="font-bold">Return Policy</span>:{" "}
                {product.returnPolicy}
              </li>
              <li>
                <span className="font-bold">Minimum Order</span>:{" "}
                {product.minimumOrderQuantity}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* TAGS */}
      {product.tags?.length > 0 && (
        <div className="space-x-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* REVIEWS */}
      {product.reviews?.length > 0 && (
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Customer Reviews</h2>
          {product.reviews.map((review, i) => (
            <div key={i} className="border-t pt-3">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="font-semibold">{review.reviewerName}</span>
                <span className="text-yellow-600">⭐ {review.rating}</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
              <p className="text-xs text-gray-400">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* META INFO */}
      <div className="space-y-2 text-sm text-gray-500">
        <p>
          <span className="font-semibold">Barcode:</span> {product.meta.barcode}
        </p>
        <p>
          <span className="font-semibold">Created:</span>{" "}
          {new Date(product.meta.createdAt).toLocaleDateString()}
        </p>
        <p>
          <span className="font-semibold">Updated:</span>{" "}
          {new Date(product.meta.updatedAt).toLocaleDateString()}
        </p>
        <img
          src={product.meta.qrCode}
          alt="QR Code"
          className="mt-3 h-24 w-24 object-contain"
        />
      </div>
    </div>
  );
}
