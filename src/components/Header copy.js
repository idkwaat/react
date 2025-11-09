import { useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const cartIconRef = useRef(null);

  // ✅ Lấy hàm & dữ liệu từ CartContext
  const { cartItems = [], removeFromCart, setCartItems } = useCart() || {};

  // ✅ Tính tổng số lượng & tổng tiền
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ Hàm cập nhật số lượng
  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, Math.min(newQuantity, 99)) }
          : item
      )
    );
  };

  // ✅ Lưu cart vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

    // 👇 Lắng nghe sự kiện login/logout để cập nhật Header ngay
  useEffect(() => {
    const handleAuthChange = () => {
      // ép React render lại bằng cách cập nhật 1 state ảo hoặc reload nhẹ
      navigate(0); // cách nhanh gọn nhất
    };

    window.addEventListener("authChanged", handleAuthChange);
    return () => window.removeEventListener("authChanged", handleAuthChange);
  }, [navigate]);

  // ✅ Đăng xuất
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
      <header className="vs-header header-layout1 style2">
   <div className="header-top">
      <div className="container">
        <div className="row justify-content-md-between justify-content-center align-items-center">
          <div className="col-auto">
            <div className="header-links d-md-inline d-none">
              <ul>
                <li>
                  <i className="fa-solid fa-truck-fast"></i> Đặt Một Phút, Giao Một Giây
                </li>
              </ul>
            </div>
          </div>

          <div className="col-auto">
            <div className="header-right d-flex align-items-center gap-3">
              {/* Dropdown chọn ngôn ngữ */}
              <div className="dropdown">
                
                  <span className="globe-icon" style={{marginRight: "5px"}}>
                    <i className="fal fa-globe"></i>
                  </span>
                  Tiếng Việt

              </div>

              {/* Social icons */}
              <div className="header-social">
                <a href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>

              {/* User Login */}
