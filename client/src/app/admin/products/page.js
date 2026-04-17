"use client";

import AdminRoute from "@/components/auth/AdminRoute";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "@/lib/api";
import PageContainer from "@/components/layout/PageContainer";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  image_url: "",
  supplier_link: "",
  category: "General",
};

function AdminProductsContent() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);

  const categories = [
    "General",
    "Electronics",
    "Fashion",
    "Home",
    "Beauty",
    "Accessories",
    "Groceries",
  ];

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        price: Number(form.price),
      };

      if (editingId) {
        await API.put(`/products/${editingId}`, payload);
        toast.success("Product updated");
      } else {
        await API.post("/products", payload);
        toast.success("Product created");
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      image_url: product.image_url || "",
      supplier_link: product.supplier_link || "",
      category: product.category || "General",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this product?");

    if (!confirmed) return;

    try {
      await API.delete(`/products/${id}`);
      toast.success("Product deleted");
      if (editingId === id) {
        resetForm();
      }
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">
              {editingId ? "Edit Product" : "Add Product"}
            </h2>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-sm text-gray-500 hover:underline"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <Input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
          <Input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <Input
            name="image_url"
            placeholder="Image URL"
            value={form.image_url}
            onChange={handleChange}
          />
          <Input
            name="supplier_link"
            placeholder="Supplier Link"
            value={form.supplier_link}
            onChange={handleChange}
          />

          <Button type="submit" className="w-full">
            {editingId ? "Update Product" : "Create Product"}
          </Button>
        </form>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Existing Products</h2>

          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-lg">{product.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                  <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                  <p className="font-bold mt-3">D {product.price}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-3 py-2 rounded-xl border border-gray-300 text-sm hover:bg-gray-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-3 py-2 rounded-xl border border-red-300 text-red-600 text-sm hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}

export default function AdminProductsPage() {
  return (
    <AdminRoute>
      <AdminProductsContent />
    </AdminRoute>
  );
}