"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <Card className="hover:shadow-md transition">
      <div className="mb-4">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-48 w-full object-cover rounded-xl mb-4"
          />
        ) : (
          <div className="h-48 bg-gray-100 rounded-xl mb-4" />
        )}

        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-gray-600 mt-2 mb-3 line-clamp-2">
          {product.description}
        </p>
        <p className="font-bold text-lg">D {product.price}</p>
      </div>

      <div className="flex gap-3">
        <Button onClick={() => addToCart(product)} className="flex-1">
          Add to Cart
        </Button>
        <Link
          href={`/products/${product.id}`}
          className="px-4 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition"
        >
          View
        </Link>
      </div>
    </Card>
  );
}