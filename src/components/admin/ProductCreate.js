import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5186";

const ProductCreate = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    categoryId: "",
  });

  // ✅ Biến thể có giá riêng
  const [variants, setVariants] = useState([
    { name: "", price: "", image: null, model: null },
  ]);

  // 🔹 Load danh mục
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Lỗi khi load danh mục:", err));
  }, []);

  // 🔹 Xử lý input chung
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // 🔹 Xử lý input biến thể
  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  // 🔹 Thêm biến thể mới
  const addVariant = () => {
    setVariants([...variants, { name: "", price: "", image: null, model: null }]);
  };

  // 🔹 Xóa biến thể
  const removeVariant = (index) => {
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
  };

  // 🔹 Gửi form
const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  if (!form.name || !form.categoryId) {
    alert("⚠️ Vui lòng nhập tên và chọn danh mục!");
    return;
  }

  const formData = new FormData();
  formData.append("Name", form.name);
  formData.append("Description", form.description);
  formData.append("CategoryId", form.categoryId);

variants.forEach((v, index) => {
  formData.append(`VariantNames[${index}]`, v.name || "");
  formData.append(`VariantPrices[${index}]`, v.price || 0);

  // Giữ thứ tự file bằng cách chỉ append nếu có
  if (v.image) formData.append(`VariantImages[${index}]`, v.image);
  if (v.model) formData.append(`VariantModels[${index}]`, v.model);
});


  try {
    const res = await axios.post(`${API_BASE_URL}/api/products/create`, formData, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "Content-Type": "multipart/form-data",
      },
    });

    alert("✅ Tạo sản phẩm thành công!");
    navigate("/admin/products");
  } catch (err) {
    console.error("❌ Lỗi khi thêm sản phẩm:", {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data,
    });
    alert(`❌ Lỗi khi thêm sản phẩm: ${err.response?.data || err.message}`);
  }
};





  return (
    <div className="container mt-4">
      <h2>➕ Thêm sản phẩm</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* ---- Thông tin chung ---- */}
        <input
          name="name"
          className="form-control mb-2"
          placeholder="Tên sản phẩm chung (VD: Đèn gỗ thủ công)"
          onChange={handleChange}
          required
        />

        <select
          name="categoryId"
          className="form-select mb-2"
          onChange={handleChange}
          required
        >
          <option value="">-- Chọn danh mục --</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          className="form-control mb-3"
          placeholder="Mô tả sản phẩm..."
          onChange={handleChange}
        />

        {/* ---- Biến thể ---- */}
        <h4>🧩 Biến thể sản phẩm</h4>
        {variants.map((v, i) => (
          <div key={i} className="border rounded p-3 mb-3 bg-light">
            <div className="row">
              <div className="col-md-6 mb-2">
                <input
                  placeholder="Tên biến thể (VD: Đèn tròn nhỏ)"
                  className="form-control"
                  value={v.name}
                  onChange={(e) =>
                    handleVariantChange(i, "name", e.target.value)
                  }
                  required
                />
              </div>

              <div className="col-md-6 mb-2">
                <input
                  type="number"
                  placeholder="Giá biến thể (₫)"
                  className="form-control"
                  value={v.price}
                  onChange={(e) =>
                    handleVariantChange(i, "price", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <label className="mt-2">Ảnh biến thể:</label>
            <input
              type="file"
              accept="image/*"
              className="form-control mb-2"
              onChange={(e) =>
                handleVariantChange(i, "image", e.target.files[0])
              }
              required
            />

            <label>File 3D (.glb / .gltf / .fbx):</label>
            <input
              type="file"
              accept=".glb,.gltf,.fbx"
              className="form-control mb-2"
              onChange={(e) =>
                handleVariantChange(i, "model", e.target.files[0])
              }
            />

            {variants.length > 1 && (
              <button
                type="button"
                className="btn btn-danger btn-sm mt-2"
                onClick={() => removeVariant(i)}
              >
                🗑️ Xóa biến thể
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addVariant}
          className="btn btn-secondary mb-3"
        >
          ➕ Thêm biến thể
        </button>

        <button type="submit" className="btn btn-primary w-100">
          💾 Lưu sản phẩm
        </button>
      </form>
    </div>
  );
};

export default ProductCreate;
