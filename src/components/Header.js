import { useContext, useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";



const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const cartIconRef = useRef(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ✅ Lấy hàm & dữ liệu từ CartContext
  const { cartItems = [], removeFromCart, setCartItems } = useCart() || {};

  // ✅ Tính tổng số lượng & tổng tiền
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ Cập nhật số lượng
  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, Math.min(newQuantity, 99)) }
          : item
      )
    );
  };

  // ✅ Lưu cart vào localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 992) setMobileMenuOpen(false);
  };
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  // ✅ Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleOutside(e) {
      if (cartIconRef.current && !cartIconRef.current.contains(e.target)) {
        setCartOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
<header className="vs-header header-layout1 style2" style={{ backgroundColor: "#5a201d" }}>
  <div className="sticky-wrapper header-bottom shadow-sm" style={{ backgroundColor: "#5a201d" }}>
    <div className="sticky-active py-3" style={{ backgroundColor: "#5a201d" }}>
      <div className="container d-flex align-items-center justify-content-between">

        {/* LOGO */}
        <Link to="/" className="d-flex align-items-center gap-3 text-decoration-none">
          <img
            src="/assets/img/logo-04.svg"
            alt="Trúc Họa Viên"
            style={{ height: "48px", objectFit: "contain" }}
          />
        </Link>



{/* ✅ MOBILE MENU WRAPPER */}
{mobileMenuOpen && (
  <div
    className="vs-menu-overlay"
    onClick={() => setMobileMenuOpen(false)}
  >
    <div
      className="vs-menu-area text-center position-relative h-100 overflow-auto animate-slide-in" style={{backgroundColor:"#5a201d"}}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Logo + Close button */}
      <div className="mobile-logo d-flex justify-content-between align-items-center px-3 py-2 border-bottom" >
        <Link to="/" onClick={() => setMobileMenuOpen(false)}>
          <img
            src="/assets/img/logo-04.svg"
            alt="Trúc Họa Viên"
            style={{ height: "45px" }}
          />
        </Link>
        <button
          className="btn text-dark"
          onClick={() => setMobileMenuOpen(false)}
        >
          <i className="fa-solid fa-times fs-4"></i>
        </button>
      </div>

      {/* Menu items */}
<div className="vs-mobile-menu text-start p-4">
<ul className="list-unstyled mb-0 mobile-menu-list">
  <li>
    <Link to="/" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
      <i className="fa-solid fa-house"></i>
      <span style={{color:"#f8e9c6", marginLeft:"5px"}}>Trang chủ</span>
    </Link>
  </li>
  <li>
    <Link to="/shop" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
      <i className="fa-solid fa-store"></i>
      <span style={{color:"#f8e9c6", marginLeft:"5px", }}>Cửa hàng</span>
    </Link>
  </li>
  <li>
    <Link to="/about" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
      <i className="fa-solid fa-leaf"></i>
      <span style={{color:"#f8e9c6", marginLeft:"5px"}}>Về chúng tôi</span>
    </Link>
  </li>
  <li>
    <Link to="/policy" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
      <i className="fa-solid fa-scroll"></i>
      <span style={{color:"#f8e9c6", marginLeft:"5px"}}>Chính sách</span>
    </Link>
  </li>
  <li>
    <Link to="/contact" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
      <i className="fa-solid fa-envelope"></i>
      <span style={{color:"#f8e9c6", marginLeft:"5px"}}>Liên hệ</span>
    </Link>
  </li>
</ul>


 {user ? (
  // 🔒 Khi đã đăng nhập
  <div className="border-top mt-4 pt-4">
    <p className="text-light small mb-3 opacity-75">
      Xin chào, <strong>{user.username}</strong>
    </p>
    <Link
      to="/profile"
      onClick={() => setMobileMenuOpen(false)}
      className="mobile-menu-link"
    >
      <i className="fa-solid fa-user me-2"></i> Hồ sơ cá nhân
    </Link>
    <Link
      to="/my-orders"
      onClick={() => setMobileMenuOpen(false)}
      className="mobile-menu-link"
    >
      <i className="fa-solid fa-box me-2"></i> Đơn hàng của tôi
    </Link>
    <button
      onClick={() => {
        handleLogout();
        setMobileMenuOpen(false);
      }}
      className="btn btn-outline-light w-100 mt-3 fw-semibold"
    >
      <i className="fa-solid fa-right-from-bracket me-2"></i> Đăng xuất
    </button>
  </div>
) : (
  // 🔓 Khi chưa đăng nhập
  <div className="border-top mt-4 pt-4 text-center">
    <p className="text-light small mb-3 opacity-75">
      Bạn chưa đăng nhập
    </p>
    <Link
      to="/login"
      onClick={() => setMobileMenuOpen(false)}
      className="btn btn-light w-100 fw-semibold"
    >
      <i className="fa-solid fa-right-to-bracket me-2"></i> Đăng nhập
    </Link>
    <Link
      to="/register"
      onClick={() => setMobileMenuOpen(false)}
      className="btn btn-outline-light w-100 mt-2 fw-semibold"
    >
      <i className="fa-solid fa-user-plus me-2"></i> Đăng ký
    </Link>
  </div>
)}

</div>

    </div>
  </div>
)}




