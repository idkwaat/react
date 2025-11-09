import { useState } from "react";
import axios from "axios";

export default function ChangePassword() {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "" });
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5186";

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // ✅ lấy token
      if (!token) {
        alert("Bạn chưa đăng nhập!");
        return;
      }

      await axios.put(`${API_BASE_URL}/api/profile/change-password`, form, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ gửi token
        },
      });

      alert("✅ Đổi mật khẩu thành công!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "❌ Lỗi đổi mật khẩu");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Mật khẩu hiện tại</label>
        <input
          name="currentPassword"
          type="password"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Mật khẩu mới</label>
        <input
          name="newPassword"
          type="password"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-primary">Đổi mật khẩu</button>
    </form>
  );
}
