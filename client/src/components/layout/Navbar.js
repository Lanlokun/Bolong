"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Bolong
        </Link>

        <div className="flex items-center gap-5 text-sm md:text-base">
          <Link href="/products" className="hover:opacity-70 transition">
            Products
          </Link>

          <Link href="/cart" className="hover:opacity-70 transition">
            Cart ({cartCount})
          </Link>

          {user ? (
            <>
              <Link href="/dashboard" className="hover:opacity-70 transition">
                Dashboard
              </Link>

              {user.role === "admin" && (
                <Link href="/admin" className="hover:opacity-70 transition">
                  Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:opacity-70 transition">
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-90 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}