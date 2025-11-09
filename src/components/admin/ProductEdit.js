import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5186";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [deletedVariantIds, setDeletedVariantIds] = useState([]);

  const [uploadProgress, setUploadProgress] = useState(0);
const [uploading, setUploading] = useState(false);


  const [form, setForm] = useState({
    name: "",
    description: "",
    categoryId: "",
  });

  const [variants, setVariants] = useState([]);

  // 🔹 Load danh mục
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/categories`)
      .then((res) => res.json())
      .then(setCategories)
      .catch((err) => console.error("Lỗi khi load danh mục:", err));
  }, []);

  // 🔹 Load sản phẩm cần sửa
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          name: data.name,
          description: data.description,
          categoryId: data.categoryId,
        });
        setVariants(
  data.variants?.map((v) => ({
    id: v.id,
    name: v.name,
    price: v.price,
    imageUrl: v.imageUrl || "",
    modelUrl: v.modelUrl || "",
    cleanImageUrl: v.cleanImageUrl || "", // 🟢 thêm dòng này
    image: null,
    model: null,
    cleanImage: null,
    previewImage: null,
    previewCleanImage: null,
  })) || []
);


      })
      .catch((err) => console.error("Lỗi khi load sản phẩm:", err));
  }, [id]);

  // 🔹 Xử lý input chung
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // 🔹 Xử lý thay đổi dữ liệu của biến thể
  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const updated = [...variants];
    updated[index].image = file;
    updated[index].previewImage = URL.createObjectURL(file);
    setVariants(updated);
  };

  const handleModelChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const updated = [...variants];
    updated[index].model = file;
    setVariants(updated);
  };

  const handleCleanImageChange = (index, e) => {
  const file = e.target.files[0];
  if (!file) return;
  const updated = [...variants];
  updated[index].cleanImage = file;
  updated[index].previewCleanImage = URL.createObjectURL(file);
  setVariants(updated);
};


  const addVariant = () => {
    setVariants([
      ...variants,
      {
        id: null,
        name: "",
        price: "",
        image: null,
        model: null,
        imageUrl: "",
        modelUrl: "",
        previewImage: null,
      },
    ]);
  };

  const removeVariant = (index) => {
    setVariants((prev) => {
      const removed = prev[index];
      if (removed?.id)
        setDeletedVariantIds((prevDel) => [...prevDel, removed.id]);
      return prev.filter((_, i) => i !== index);
    });
  };

  // 🔹 Gửi request cập nhật
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

  deletedVariantIds.forEach((id, i) => {
    formData.append(`DeletedVariantIds[${i}]`, id);
  });

  variants.forEach((v, i) => {
    formData.append(`VariantIds[${i}]`, v.id || 0);
    formData.append(`VariantNames[${i}]`, v.name || "");
    formData.append(`VariantPrices[${i}]`, v.price || 0);
    

    if (v.image instanceof File) {
      formData.append(`VariantImages[${i}]`, v.image);
    } else if (v.imageUrl) {
      formData.append(`VariantImageUrls[${i}]`, v.imageUrl);
    }

    if (v.model instanceof File) {
      formData.append(`VariantModels[${i}]`, v.model);
    } else if (v.modelUrl) {
      formData.append(`VariantModelUrls[${i}]`, v.modelUrl);
    }

if (v.cleanImage instanceof File) {
  formData.append(`VariantCleanImages[${i}]`, v.cleanImage);
} else if (v.cleanImageUrl) {
  formData.append(`VariantCleanImageUrls[${i}]`, v.cleanImageUrl);
}





  });

  variants.forEach((v, i) => {
  console.log(`🧩 Variant ${i}:`, {
    cleanImage: v.cleanImage,
    cleanImageUrl: v.cleanImageUrl,
  });
  console.log(
  "cleanImage", i, v.cleanImage, 
  v.cleanImage instanceof File
);

});
  
console.log("🧾 FormData gửi đi:");
for (let pair of formData.entries()) {
  if (pair[1] instanceof File) {
    console.log(`📁 ${pair[0]} = [File: ${pair[1].name}]`);
  } else {
    console.log(`🔹 ${pair[0]} = ${pair[1]}`);
  }
}

console.log("🧩 Kiểm tra VariantCleanImages trước khi gửi:");
variants.forEach((v, i) => {
  console.log(`Variant ${i}:`, v.cleanImage, v.cleanImage instanceof File);
});

for (let [key, value] of formData.entries()) {
  console.log("➡️", key, value instanceof File ? `[File: ${value.name}]` : value);
}



  

try {
  setUploading(true);
  setUploadProgress(0);

  const res = await axios.put(`${API_BASE_URL}/api/products/${id}`, formData, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (evt) => {
      const percent = Math.round((evt.loaded * 100) / evt.total);
      setUploadProgress(percent);
    },
  });

    alert("✅ Cập nhật thành công!");
    navigate("/admin/products");
  } catch (err) {
    console.error("❌ Lỗi khi cập nhật:", err.response?.data || err.message);
    alert("❌ Lỗi khi cập nhật sản phẩm!");
  } finally {
    setUploading(false);
    setUploadProgress(0);
  }
};


  return (

    
    <div className="container mt-4">
      {uploading && (
  <div className="modal-backdrop show d-flex justify-content-center align-items-center" style={{ zIndex: 1050 }}>
    <div className="bg-white p-4 rounded shadow text-center" style={{ width: "300px" }}>
      <h5>Đang tải dữ liệu...</h5>
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

      <h2>✏️ Chỉnh sửa sản phẩm</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* ---- Thông tin chung ---- */}
        <div className="mb-3">
          <label className="form-label fw-bold">Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Danh mục</label>
          <select
            name="categoryId"
            className="form-select"
            value={form.categoryId}
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
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Mô tả</label>
          <textarea
            name="description"
            className="form-control"
            rows="4"
            value={form.description}
            onChange={handleChange}
            placeholder="Nhập mô tả sản phẩm..."
          />
        </div>

        <hr />
        <h5>🧩 Danh sách biến thể</h5>

        {variants.map((v, i) => (
          <div key={i} className="border p-3 mb-3 rounded">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6>🔹 Biến thể {i + 1}</h6>
              {v.id && <small className="text-muted">ID: {v.id}</small>}
            </div>

            {(v.previewImage || v.imageUrl) && (
              <div className="mb-2">
                <img
                  src={v.previewImage || 
     (v.imageUrl?.startsWith("http") ? v.imageUrl : `${API_BASE_URL}${v.imageUrl}`)}

                  alt={v.name}
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 5,
                  }}
                />
              </div>
            )}

            <label className="form-label">Tên biến thể</label>
            <input
              type="text"
              className="form-control mb-2"
              value={v.name}
              onChange={(e) =>
                handleVariantChange(i, "name", e.target.value)
              }
              required
            />

            <label className="form-label">Giá (₫)</label>
            <input
              type="number"
              className="form-control mb-2"
              value={v.price}
              onChange={(e) =>
                handleVariantChange(i, "price", e.target.value)
              }
              required
            />

            <label className="form-label">Ảnh biến thể</label>
            <input
  type="file"
  accept="image/*"
  className="form-control mb-2"
  onChange={(e) => handleImageChange(i, e)}
/>

<label className="form-label">Ảnh trơn (clean image)</label>
<input
  type="file"
  accept="image/*"
  className="form-control mb-2"
  onChange={(e) => handleCleanImageChange(i, e)}
/>


            <label className="form-label">Model 3D (.glb / .gltf / .fbx)</label>
            <input
  type="file"
  accept=".glb,.gltf,.fbx"
  className="form-control mb-2"
  onChange={(e) => handleModelChange(i, e)}
/>


            <button
              type="button"
              className="btn btn-danger btn-sm mt-2"
              onClick={() => removeVariant(i)}
            >
              🗑️ Xóa biến thể
            </button>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-secondary mb-3"
          onClick={addVariant}
        >
          ➕ Thêm biến thể
        </button>

        <button type="submit" className="btn btn-primary w-100">
          💾 Lưu thay đổi
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
