"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import PageContainer from "@/components/layout/PageContainer";
import Card from "@/components/ui/Card";
import Link from "next/link";

function DashboardContent() {
  const { user } = useAuth();

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {user?.name || "User"}.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-2">My Orders</h2>
          <p className="text-gray-600 mb-4">
            Track your current and past purchases.
          </p>
          <Link href="/dashboard/orders" className="underline">
            View Orders
          </Link>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-2">Profile</h2>
          <p className="text-gray-600 mb-2">Name: {user?.name}</p>
          <p className="text-gray-600 mb-2">Email: {user?.email}</p>
          <p className="text-gray-600">Role: {user?.role}</p>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-2">Bolong Access</h2>
          <p className="text-gray-600">
            Use Bolong to browse products, place orders, and track delivery.
          </p>
        </Card>
      </div>
    </PageContainer>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}