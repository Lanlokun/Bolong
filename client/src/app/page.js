import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";

export default function HomePage() {
  return (
    <PageContainer>
      <section className="py-20 text-center">
        <p className="inline-block mb-4 px-4 py-2 rounded-full bg-gray-100 text-sm">
          Cross-border trade, simplified
        </p>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Bolong
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Connecting Gambia to China through trade, logistics, and commerce.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/products"
            className="px-6 py-3 rounded-xl bg-black text-white hover:opacity-90 transition"
          >
            Shop Products
          </Link>

          <Link
            href="/register"
            className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition"
          >
            Create Account
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}