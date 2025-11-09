import { useContext, useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";



const Header = () => {
  const { user, token, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const cartIconRef = useRef(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ✅ Lấy hàm & dữ liệu từ CartContext
  const { cartItems = [], removeFromCart, setCartItems } = useCart() || {};

  // ✅ Tính tổng số lượng & tổng tiền
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
const total = cartItems.reduce(
  (sum, item) => sum + (item.price + (item.engravingFee || 0)) * item.quantity,
  0
);

const handleCheckout = async () => {
  if (!user) {
    await alert("⚠️ Vui lòng đăng nhập để tiếp tục thanh toán!", "warning");
    navigate("/login", { state: { from: "/checkout" } });
    return;
  }

  navigate("/checkout");
};



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
      { path: "/", label: "Trang Chủ" },
      { path: "/shop", label: "Sản Phẩm" },
      { path: "/about", label: "Về Chúng Tôi" },
      { path: "/policy", label: "Chính Sách" },
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
{/* 🛒 CART */}
<div className="header-inner">
  <div className="header-buttons">
    <div className="header-cart" ref={cartIconRef}>
      <button
        type="button"
        className="cart-icon-btn position-relative border-0 bg-transparent"
        onClick={() => setCartOpen((s) => !s)}
      >
        <i className="fa-solid fa-basket-shopping"></i>
        {cartCount > 0 && <span className="badge">{cartCount}</span>}
      </button>

      {cartOpen && (
        <div className="woocommerce widget_shopping_cart">
          <div className="widget_shopping_cart_content">
            <ul className="cart_list">
              {cartItems.length > 0 ? (
                cartItems.map((item) => {
                  const engravingFee = item.engravingFee || 0;
                  const unitPrice = (item.price || 0) + engravingFee;
                  const subtotal = unitPrice * (item.quantity || 1);

                  return (
<li
  key={`${item.productId}-${item.variantId}-${item.engravingText || "noengrave"}`}
  className="mini_cart_item"
  style={{
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    position: "relative",
    paddingRight: "20px",
    marginBottom: "14px",
  }}
>
  {/* Nút xóa */}
  <button
    className="remove border-0 bg-transparent"
    onClick={() => removeFromCart(item.productId, item.variantId)}
    aria-label="Remove item"
    style={{
      position: "absolute",
      top: "4px",
      right: "4px",
      color: "#5a201d",
      fontSize: "16px",
      cursor: "pointer",
    }}
  >
    <i className="fa-solid fa-xmark"></i>
  </button>

  {/* Hình ảnh */}
<a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    const path = item.variantId
      ? `/shop/${item.productId}/${item.variantId}`
      : `/shop/${item.productId}`;
    navigate(path);
  }}
  className="img"
  style={{ flexShrink: 0 }}
>
  <img
    src={
      (item.image && item.image.startsWith?.("http"))
        ? item.image
        : item.imageUrl?.startsWith?.("http")
        ? item.imageUrl
        : item.image
        ? `http://localhost:5186${item.image}`
        : item.imageUrl
        ? `http://localhost:5186${item.imageUrl}`
        : "/placeholder.png"
    }
    alt={item.productName || item.name || "Product"}
    style={{
      width: 64,
      height: 64,
      objectFit: "cover",
      borderRadius: 6,
      display: "block",
    }}
  />
</a>

  {/* Thông tin */}
  <div
    className="cart-item-info"
    style={{
      display: "flex",
      flexDirection: "column",
      flex: 1,
      minWidth: 0,
    }}
  >
<a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    const path = item.variantId
      ? `/shop/${item.productId}/${item.variantId}`
      : `/shop/${item.productId}`;
    navigate(path);
  }}
  className="product-title"
  style={{
    display: "inline-block",
    fontWeight: 600,
    color: "#3b1c1c",
    textDecoration: "none",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "100%",
    paddingRight: "16px",
  }}
  title={item.productName || item.name}
>
  {(item.productName || item.name || "")
    .replace(/(.+)\s-\s\1/, "$1")}
  {item.engravingText && " (Khắc)"}
</a>

    {/* Chữ khắc (nếu có) */}
    {item.engravingText && (
      <p className="text-muted m-0" style={{ fontSize: "0.85rem", paddingTop: "5px" }}>
        Chữ khắc: <strong>{item.engravingText}</strong>
      </p>
    )}


    {/* Giá đơn vị (đã gồm phụ phí khắc) */}
    <div style={{ marginTop: 6 }}>
      <span className="amount d-block">{unitPrice.toLocaleString()}₫</span>
    </div>

    {/* Số lượng */}
    <div
      className="quantity mt-2"
      style={{ display: "flex", alignItems: "center", gap: 8 }}
    >
      <button
        className="quantity-minus qut-btn"
        onClick={() =>
          updateQuantity(item.productId, Math.max(1, (item.quantity || 1) - 1))
        }
      >
        <i className="fa-solid fa-minus" style={{ color: "#8B4513" }}></i>
      </button>
      <input
        type="number"
        className="qty-input"
        value={item.quantity || 1}
        min="1"
        max="99"
        onChange={(e) =>
          updateQuantity(
            item.productId,
            Math.max(1, parseInt(e.target.value, 10) || 1)
          )
        }
        style={{ width: 48, textAlign: "center" }}
      />
      <button
        className="quantity-plus qut-btn"
        onClick={() =>
          updateQuantity(item.productId, (item.quantity || 1) + 1)
        }
      >
        <i className="fa-solid fa-plus" style={{ color: "#8B4513" }}></i>
      </button>
    </div>

    {/* Tổng phụ từng sản phẩm */}
    <div className="subtotal" style={{ marginTop: 6 }}>
      <span style={{ marginRight: 6 }}>Tổng:</span>
      <span className="amount">{subtotal.toLocaleString()}₫</span>
    </div>
  </div>
</li>

                  );
                })
              ) : (
                <li
                  className="mini_cart_item"
                  style={{
                    color: "#5a201d",
                    textAlign: "center",
                    fontWeight: 600,
                    fontSize: "1rem",
                    padding: "20px 0",
                  }}
                >
                  Chưa có gì trong giỏ hàng
                </li>
              )}
            </ul>

            {/* Tổng cộng */}
            <p className="total" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
              <strong>Tổng cộng:</strong>
              <span className="amount">
                {cartItems.reduce((sum, it) => sum + ((it.price || 0) + (it.engravingFee || 0)) * (it.quantity || 1), 0).toLocaleString()}₫
              </span>
            </p>

            {/* Nút hành động */}
            <p className="buttons d-flex gap-2" style={{ marginTop: 12 }}>
              <Link to="/cart" className="vs-btn flex-fill text-center">
                View cart
              </Link>
 <button
      onClick={handleCheckout}
      className="vs-btn checkout flex-fill text-center"
    >
      Checkout
    </button>
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
