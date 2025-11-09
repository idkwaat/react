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

  const [variants, setVariants] = useState([
    { name: "", price: "", image: null, cleanImage: null, model: null },
  ]);

  // 🔹 Loading state
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // 🔹 Load danh mục
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/categories`)
      .then((res) => res.json())
      .then(setCategories)
      .catch((err) => console.error("Lỗi khi load danh mục:", err));
  }, []);

  // 🔹 Xử lý form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      { name: "", price: "", image: null, cleanImage: null, model: null },
    ]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!form.name || !form.categoryId) {
      await alert("⚠️ Vui lòng nhập tên và chọn danh mục!");
      return;
    }

    const formData = new FormData();
    formData.append("Name", form.name);
    formData.append("Description", form.description);
    formData.append("CategoryId", form.categoryId);

    variants.forEach((v, i) => {
      formData.append(`VariantNames[${i}]`, v.name || "");
      formData.append(`VariantPrices[${i}]`, v.price || 0);
      if (v.image) formData.append(`VariantImages[${i}]`, v.image);
      if (v.cleanImage) formData.append(`VariantCleanImages[${i}]`, v.cleanImage);
      if (v.model) formData.append(`VariantModels[${i}]`, v.model);
    });

    try {
      setUploading(true);
      setUploadProgress(0);

      await axios.post(`${API_BASE_URL}/api/products/create`, formData, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (evt) => {
          const percent = Math.round((evt.loaded * 100) / evt.total);
          setUploadProgress(percent);
        },
      });

      alert("✅ Tạo sản phẩm thành công!");
      navigate("/admin/products");
    } catch (err) {
      console.error("❌ Lỗi khi thêm sản phẩm:", err.response?.data || err.message);
      alert("❌ Lỗi khi thêm sản phẩm!");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="container mt-4">
      {/* 🔹 Modal loading */}
      {uploading && (
        <div
          className="modal-backdrop show d-flex justify-content-center align-items-center"
          style={{ zIndex: 1050 }}
        >
          <div className="bg-white p-4 rounded shadow text-center" style={{ width: "300px" }}>
            <h5>Đang tải lên...</h5>
            <div className="progress mt-3">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                role="progressbar"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="mt-2">{uploadProgress}%</p>
          </div>
        </div>
      )}

      <h2>➕ Thêm sản phẩm</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Thông tin chung */}
        <input
          name="name"
          className="form-control mb-2"
          placeholder="Tên sản phẩm"
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

        {/* Biến thể */}
        <h4>🧩 Biến thể sản phẩm</h4>
        {variants.map((v, i) => (
          <div key={i} className="border rounded p-3 mb-3 bg-light">
            <div className="row">
              <div className="col-md-6 mb-2">
                <input
                  placeholder="Tên biến thể"
                  className="form-control"
                  value={v.name}
                  onChange={(e) => handleVariantChange(i, "name", e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 mb-2">
                <input
                  type="number"
                  placeholder="Giá (₫)"
                  className="form-control"
                  value={v.price}
                  onChange={(e) => handleVariantChange(i, "price", e.target.value)}
                  required
                />
              </div>
            </div>

            <label>Ảnh biến thể:</label>
            <input
              type="file"
              accept="image/*"
              className="form-control mb-2"
              onChange={(e) => handleVariantChange(i, "image", e.target.files[0])}
              required
            />

            <label>Ảnh trơn (clean image):</label>
            <input
              type="file"
              accept="image/*"
              className="form-control mb-2"
              onChange={(e) => handleVariantChange(i, "cleanImage", e.target.files[0])}
            />

            <label>File 3D (.glb / .gltf / .fbx):</label>
            <input
              type="file"
              accept=".glb,.gltf,.fbx"
              className="form-control mb-2"
              onChange={(e) => handleVariantChange(i, "model", e.target.files[0])}
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

        <button type="button" onClick={addVariant} className="btn btn-secondary mb-3">
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