<div className="user-login">
                  {user ? (
                    <div className="dropdown user-dropdown">
  <a
    className="dropdown-toggle d-flex align-items-center px-3 py-2 rounded"
    href="#"
    role="button"
    id="userDropdown"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    style={{
      color: "#fff",
      textDecoration: "none",
      backgroundColor: "rgba(255,255,255,0.1)",
      borderRadius: "8px",
      transition: "background-color 0.2s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)")}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
  >
    <i className="fa-solid fa-user me-2"></i>
    <span
  style={{
    fontWeight: 600,
    color: "white",
    marginLeft: "8px"  // 👈 Dịch sang phải một chút
  }}
>
  {user?.username || user?.name || "Guest"}
</span>
  </a>

<ul
  className="dropdown-menu dropdown-menu-end mt-2 shadow-sm border-0 rounded-3"
  aria-labelledby="userDropdown"
  style={{ minWidth: "180px" }}
>
  <li>
    <Link className="dropdown-item py-2" to="/profile">
      <i className="fa-solid fa-user me-2"></i>
      Hồ sơ cá nhân
    </Link>
  </li>

  <li>
    <Link className="dropdown-item py-2" to="/my-orders">
      <i className="fa-solid fa-box-open me-2"></i>
      Đơn hàng của tôi
    </Link>
  </li>

  <li>
    <hr className="dropdown-divider" />
  </li>

  <li>
    <button
      className="dropdown-item text-danger py-2"
      onClick={handleLogout}
    >
      <i className="fa-solid fa-right-from-bracket me-2"></i>
      Đăng xuất
    </button>
  </li>
</ul>

</div>

                  ) : (
                    <a
                      href="#"
                      onClick={() => navigate("/login")}
                      title="Đăng nhập"
                    >
                      <i className="fa-solid fa-user"></i>
                    </a>
                  )}
                </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="header-middle" style={{backgroundColor: "#539d5d"}}>
      <div className="container">
        <div className="row justify-content-sm-between justify-content-center align-items-center gx-sm-0">
          <div className="col-auto">
            <div className="header-logo">
              <a href="/"><img src="/assets/img/logo-04.svg" alt="Ebukz" className="logo" style={{ height: "55px", width: "auto" }}/></a>
            </div>
          </div>
          <div className="col-auto">
            <div className="header-inner">
              <form className="header-search">
                <button className="searchBoxTggler" aria-label="search-button">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                <div className="d-flex align-items-center">
                  <div className="dropdown">
                    <div className="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                      Danh Mục
                    </div>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><a className="dropdown-item" href="#">Action</a></li>
                      <li><a className="dropdown-item" href="#">Another action</a></li>
                      <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                  </div>
                  <input type="text" placeholder="Timgf"/>
                </div>
              </form>
              <div className="header-buttons">
                <a href="wishlist.html" className="vs-icon wishlist" style={{ visibility: "hidden" }}><i className="fal fa-heart"></i></a>
                <div className="header-info">
                  <div className="header-info_icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="media-body">
                    <span className="header-info_label">Call Us 24/7</span>
                    <div className="header-info_link"><a href="tel:+1234567890">(00) 3349 0491 887</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="sticky-wrapper header-bottom">
      <div className="sticky-active">
        <div className="container">
          <div className="menu-top">
            <div className="row justify-content-between align-items-center gx-sm-0">
              <div className="col-auto">
                <div className="menu-inner">
                  <div className="header-category">
                    <button className="category-toggler"><i className="fa-solid fa-bars-sort"></i>Categories</button>
                    <div className="vs-box-nav">
                      <ul>
                        <li><a href="shop.html"><img src="assets/img/icons/categori-i-1.svg" alt="icon"/>Romance</a></li>
                        <li><a href="shop.html"><img src="assets/img/icons/categori-i-2.svg" alt="icon"/>Thriller</a></li>
                        <li><a href="shop.html"><img src="assets/img/icons/categori-i-3.svg" alt="icon"/>Fantasy</a></li>
                        <li><a href="shop.html"><img src="assets/img/icons/categori-i-4.svg" alt="icon"/>Since Fiction</a></li>
                        <li><a href="shop.html"><img src="assets/img/icons/categori-i-5.svg" alt="icon"/>Since</a></li>
                        <li><a href="shop.html"><img src="assets/img/icons/categori-i-6.svg" alt="icon"/>Adventure</a></li>
                        <li><a href="shop.html"><img src="assets/img/icons/categori-i-7.svg" alt="icon"/>Kids</a></li>
                        <li><a href="shop.html"><img src="assets/img/icons/categori-i-8.svg" alt="icon"/>cartoon & Story</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="header-logo">
                    <a href="index.html"><img src="assets/img/dark-logo.svg" alt="Ebukz" className="logo"/></a>
                  </div>
                  <div className="menu-area">
                    <nav className="main-menu menu-style1 d-none d-lg-block">
                      <ul>
                        <li className="menu-item-has-children">
                          <a href="/">Home</a>
                        </li>
                        <li className="menu-item-has-children">
                          <Link to="/shop">Shop</Link>
                        
                        </li>
                        <li className="menu-item-has-children">
                          <Link to="/About">About us</Link>
                        </li>
                        <li className="menu-item-has-children mega-menu-wrap">
                          <a href="#">Pages</a>
                          <ul className="mega-menu">
                            <li><a href="shop.html">Page List 1</a>
                              <ul>
                                <li><a href="index.html">Home 1</a></li>
                                <li><a href="index-2.html">Home 2</a></li>
                                <li><a href="index-3.html">Home 3</a></li>
                                <li><a href="about.html">About</a></li>
                                <li><a href="contact.html">Contact</a></li>
                              </ul>
                            </li>
                            <li><a href="#">Page List 2</a>
                              <ul>
                                <li><a href="blog.html">Blog</a></li>
                                <li><a href="blog-sidebar.html">Blog Sidebar</a></li>
                                <li><a href="blog-sidebar-2.html">Blog Sidebar 2</a></li>
                                <li><a href="Blog-Standard.html">Blog Standard</a></li>
                                <li><a href="blog-details.html">Blog Details</a></li>
                              </ul>
                            </li>
                            <li><a href="#">Page List 3</a>
                              <ul>
                                <li><a href="cart.html">Cart</a></li>
                                <li><a href="shop.html">Shop</a></li>
                                <li><a href="shop-sidebar.html">Shop Sidebar</a></li>
                                <li><a href="shop-details.html">Shop Details</a></li>
                                <li><a href="404.html">Error Page</a></li>
                              </ul>
                            </li>
                            <li><a href="#">Page List 4</a>
                              <ul>
                                <li><a href="wishlist.html">wishlist</a></li>
                                <li><a href="checkout.html">checkout</a></li>
                                <li><a href="author.html">All Authors</a></li>
                                <li><a href="author-details.html">Author Details</a></li>
                                <li><a href="vendor.html">Vendor</a></li>
                                <li><a href="vendor-details.html">Vendor Details</a></li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item-has-children">
                          <a href="blog.html">Blog</a>
                          <ul className="sub-menu">
                            <li><a href="blog.html">Blog</a></li>
                            <li><a href="blog-sidebar.html">Blog Sidebar</a></li>
                            <li><a href="blog-sidebar-2.html">Blog Sidebar 2</a></li>
                            <li><a href="Blog-Standard.html">Blog Standard</a></li>
                            <li><a href="blog-details.html">Blog Details</a></li>
                          </ul>
                        </li>
                        <li>
                          <a href="contact.html">Contact</a>
                        </li>
                      </ul>
                    </nav>
                    <button className="vs-menu-toggle d-inline-block d-lg-none"><i className="fal fa-bars"></i></button>
                  </div>
                </div>
              </div>
 <div className="col-auto d-xl-block d-none">
                  <div className="header-cart" ref={cartIconRef} id="cart-icon">
                    <a href="/cart" className="vs-icon has-badge">
                      <i className="fa-solid fa-basket-shopping"></i>
                      <span className="badge">{cartCount}</span>
                    </a>

                    {cartItems.length > 0 && (
                      <div className="woocommerce widget_shopping_cart">
                        <div className="widget_shopping_cart_content">
                          <ul className="cart_list">
                            {cartItems.map((item) => (
                              <li
                                className="mini_cart_item"
                                key={item.productId}
                              >
                                <button
                                  className="remove"
                                  onClick={() => removeFromCart(item.productId)}
                                >
                                  <i className="far fa-times"></i>
                                </button>

                                <a
                                  href={`/product/${item.productId}`}
                                  className="img"
                                >
                                  <img
                                    src={
                                      item.imageUrl?.startsWith("http")
                                        ? item.imageUrl
                                        : `http://localhost:5186${item.imageUrl}`
                                    }
                                    alt={item.productName}
                                    width="50"
                                    height="50"
                                  />
                                </a>

                                <a
                                  href={`/product/${item.productId}`}
                                  className="product-title"
                                >
                                  {item.productName}
                                </a>

                                <span className="amount">
                                  {item.price.toLocaleString()}₫
                                </span>

                                {/* ✅ Quantity Control */}
                                <div className="quantity">
                                  <button
                                    className="quantity-minus qut-btn"
                                    onClick={() =>
                                      updateQuantity(
                                        item.productId,
                                        item.quantity - 1
                                      )
                                    }
                                  >
                                    <i className="far fa-minus"></i>
                                  </button>

                                  <input
                                    type="number"
                                    className="qty-input"
                                    value={item.quantity}
                                    min="1"
                                    max="99"
                                    onChange={(e) =>
                                      updateQuantity(
                                        item.productId,
                                        parseInt(e.target.value) || 1
                                      )
                                    }
                                  />

                                  <button
                                    className="quantity-plus qut-btn"
                                    onClick={() =>
                                      updateQuantity(
                                        item.productId,
                                        item.quantity + 1
                                      )
                                    }
                                  >
                                    <i className="far fa-plus"></i>
                                  </button>
                                </div>

                                <div className="subtotal">
                                  <span>Subtotal:</span>
                                  <span className="amount">
                                    {(
                                      item.price * item.quantity
                                    ).toLocaleString()}
                                    ₫
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ul>

                          <p className="total">
                            <strong>Total:</strong>{" "}
                            <span className="amount">
                              {total.toLocaleString()}₫
                            </span>
                          </p>

                          <p className="buttons">
                            <Link to="/cart" className="vs-btn">
                              View cart
                            </Link>
                            <Link to="/checkout" className="vs-btn checkout">
                              Checkout
                            </Link>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  );
};

export default Header;
