import { useState } from "react";
import {
  addProductApi,
  updateProductApi,
  deleteProductApi,
} from "../utils/adminApi";

export default function AdminDashboard() {
  const [mode, setMode] = useState<"add" | "update">("add");

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
      };

      if (mode === "add") {
        await addProductApi(payload);
        alert("Product Added Successfully");
      } else {
        await updateProductApi(formData.id, payload);
        alert("Product Updated Successfully");
      }

      setFormData({
        id: "",
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
      });
    } catch (error) {
      console.error(error);
      alert("Operation failed");
    }
  }

  async function handleDelete() {
    if (!formData.id) {
      alert("Enter Product ID to delete");
      return;
    }

    try {
      await deleteProductApi(formData.id);
      alert("Product Deleted Successfully");

      setFormData({
        id: "",
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
      });
    } catch (error) {
      alert("Delete failed");
    }
  }

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>

      <div className="admin-card">
        <h3>
          {mode === "add"
            ? "Add New Product"
            : "Update Product"}
        </h3>

        <form onSubmit={handleSubmit}>
          <input
            name="id"
            placeholder="Product ID"
            value={formData.id}
            onChange={handleChange}
            required
          />

          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <input
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <button className="admin-btn" type="submit">
            {mode === "add"
              ? "Add Product"
              : "Update Product"}
          </button>
        </form>

        <div style={{ marginTop: "15px" }}>
          <button
            className="admin-btn"
            onClick={() =>
              setMode(
                mode === "add" ? "update" : "add"
              )
            }
          >
            Switch to{" "}
            {mode === "add"
              ? "Update Mode"
              : "Add Mode"}
          </button>
        </div>

        <div style={{ marginTop: "15px" }}>
          <button
            className="admin-btn"
            onClick={handleDelete}
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
}