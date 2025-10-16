import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ModelViewer from "../../components/ModelViewer";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5186";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/products`);
      if (!res.ok) throw new Error("Lỗi khi tải danh sách sản phẩm");
      const data = await res.json();

      // ✅ Lấy đúng danh sách sản phẩm
      setProducts(data.data || []);
    } catch (err) {
      console.error(err);
      alert("⚠️ Không thể tải sản phẩm từ server!");
    }
  };


  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")) return;
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        alert("✅ Đã xóa thành công!");
        fetchProducts();
      } else {
        alert("❌ Xóa thất bại!");
      }
    } catch (err) {
      alert("⚠️ Không thể kết nối đến server.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">📦 Danh sách sản phẩm</h2>
        <Link to="/admin/products/create" className="btn btn-primary">
          ➕ Thêm sản phẩm
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered align-middle text-center">
          <thead className="table-light">
            <tr>
              <th style={{ width: "50px" }}>ID</th>
              <th>Tên sản phẩm</th>
              <th>Biến thể (Ảnh & Model)</th>
              <th>Danh mục</th>
              <th>Mô tả</th>
              <th style={{ width: "150px" }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td className="fw-semibold">{p.name}</td>

                  {/* Biến thể */}
                  <td>
                    {p.variants && p.variants.length > 0 ? (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center",
                          gap: "15px",
                        }}
                      >
                        {p.variants.map((v) => (
                          <div
                            key={v.id}
                            style={{
                              border: "1px solid #ddd",
                              borderRadius: "10px",
                              padding: "10px",
                              width: "160px",
                              background: "#fafafa",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                            }}
                          >
                            <div style={{ fontWeight: 500, marginBottom: "6px" }}>
                              {v.name.replace(`${p.name} - `, "")}
                            </div>

                            {v.imageUrl ? (
                              <div
                                style={{
                                  width: "100%",
                                  aspectRatio: "1 / 1", // ✅ khung vuông
                                  borderRadius: "10px",
                                  overflow: "hidden",
                                  background: "#f8f8f8",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  border: "1px solid #eee",
                                  marginBottom: "8px",
                                }}
                              >
                                <img
                                  src={`${API_BASE_URL}${v.imageUrl}`}
                                  alt={v.name}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover", // giữ tỉ lệ, lấp khung
                                  }}
                                />
                              </div>
                            ) : (
                              <div
                                style={{
                                  width: "100%",
                                  aspectRatio: "1 / 1",
                                  borderRadius: "10px",
                                  background: "#f0f0f0",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "#aaa",
                                  fontSize: "0.9rem",
                                  marginBottom: "8px",
                                }}
                              >
                                Không ảnh
                              </div>
                            )}

                            {v.modelUrl ? (
                              <div
                                style={{
                                  width: "100%",
                                  aspectRatio: "1 / 1", // ✅ khung vuông
                                  borderRadius: "10px",
                                  background: "#fff",
                                  border: "1px solid #ddd",
                                  overflow: "hidden",
                                  position: "relative",
                                }}
                              >
                                <model-viewer
                                  src={`${API_BASE_URL}${v.modelUrl}`}
                                  camera-controls
                                  auto-rotate
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    background: "transparent",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                  }}
                                />
                              </div>
                            ) : (
                              <div
                                style={{
                                  width: "100%",
                                  aspectRatio: "1 / 1",
                                  borderRadius: "10px",
                                  background: "#f3f3f3",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "#aaa",
                                  fontSize: "0.9rem",
                                }}
                              >
                                Không có model
                              </div>
                            )}

                          </div>
                        ))}
                      </div>
                    ) : (
                      <i>Không có biến thể</i>
                    )}
                  </td>

                  <td>{p.categoryName || "-"}</td>

                  <td
                    style={{
                      maxWidth: "200px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    title={p.description}
                  >
                    {p.description || "-"}
                  </td>

                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Link
                        to={`/admin/products/edit/${p.id}`}
                        className="btn btn-sm btn-warning"
                      >
                        ✏️ Sửa
                      </Link>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(p.id)}
                      >
                        🗑️ Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  💤 Chưa có sản phẩm nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
