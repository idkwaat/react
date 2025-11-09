import { useEffect, useState } from "react";
import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5186";

export default function ProfileInfo() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Bạn cần đăng nhập để xem thông tin cá nhân.");
      return;
    }

    axios
      .get(`${API_BASE_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setForm(res.data))
      .catch(() => setError("Không thể tải thông tin người dùng."));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("Vui lòng đăng nhập!");

    try {
      await axios.put(`${API_BASE_URL}/api/profile`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Cập nhật thành công!");
    } catch {
      alert("❌ Lỗi khi cập nhật thông tin!");
    }
  };

  if (error) return <div className="alert alert-warning">{error}</div>;

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      {[
        { label: "Tên người dùng", name: "username" },
        { label: "Email", name: "email", type: "email" },
        { label: "Số điện thoại", name: "phone" },
        { label: "Địa chỉ", name: "address" },
      ].map((f) => (
        <div key={f.name} className="col-md-6">
          <label className="form-label fw-semibold">{f.label}</label>
          <input
            type={f.type || "text"}
            name={f.name}
            className="form-control rounded-pill border-1"
            value={form[f.name] || ""}
            onChange={handleChange}
          />
        </div>
      ))}

      <div className="col-12 mt-3 text-center">
        <button type="submit" className="vs-btn">
          Lưu thay đổi
        </button>
      </div>
    </form>
  );
}
