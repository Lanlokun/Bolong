"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/ui/Loader";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user === null) {
      const storedUser =
        typeof window !== "undefined"
          ? localStorage.getItem("user")
          : null;

      if (!storedUser) {
        router.push("/login");
      }
    }
  }, [user, router]);

  if (!user) {
    return <Loader />;
  }

  return children;
}