import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5186";

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${API_BASE_URL}/api/Categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });

    navigate("/admin/categories");
  };

  return (
    <div className="container mt-4">
      <h2>Thêm danh mục mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Tên danh mục</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-success" type="submit">
          Lưu
        </button>
      </form>
    </div>
  );
};

export default CategoryCreate;
