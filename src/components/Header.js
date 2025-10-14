import { useContext, useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const cartIconRef = useRef(null);
  const [cartOpen, setCartOpen] = useState(false);

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
<header className="vs-header header-layout1 style2" style={{ backgroundColor: "#1b4332" }}>
  <div className="sticky-wrapper header-bottom shadow-sm" style={{ backgroundColor: "#1b4332" }}>
    <div className="sticky-active py-3" style={{ backgroundColor: "#1b4332" }}>
      <div className="container d-flex align-items-center justify-content-between">

        {/* LOGO */}
        <Link to="/" className="d-flex align-items-center gap-3 text-decoration-none">
          <img
            src="/assets/img/logo-04.svg"
            alt="Trúc Họa Viên"
            style={{ height: "48px", objectFit: "contain" }}
          />
        </Link>

{/* MENU */}
<nav className="main-menu menu-style1 d-none d-lg-block">
  <ul className="d-flex align-items-center gap-4 list-unstyled mb-0">
    {[
      { path: "/", label: "Home" },
      { path: "/shop", label: "Shop" },
      { path: "/about", label: "About Us" },
      { path: "/contact", label: "Contact" },
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
          <div className="dropdown">
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
          <div className="dropdown" ref={cartIconRef}>
            <button
              type="button"
              className="btn btn-link text-white position-relative p-0 border-0"
              onClick={() => setCartOpen((s) => !s)}
            >
              <i className="fa-solid fa-basket-shopping fs-5"></i>
              {cartCount > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
                  {cartCount}
                </span>
              )}
            </button>

            {cartItems.length > 0 && (
              <div
                className={`dropdown-menu dropdown-menu-end p-3 shadow-sm ${cartOpen ? "show" : ""}`}
                style={{ minWidth: 320 }}
              >
                <ul className="list-unstyled mb-3" style={{ maxHeight: 300, overflowY: "auto" }}>
                  {cartItems.map((item) => (
                    <li key={item.productId} className="d-flex align-items-center mb-3 border-bottom pb-2">
                      <img
                        src={
                          item.imageUrl?.startsWith("http")
                            ? item.imageUrl
                            : `http://localhost:5186${item.imageUrl}`
                        }
                        alt={item.productName}
                        width="55"
                        height="55"
                        className="rounded"
                        style={{ objectFit: "cover" }}
                      />
                      <div className="ms-3 flex-grow-1">
                        <Link
                          to={`/product/${item.productId}`}
                          className="text-dark fw-semibold text-decoration-none"
                        >
                          {item.productName}
                        </Link>
                        <div className="text-muted small">{item.price.toLocaleString()}₫</div>
                        <div className="d-flex align-items-center mt-1">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          >-</button>
                          <input
                            type="number"
                            value={item.quantity}
                            min="1"
                            max="99"
                            className="form-control form-control-sm mx-1 text-center"
                            style={{ width: 45 }}
                            onChange={(e) =>
                              updateQuantity(item.productId, parseInt(e.target.value) || 1)
                            }
                          />
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          >+</button>
                        </div>
                      </div>
                      <button
                        className="btn btn-sm btn-link text-danger ms-2"
                        onClick={() => removeFromCart(item.productId)}
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="d-flex justify-content-between align-items-center border-top pt-2">
                  <strong>Total:</strong>
                  <span className="fw-bold text-success">{total.toLocaleString()}₫</span>
                </div>

                <div className="d-flex gap-2 mt-3">
                  <Link to="/cart" className="btn btn-outline-success w-50">
                    View cart
                  </Link>
                  <Link to="/checkout" className="btn btn-success w-50">
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  </div>
</header>

  );
};

export default Header;
