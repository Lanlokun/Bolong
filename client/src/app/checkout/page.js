"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import API from "@/lib/api";
import PageContainer from "@/components/layout/PageContainer";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

function CheckoutContent() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    notes: "",
    paymentMethod: "cash_on_delivery",
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!cart.length) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      const items = cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      }));

      await API.post("/orders", { items, shipping: form });

      toast.success("Order placed successfully");
      clearCart();
      router.push("/dashboard/orders");
    } catch (error) {
      toast.error(error.response?.data?.message || "Checkout failed");
    }
  };

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
        <form
          onSubmit={handleCheckout}
          className="space-y-4 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
        >
          <Input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
          />
          <Input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />
          <Input
            name="address"
            placeholder="Delivery Address"
            value={form.address}
            onChange={handleChange}
          />

          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white"
          >
            <option value="cash_on_delivery">Cash on Delivery</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="mobile_money">Mobile Money</option>
          </select>

          <textarea
            name="notes"
            placeholder="Order notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 min-h-28 outline-none focus:ring-2 focus:ring-black"
          />

          <Button type="submit" className="w-full">
            Place Order
          </Button>
        </form>

        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between gap-4 text-sm">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>D {item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 text-xl font-bold">
              Total: D {total}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Payment Instructions</h2>

            <div className="space-y-3 text-sm text-gray-600">
              <p>
                Bolong currently supports manual payment confirmation for early orders.
              </p>
              <p>
                After placing your order, our team will contact you to confirm
                payment and delivery arrangements.
              </p>
              <p>
                Available payment options include cash on delivery, bank transfer,
                and mobile money depending on location and order type.
              </p>
              <p>
                For imported goods, delivery timelines may vary based on supplier
                processing and shipping cycles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <CheckoutContent />
    </ProtectedRoute>
  );
}