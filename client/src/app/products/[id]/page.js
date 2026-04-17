"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "@/lib/api";
import PageContainer from "@/components/layout/PageContainer";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import { useCart } from "@/context/CartContext";

export default function ProductDetailsPage() {
  const params = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${params.id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      fetchProduct();
    }
  }, [params?.id]);

  if (loading) return <Loader />;

  if (!product) {
    return (
      <PageContainer>
        <p>Product not found.</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div>
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-96 object-cover rounded-2xl border border-gray-200"
            />
          ) : (
            <div className="h-96 bg-gray-100 rounded-2xl border border-gray-200" />
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="inline-block mb-3 px-3 py-1 rounded-full bg-gray-100 text-sm">
            {product.category || "General"}
          </p>

          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold mb-6">D {product.price}</p>

          <Button onClick={() => addToCart(product)} className="w-full mb-6">
            Add to Cart
          </Button>

          <div className="border-t pt-4 text-sm text-gray-600 space-y-2">
            <p>Orders are processed directly through Bolong.</p>
            <p>Final payment confirmation happens during checkout.</p>
            <p>Delivery timelines depend on sourcing and logistics.</p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}