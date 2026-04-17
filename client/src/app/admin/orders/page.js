"use client";

import AdminRoute from "@/components/auth/AdminRoute";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "@/lib/api";
import PageContainer from "@/components/layout/PageContainer";
import Loader from "@/components/ui/Loader";
import DeliveryTimeline from "@/components/dashboard/DeliveryTimeline";

const STATUSES = [
  "pending",
  "paid",
  "processing",
  "ordered_from_china",
  "arrived_warehouse",
  "in_transit",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

function AdminOrdersContent() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to fetch admin orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      await API.put(`/orders/${orderId}/status`, { status });
      toast.success("Order status updated");
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) return <Loader />;

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>

      {!orders.length ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p>No orders found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">
                <div>
                  <p className="font-semibold text-lg">Order #{order.id}</p>
                  <p className="text-sm text-gray-500 capitalize">
                    Current status: {order.status.replaceAll("_", " ")}
                  </p>
                  <p className="font-bold mt-2">D {order.total_price}</p>
                </div>

                <select
                  className="border border-gray-300 rounded-xl px-3 py-2 h-fit bg-white"
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status.replaceAll("_", " ")}
                    </option>
                  ))}
                </select>
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

export default function AdminOrdersPage() {
  return (
    <AdminRoute>
      <AdminOrdersContent />
    </AdminRoute>
  );
}