import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5186";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("❌ Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/auth/register`, {
        username,
        email,
        phone,
        password,
      });
      alert("✅ Đăng ký thành công!");
      navigate("/login");
      setUsername("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      alert("❌ Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "120vh",
        background:
          "linear-gradient(135deg, rgba(223, 226, 208, 0.95), rgba(151, 180, 126, 0.95))",
        padding: "40px",
      }}
    >
      <div
        className="bg-white rounded-4 shadow-lg p-5 w-100"
        style={{ maxWidth: "480px" }}
      >
        <h2 className="text-center fw-bold mb-4 text-dark">
          Đăng ký tài khoản
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Tên đăng nhập</label>
            <input
              type="text"
              className="form-control form-control-lg rounded-3"
              placeholder="Nhập tên đăng nhập..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control form-control-lg rounded-3"
              placeholder="Nhập địa chỉ email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Số điện thoại</label>
            <input
              type="tel"
              className="form-control form-control-lg rounded-3"
              placeholder="Nhập số điện thoại..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="[0-9]{10,11}"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Mật khẩu</label>
            <input
              type="password"
              className="form-control form-control-lg rounded-3"
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Xác nhận mật khẩu</label>
            <input
              type="password"
              className="form-control form-control-lg rounded-3"
              placeholder="Nhập lại mật khẩu..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="btn w-100 py-2 fw-semibold text-white"
            style={{
              backgroundColor: "#20161F",
              borderRadius: "12px",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#3b2d39")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#20161F")}
          >
            Đăng ký ngay
          </button>
        </form>

        <p className="text-center mt-4 mb-0 text-muted">
          Đã có tài khoản?{" "}
          <a href="/login" className="text-decoration-none text-dark fw-semibold">
            Đăng nhập
          </a>
        </p>
      </div>
    </div>
  );
}