{/* MENU */}
<nav className="main-menu menu-style1 d-none d-lg-block">
  <ul className="d-flex align-items-center gap-4 list-unstyled mb-0">
    {[
      { path: "/", label: "Home" },
      { path: "/shop", label: "Shop" },
      { path: "/about", label: "About Us" },
      { path: "/policy", label: "Policy" },
    ].map((item) => (
      <li key={item.path}>
        <Link
          to={item.path}
          className="fw-semibold text-decoration-none"
          style={{
            color: "rgba(255,255,255,0.9)",
            fontSize: "1.05rem",
            letterSpacing: "0.3px",
            padding: "6px 10px",
            borderRadius: "8px",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#b7e4c7";
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.9)";
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          {item.label}
        </Link>
      </li>
    ))}
  </ul>
</nav>


        {/* ACTIONS: USER + CART */}
        <div className="d-flex align-items-center gap-3">

          {/* 👤 USER */}
          <div className="dropdown d-none d-lg-block">
            {user ? (
              <>
                <button
                  className="btn btn-outline-light d-flex align-items-center gap-2 px-3 py-2 rounded-pill"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    borderColor: "rgba(255,255,255,0.3)",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  }}
                >
                  <i className="fa-solid fa-user"></i>
                  <span className="fw-semibold">{user?.username || "Tài khoản"}</span>
                  <i className="fa-solid fa-caret-down small"></i>
                </button>

                <ul
                  className="dropdown-menu dropdown-menu-end mt-2 shadow-sm border-0 rounded-4 overflow-hidden"
                  aria-labelledby="userDropdown"
                  style={{ minWidth: "200px" }}
                >
                  <li>
                    <Link className="dropdown-item py-2 d-flex align-items-center" to="/profile">
                      <i className="fa-solid fa-user-circle me-2 text-secondary"></i>
                      Hồ sơ cá nhân
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item py-2 d-flex align-items-center" to="/my-orders">
                      <i className="fa-solid fa-box-open me-2 text-secondary"></i>
                      Đơn hàng của tôi
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider my-1" /></li>
                  <li>
                    <button
                      className="dropdown-item py-2 text-danger d-flex align-items-center"
                      onClick={handleLogout}
                    >
                      <i className="fa-solid fa-right-from-bracket me-2"></i>
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </>
            ) : (
              <Link
                to="/login"
                className="btn btn-outline-light rounded-pill px-3 py-2 d-flex align-items-center gap-2"
                style={{
                  borderColor: "rgba(255,255,255,0.3)",
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
              >
                <i className="fa-solid fa-user"></i>
                <span className="fw-semibold">Đăng nhập</span>
              </Link>
            )}
          </div>

          {/* 🛒 CART */}
          <div className="header-inner">
          <div className="header-buttons">
<div className="header-cart" ref={cartIconRef}>
<button
  type="button"
  className="cart-icon-btn position-relative border-0 bg-transparent"
  onClick={() => setCartOpen((s) => !s)}
>
  <i ref={cartIconRef} className="fa-solid fa-basket-shopping"></i>
  {cartCount > 0 && <span className="badge">{cartCount}</span>}
</button>


  {cartOpen && (
    <div className="woocommerce widget_shopping_cart">
      <div className="widget_shopping_cart_content">
        <ul className="cart_list">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <li key={item.productId} className="mini_cart_item">
                {/* Nút xóa */}
                <button
                  className="remove border-0 bg-transparent"
                  onClick={() => removeFromCart(item.productId)}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>

                {/* Hình ảnh */}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/shop/${item.productId}/${item.variantId}`);
                  }}
                  className="img"
                >
                  <img
                    src={
                      item.imageUrl?.startsWith("http")
                        ? item.imageUrl
                        : `http://localhost:5186${item.imageUrl}`
                    }
                    alt={item.productName}
                  />
                </a>

                {/* Tên + giá */}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/product/${item.productId}`);
                  }}
                  className="product-title"
                >
                  {item.productName}
                </a>
                <span className="amount">{item.price.toLocaleString()}₫</span>

                {/* Số lượng */}
                <div className="quantity">
                  <button
                    className="quantity-minus qut-btn"
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  >
                    <i className="fa-solid fa-minus" style={{ color: "#8B4513" }}></i>
                  </button>
                  <input
                    type="number"
                    className="qty-input"
                    value={item.quantity}
                    min="1"
                    max="99"
                    onChange={(e) =>
                      updateQuantity(item.productId, parseInt(e.target.value) || 1)
                    }
                  />
                  <button
                    className="quantity-plus qut-btn"
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  >
                    <i className="fa-solid fa-plus" style={{ color: "#8B4513" }}></i>


                  </button>
                </div>
                    <br/>
                {/* Tổng phụ từng sản phẩm */}
                <div className="subtotal">
                  <span>Tổng: </span>
                  <span className="amount">
                    {(item.price * item.quantity).toLocaleString()}₫
                  </span>
                </div>
              </li>
            ))
          ) : (
            <li
  className="mini_cart_item"
  style={{
    color: "#5a201d",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "1rem",
    padding: "20px 0",
  }}
>
  Chưa có gì trong giỏ hàng
</li>

          )}
        </ul>

        {/* Tổng cộng */}
        <p className="total">
          <strong>Tổng cộng:</strong>{" "}
          <span className="amount">{total.toLocaleString()}₫</span>
        </p>

        {/* Nút hành động */}
        <p className="buttons d-flex gap-2">
          <Link to="/cart" className="vs-btn flex-fill text-center">
            View cart
          </Link>
          <Link to="/checkout" className="vs-btn checkout flex-fill text-center">
            Checkout
          </Link>
        </p>
      </div>
    </div>
  )}
</div>
</div>
</div>


                  {/* MOBILE MENU TOGGLE */}
<button
  className="btn text-white d-lg-none"
  onClick={() => setMobileMenuOpen(true)}
>
  <i className="fa-solid fa-bars fs-4"></i>
</button>

        </div>
      </div>
    </div>
  </div>
</header>

  );
};

export default Header;
