import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5186";

const CategoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({ name: "", description: "" });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/categories/${id}`)
      .then(res => res.json())
      .then(data => setCategory(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${API_BASE_URL}/api/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category)
    });

    navigate("/admin/categories");
  };

  return (
    <div className="container mt-4">
      <h2>Sửa danh mục</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Tên danh mục</label>
          <input type="text" className="form-control"
            value={category.name}
            onChange={e => setCategory({ ...category, name: e.target.value })}
            required />
        </div>
        <div className="mb-3">
          <label>Mô tả</label>
          <textarea className="form-control"
            value={category.description}
            onChange={e => setCategory({ ...category, description: e.target.value })} />
        </div>
        <button className="btn btn-primary" type="submit">Cập nhật</button>
      </form>
    </div>
  );
};

export default CategoryEdit;
