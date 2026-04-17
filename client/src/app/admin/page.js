"use client";

import AdminRoute from "@/components/auth/AdminRoute";
import PageContainer from "@/components/layout/PageContainer";
import Card from "@/components/ui/Card";
import Link from "next/link";

function AdminContent() {
  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
        <p className="text-gray-600">
          Manage products, orders, and platform operations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-2">Manage Products</h2>
          <p className="text-gray-600 mb-4">
            Add new products and review the catalog.
          </p>
          <Link href="/admin/products" className="underline">
            Open Products
          </Link>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-2">Manage Orders</h2>
          <p className="text-gray-600 mb-4">
            Update statuses and monitor customer purchases.
          </p>
          <Link href="/admin/orders" className="underline">
            Open Orders
          </Link>
        </Card>
      </div>
    </PageContainer>
  );
}

export default function AdminPage() {
  return (
    <AdminRoute>
      <AdminContent />
    </AdminRoute>
  );
}