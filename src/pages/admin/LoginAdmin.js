import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
const API_BASE_URL = process.env.REACT_APP_API_URL;

const LoginAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        const token = data.token;
        const decoded = jwtDecode(token);
        const role =
          decoded.role ||
          decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        if (role !== "Admin") {
          alert("Bạn không có quyền truy cập admin!");
          return;
        }

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("username", decoded.sub);

        alert("Đăng nhập admin thành công!");
        window.location.href = "/admin";
      } else {
        alert(data || "Đăng nhập thất bại");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối đến server");
    }
  };

  return (
    <div className="wrapper d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="auth-content">
        <div className="card shadow-lg" style={{ width: "380px" }}>
          <div className="card-body text-center">
            <div className="mb-4">
              <img
                className="brand"
                src="/assets/img/bootstraper-logo.png"
                alt="Bootstraper logo"
                width="80"
              />
            </div>
            <h6 className="mb-4 text-muted">Đăng nhập vào trang quản trị</h6>

            <form onSubmit={handleLogin}>
              <div className="mb-3 text-start">
                <label htmlFor="username" className="form-label">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Nhập tên đăng nhập"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3 text-start">
                <label htmlFor="password" className="form-label">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3 text-start">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    name="remember"
                    type="checkbox"
                    id="check1"
                  />
                  <label className="form-check-label" htmlFor="check1">
                    Ghi nhớ đăng nhập
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 mb-3"
              >
                Đăng nhập
              </button>
            </form>

            <p className="mb-2 text-muted">
              Quên mật khẩu? <a href="#">Khôi phục</a>
            </p>
            <p className="mb-0 text-muted">
              Chưa có tài khoản? <a href="/signup">Đăng ký</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
