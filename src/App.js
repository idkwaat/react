import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "@fortawesome/fontawesome-free/css/all.min.css";


// 🔹 Layouts
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

// 🔹 Client Pages
import Home from "./pages/Home";
import About from "./pages/about";
import AuthorDetails from "./pages/author-details";
import Author from "./pages/author";
import BlogDetails from "./pages/blog-details";
import BlogSidebar from "./pages/blog-sidebar";
import BlogStandard from "./pages/blog-standard";
import Blog from "./pages/blog";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Contact from "./pages/contact";
import ShopDetails from "./pages/shop-details";
import Shop from "./pages/shop";
import VendorDetails from "./pages/vendor-details";
import Vendor from "./pages/vendor";
import Wishlist from "./pages/wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";


// 🔹 Admin Pages
import AdminPage from "./pages/admin/AdminPage";
import LoginAdmin from "./pages/admin/LoginAdmin";
import CategoryList from "./components/admin/CategoryList.js";
import CategoryCreate from "./components/admin/CategoryCreate.js";
import CategoryEdit from "./components/admin/CategoryEdit.js";
import ProductEdit from "./components/admin/ProductEdit.js";
import ProductCreate from "./components/admin/ProductCreate.js";
import ProductList from "./components/admin/ProductList.js";

// 🔹 Protected Route
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/profile/ProfilePage.js";
import OrderList from "./components/admin/OrderList.js";
import MyOrders from "./pages/myorders.js";
import OrderSuccess from "./pages/OrderSuccess.js";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5186";


function AppContent() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  // ✅ Kiểm tra xem route hiện tại có phải admin hay không
  const isAdminRoute = location.pathname.startsWith("/admin");

useEffect(() => {
  axios.post(`${API_BASE_URL}/api/dashboard/visit`).catch(() => {});
}, []);


useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      if (token.split(".").length === 3) {
        const payload = jwtDecode(token);

        const userRole =
          payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
          payload.role ||
          "";

        setIsAuthenticated(true);
        setRole(userRole);

        // ✅ Lưu role và token vào localStorage cho ProtectedRoute dùng
        localStorage.setItem("role", userRole);
        localStorage.setItem("token", token);
      } else {
        console.warn("⚠️ Token không hợp lệ hoặc chưa có:", token);
        setIsAuthenticated(false);
        setRole("");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      }
    } catch (err) {
      console.error("Token decode error:", err);
      setIsAuthenticated(false);
      setRole("");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  } else {
    console.warn("⚠️ Không có token trong localStorage");
    setIsAuthenticated(false);
    setRole("");
    localStorage.removeItem("role");
  }

  if (!isAdminRoute) {
    import("./assets/js/main.js");
  }
}, [isAdminRoute]);



  return (
    <>
      {isAdminRoute ? (
        // ========== ADMIN ROUTES ==========
        <AdminLayout>
          <Routes>
            <Route path="/admin/login" element={<LoginAdmin />} />

            {/* Khi vào /admin thì redirect */}
            <Route
  path="/admin"
  element={
    isAuthenticated ? (
role?.toLowerCase() === "admin" ? (
  <Navigate to="/admin/dashboard" />
) : (
  <Navigate to="/" />
)

    ) : (
      <Navigate to="/login" /> // nếu chưa đăng nhập
    )
  }
/>


            {/* Route được bảo vệ */}
            <Route path="/admin/dashboard" element={<ProtectedRoute requiredRole="Admin"><AdminPage /></ProtectedRoute>}/>
            <Route path="/admin/products" element={<ProtectedRoute requiredRole="Admin"><ProductList /></ProtectedRoute>}/>
            <Route path="/admin/products/create" element={<ProtectedRoute requiredRole="Admin"><ProductCreate /></ProtectedRoute>}/>
            <Route path="/admin/products/edit/:id" element={<ProtectedRoute requiredRole="Admin"><ProductEdit /></ProtectedRoute>}/>
            <Route path="/admin/categories"element={<ProtectedRoute requiredRole="Admin"><CategoryList /></ProtectedRoute>}/>
            <Route path="/admin/categories/create"element={<ProtectedRoute requiredRole="Admin"><CategoryCreate /></ProtectedRoute>}/>
            <Route path="/admin/categories/edit/:id"element={<ProtectedRoute requiredRole="Admin"><CategoryEdit /></ProtectedRoute>}/>
            <Route path="/admin/orders"element={<ProtectedRoute requiredRole="Admin"><OrderList /></ProtectedRoute>
  }
/>


            {/* Có thể thêm route admin khác ở đây */}
            {/* <Route path="/admin/products" element={<AdminProducts />} /> */}
          </Routes>
        </AdminLayout>
      ) : (
        // ========== CLIENT ROUTES ==========
        <MainLayout>
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/author-details" element={<AuthorDetails />} />
            <Route path="/author" element={<Author />} />
            <Route path="/blog-details" element={<BlogDetails />} />
            <Route path="/blog-sidebar" element={<BlogSidebar />} />
            <Route path="/blog-standard" element={<BlogStandard />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/policy" element={<Contact />} />
            <Route path="/shop/:productId/:variantId?" element={<ShopDetails />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/vendor-details" element={<VendorDetails />} />
            <Route path="/vendor" element={<Vendor />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/orders/:id/success" element={<OrderSuccess />} />

            <Route path="/unauthorized" element={<h2>Không có quyền truy cập</h2>} />
          </Routes>
        </MainLayout>
      )}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
