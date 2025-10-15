import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5186";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  // ✅ Hàm load lại danh mục
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Lỗi load categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Xóa danh mục
  const handleDelete = async (id) => {
  if (!window.confirm("Bạn có chắc muốn xóa danh mục này không?")) return;
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // ✅ Thử parse JSON, fallback sang text
    let data;
    try {
      data = await res.json();
    } catch {
      data = { message: await res.text() };
    }

    if (res.ok) {
      alert("✅ " + (data.message || "Đã xóa danh mục thành công!"));
      fetchCategories();
    } else {
      alert("❌ " + (data.message || "Không thể xóa danh mục."));
    }
  } catch (err) {
    console.error(err);
    alert("⚠️ Lỗi kết nối đến server.");
  }
};


  return (
    <div className="container mt-4">
      <h2>Danh sách danh mục</h2>
      <Link to="/admin/categories/create" className="btn btn-primary mb-3">
        + Thêm danh mục
      </Link>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên danh mục</th>
            <th>Số sản phẩm</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td>{cat.productCount}</td>
              <td>{cat.description}</td>
              <td>
                <Link to={`/admin/categories/edit/${cat.id}`} className="btn btn-warning btn-sm me-2">
                  Sửa
                </Link>
                <button onClick={() => handleDelete(cat.id)} className="btn btn-danger btn-sm">
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
