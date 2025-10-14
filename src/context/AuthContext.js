import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // ✅ Khởi tạo từ localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const { exp } = JSON.parse(atob(storedToken.split(".")[1]));
        if (Date.now() >= exp * 1000) {
          logout();
        } else {
          setToken(storedToken);
          const decoded = jwtDecode(storedToken);
          const userData = {
            id: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
            username: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
            role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
          };
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        }
      } catch {
        logout();
      }
    }
  }, []);

  // ✅ Đăng nhập
 const login = (jwtToken) => {
  try {
    const decoded = jwtDecode(jwtToken);
    const userData = {
      id: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
      username: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
    };

    localStorage.setItem("token", jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(jwtToken);
    setUser(userData);

    // 👇 THÊM DÒNG NÀY để cập nhật Header và Cart
    window.dispatchEvent(new Event("authChanged"));
  } catch (err) {
    console.error("Token không hợp lệ:", err);
  }
};

const logout = () => {
  setToken(null);
  setUser(null);
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // 👇 THÊM DÒNG NÀY để cập nhật Header và Cart
  window.dispatchEvent(new Event("authChanged"));
  window.location.reload();
};


  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
