"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/ui/Loader";

export default function AdminRoute({ children }) {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const storedUser =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("user") || "null")
        : null;

    const currentUser = user || storedUser;

    if (!currentUser) {
      router.push("/login");
      return;
    }

    if (currentUser.role !== "admin") {
      router.push("/dashboard");
    }
  }, [user, router]);

  const currentUser =
    user ||
    (typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null);

  if (!currentUser) return <Loader />;
  if (currentUser.role !== "admin") return <Loader />;

  return children;
}