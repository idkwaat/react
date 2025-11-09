import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5186";

const LoginClient = () => {
  const [identifier, setIdentifier] = useState(""); // Email hoặc số điện thoại
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: identifier,
        password,
      }),
      credentials: "include",
    });

    const data = await res.json();
    console.log("API Login Response:", data);

    if (res.ok) {
      const token = data.token || data.accessToken || data.jwt;
      if (!token) {
        await alert(" Không nhận được token từ server!"); // 👈 thêm await
        return;
      }

      localStorage.setItem("token", token);
      login(token);

      await alert("✅ Đăng nhập thành công!");
console.log("Alert đã đóng!"); // chỉ in ra sau khi bấm OK

      navigate("/"); // 👈 chỉ chạy sau khi bấm OK
    } else {
      await alert(data.message || " Đăng nhập thất bại!"); // 👈 thêm await
    }
  } catch (err) {
    console.error("Login Error:", err);
    await alert(" Sai tài khoản hoặc mật khẩu"); // 👈 thêm await
  }
};




  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, rgba(223, 226, 208, 0.95), rgba(151, 180, 126, 0.95))",
        padding: "40px",
      }}
    >
      <div
        className="bg-white rounded-4 shadow-lg p-5 w-100"
        style={{ maxWidth: "450px" }}
      >
        <h2 className="text-center fw-bold mb-4 text-dark">
          Đăng nhập tài khoản
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              className="form-control form-control-lg rounded-3"
              placeholder="Nhập username..."
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
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
            Đăng nhập
          </button>
        </form>

        <p className="text-center mt-4 mb-0 text-muted">
          Chưa có tài khoản?{" "}
          <a href="/register" className="text-decoration-none text-dark fw-semibold">
            Đăng ký ngay
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginClient;
