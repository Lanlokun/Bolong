"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import PageContainer from "@/components/layout/PageContainer";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-6">Cart</h1>

      {cart.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="mb-4">Your cart is empty.</p>
          <Link
            href="/products"
            className="inline-block px-5 py-3 rounded-xl bg-black text-white"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1.5fr_0.8fr] gap-8">
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div>
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-gray-600">Price: D {item.price}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-10 h-10 rounded-xl border border-gray-300"
                  >
                    -
                  </button>
                  <span className="min-w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-10 h-10 rounded-xl border border-gray-300"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <p className="font-bold">D {item.price * item.quantity}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <p className="text-gray-600 mb-4">
              Review your order before checkout.
            </p>
            <div className="border-t pt-4 text-2xl font-bold mb-6">
              Total: D {total}
            </div>
            <Link
              href="/checkout"
              className="block text-center px-6 py-3 bg-black text-white rounded-xl hover:opacity-90 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </PageContainer>
  );
}