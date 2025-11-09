import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "animate.css";

window.alert = function (message, type = "info") {
  const colors = {
    success: "#5C9E7E", // xanh trúc
    error: "#C85C5C",   // đỏ gạch
    warning: "#D8A25E", // vàng đất
    info: "#5DA9E9",    // xanh ngọc
  };

  // 🔔 Tự động chọn loại alert theo nội dung
  const lower = message.toLowerCase();
  if (lower.includes("thành công")) type = "success";
  else if (lower.includes("lỗi")) type = "error";
  else if (lower.includes("cảnh báo")) type = "warning";

  // ⚡ QUAN TRỌNG: return Promise để await hoạt động
  return Swal.fire({
    title:
      type === "success"
        ? "Thành công!"
        : type === "error"
        ? "Lỗi rồi!"
        : type === "warning"
        ? "Cảnh báo!"
        : "Thông báo",
    text: message,
    icon: type,
    confirmButtonText: "Đã hiểu",
    confirmButtonColor: colors[type] || "#5C9E7E",
    background: "#fffdf8",
    color: "#333",
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
    customClass: {
      popup: "rounded-3xl shadow-lg border border-[#eee]",
      title: "font-semibold text-lg",
      confirmButton: "px-4 py-2 text-sm rounded-lg",
    },
  });
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <AuthProvider>
      <CartProvider>
    <App />
      </CartProvider>
    </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
