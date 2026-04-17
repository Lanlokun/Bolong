"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import PageContainer from "@/components/layout/PageContainer";
import Loader from "@/components/ui/Loader";
import DeliveryTimeline from "@/components/dashboard/DeliveryTimeline";

function OrdersContent() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders/my-orders");
        setOrders(res.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <Loader />;

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm mb-6 text-sm text-gray-600">
        Orders are confirmed by the Bolong team after placement. Payment and delivery
        details may be finalized based on sourcing, shipping schedule, and destination.
      </div>

      {!orders.length ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p>No orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
                <div>
                  <p className="font-semibold text-lg">Order #{order.id}</p>
                  <p className="text-sm text-gray-500 capitalize">
                    Status: {order.status.replaceAll("_", " ")}
                  </p>
                </div>
                <p className="font-bold text-lg">D {order.total_price}</p>
              </div>

              <div className="space-y-2">
                {order.OrderItems?.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-t pt-3 text-sm"
                  >
                    <span>
                      {item.Product?.name || "Product"} x {item.quantity}
                    </span>
                    <span>D {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <DeliveryTimeline status={order.status} />
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
}

export default function DashboardOrdersPage() {
  return (
    <ProtectedRoute>
      <OrdersContent />
    </ProtectedRoute>
  );
}