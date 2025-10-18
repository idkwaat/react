import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import PriceFilter from "../components/PriceFilter";
import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { useCart } from "../context/CartContext";


const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5186";

export default function Shop() {
  const [variants, setVariants] = useState([]);
  const [sortOption, setSortOption] = useState("recent_product");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [topProducts, setTopProducts] = useState([]);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { addToCart } = useCart();




  // 🔹 Gọi API sản phẩm (có tìm kiếm, phân trang, lọc)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/products?search=${encodeURIComponent(search)}&page=${page}&pageSize=9` +
          (selectedCategory ? `&categoryId=${selectedCategory}` : "") +
          (minPrice ? `&minPrice=${minPrice}` : "") +
          (maxPrice ? `&maxPrice=${maxPrice}` : "")
        );
        const data = await res.json();

        const products = data.data || [];
        const allVariants = products.flatMap((p) =>
          (p.variants || []).map((v) => ({
            ...v,
            productId: p.id,
            productName: p.name,
            averageRating: p.averageRating,
            reviewCount: p.reviewCount,
            categoryName: p.categoryName,
            productDescription: p.description,
          }))
        );

        setVariants(allVariants);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("❌ Fetch products error:", err);
      }
    };

    fetchProducts();
  }, [search, page, selectedCategory, minPrice, maxPrice]);

  // 🔹 Lấy danh mục
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/categories`)
      .then((res) => res.json())
      .then(setCategories)
      .catch((err) => console.error("❌ Fetch categories error:", err));
  }, []);

  // 🔹 Lấy top sản phẩm tháng (ngay cả khi chưa có ai mua)
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products/top-month`)
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Top tháng API response:", data);
        // nếu không có data hoặc data rỗng → fallback sang danh sách sản phẩm thường
        if (!data?.data?.length && !data?.Data?.length) {
          console.warn("⚠️ Không có top-month, fallback sang /api/products");
          return fetch(`${API_BASE_URL}/api/products?page=1&pageSize=5`)
            .then((res2) => res2.json())
            .then((fallbackData) => setTopProducts(fallbackData.data || []))
            .catch((err) => console.error("Fallback fetch error:", err));
        }
        setTopProducts(data.data || data.Data || []);
      })
      .catch((err) => console.error("❌ Fetch top-month error:", err));
  }, []);

  // 🔹 Sắp xếp sản phẩm
  const sortOptions = [
    { value: "recent_product", label: "Sắp xếp: Mới nhất" },
    { value: "price", label: "Giá: Thấp đến cao" },
    { value: "price-desc", label: "Giá: Cao đến thấp" },
  ];

  const sortedVariants = [...variants].sort((a, b) => {
    if (sortOption === "price") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    return b.id - a.id;
  });

  // 🔹 Style cho Select filter
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: "30px",
      border: "1px solid #ddd",
      boxShadow: state.isFocused ? "0 0 0 1px #222" : "none",
      minHeight: "45px",
      cursor: "pointer",
      "&:hover": { borderColor: "#999" },
    }),
  };

  // 🔹 Submit tìm kiếm
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    const input = e.target.elements.searchInput.value.trim();
    setSearch(input);
  };

  const handleFilter = () => {
    setPage(1);
  };
  // 🛒 Hàm thêm giỏ có hiệu ứng animation
  const handleAddToCart = (v) => {
    const cartItem = {
      productId: v.productId,
      variantId: v.id,
      productName: v.name,
      price: v.price ?? 0,
      quantity: 1,
      imageUrl: v.imageUrl,
    };

    addToCart(cartItem);

    // 🌟 Hiệu ứng +1 bay lên và rung icon giỏ
    // 🌟 Hiệu ứng +1 bay lên và rung icon giỏ
    // 🌟 Hiệu ứng +1 bay lên và rung icon giỏ
    const targetIcon =
      document.querySelector(".header-cart i.fa-basket-shopping") ||
      document.querySelector(".fa-solid.fa-basket-shopping"); // fallback cho Shop

    if (!targetIcon) {
      console.warn("Không tìm thấy icon giỏ hàng trên trang này");
      return;
    }


    const rect = targetIcon.getBoundingClientRect();
    const plusOne = document.createElement("div");
    plusOne.innerText = `+1`;
    plusOne.className = "plus-one-fly";
    plusOne.style.left = rect.left + rect.width / 2 + "px";
    plusOne.style.top = rect.top - 10 + "px";
    document.body.appendChild(plusOne);
    setTimeout(() => plusOne.remove(), 1000);

    targetIcon.classList.add("cart-shake");
    setTimeout(() => {
      targetIcon.classList.remove("cart-shake");
      targetIcon.classList.add("cart-gold");
      setTimeout(() => targetIcon.classList.remove("cart-gold"), 600);
    }, 600);
  };
  return (

    <section className="books-layout1 space-top space-extra-bottom relative" style={{ minHeight: "260vh" }}>
      <div className="container relative z-10">
        <div className="row g-4 position-relative">
          {/* ======== DANH SÁCH SẢN PHẨM ======== */}
          <div className={sidebarOpen ? "col-xl-8 col-lg-7" : "col-12"}>
            {/* ======== SORT BAR ======== */}
            <div className="vs-sort-bar mb-4">
              <div className="row align-items-center">
                <div className="col-md flex-grow-1">
                  <p className="woocommerce-result-count m-0">
                    Hiển thị <strong>{variants.length}</strong> sản phẩm
                  </p>
                </div>

                <div className="col-md-auto d-flex align-items-center gap-2">
                  <div style={{ minWidth: "220px" }}>
                    <Select
                      options={sortOptions}
                      defaultValue={sortOptions[0]}
                      styles={customSelectStyles}
                      onChange={(opt) => setSortOption(opt.value)}
                      isSearchable={false}
                    />
                  </div>

                  <button
                    className="btn btn-outline-secondary d-flex align-items-center gap-2"
                    onClick={() => setSidebarOpen((prev) => !prev)}
                  >
                    <i
                      className={`fa-solid fa-filter transition-icon ${sidebarOpen ? "rotated" : ""}`}
                    ></i>
                    {sidebarOpen ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
                  </button>
                </div>
              </div>
            </div>

            {/* ======== GRID SẢN PHẨM ======== */}
            <div className="row g-4">
              {sortedVariants.length > 0 ? (
                sortedVariants.map((v, index) => (
                  <div key={`${v.productId}-${v.id}`} className="col-xl-4 col-md-6 col-sm-6">
                    <div
                      className="product-style1 wow animate__fadeInUp"
                      data-wow-delay={`${0.3 + index * 0.05}s`}
                    >
                      <div
  className="product-img relative overflow-hidden"
  role="button"
  onClick={() => navigate(`/shop/${v.productId}/${v.id}`)}
  style={{ height: "260px", borderRadius: "8px" }}
>
  {/* ✅ Nền blur auto lấy theo ảnh */}
  <div
    className="absolute inset-0 blur-xl scale-110"
    style={{
      backgroundImage: `url(${v.imageUrl?.startsWith("https") ? v.imageUrl : `${API_BASE_URL}${v.imageUrl}`})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "blur(18px)",
      transform: "scale(1.1)",
    }}
  ></div>

  {/* ✅ Ảnh chính giữ nguyên tỉ lệ, không méo */}
  <img
    src={v.imageUrl?.startsWith("https") ? v.imageUrl : `${API_BASE_URL}${v.imageUrl}`}
    alt={v.name}
    className="relative z-10 max-h-full max-w-full mx-auto object-contain transition duration-300 hover:scale-105"
  />

  {/* ✅ Nút giỏ hàng nổi phía trên */}
  <div className="product-btns relative z-20">
    <a
      href="#"
      className="icon-btn cart"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleAddToCart(v);
      }}
    >
      <i className="fa-solid fa-basket-shopping"></i>
    </a>
  </div>

  {/* ✅ Badge Hot / Discount */}
  <ul className="post-box relative z-20">
    {v.isHot && <li>Hot</li>}
    {v.discount && <li>-{v.discount}%</li>}
  </ul>
</div>


                      <div className="product-content">
                        <div className="product-rating d-flex align-items-center gap-2">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <FaStar key={s} size={16} color={v.averageRating >= s ? "#0b4b32" : "#ddd"} />
                          ))}
                          <span style={{ fontSize: "0.85rem", color: "#666" }}>
                            ({v.averageRating?.toFixed(1) || "0.0"})
                          </span>
                          <ul className="price-list ms-auto">
                            {v.oldPrice && (
                              <li>
                                <del>{v.oldPrice.toLocaleString()}₫</del>
                              </li>
                            )}
                            <li>{v.price?.toLocaleString()}₫</li>
                          </ul>
                        </div>

                        <h2 className="product-title mt-1">
                          <a
                            href={`/shop/${v.productId}/${v.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(`/shop/${v.productId}/${v.id}`);
                            }}
                          >
                            {v.name}
                          </a>
                        </h2>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-5 col-12">😴 Không có sản phẩm phù hợp</div>
              )}
            </div>

            {/* ======== PHÂN TRANG ======== */}
            {totalPages > 1 && (
              <div className="pagination mt-5 d-flex justify-content-center gap-2">
                <button className="vs-btn" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                  ← Trang trước
                </button>
                <span className="align-self-center">
                  Trang {page} / {totalPages}
                </span>
                <button
                  className="vs-btn"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Trang sau →
                </button>
              </div>
            )}
          </div>

          {/* ======== SIDEBAR VỚI ANIMATION ======== */}
          <AnimatePresence>
            {sidebarOpen && (
              <>
                {/* Overlay mờ nền */}
                <motion.div
                  className="fixed inset-0 bg-black/30 z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSidebarOpen(false)}
                />

                {/* Sidebar trượt ra */}
                <motion.div
                  className="col-xl-4 col-lg-5 z-20 position-absolute end-0 top-0"
                  key="sidebar"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{
                    borderRadius: "8px 0 0 8px",
                    background: "rgba(255,255,255,0.6)",
                    backdropFilter: "blur(4px)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    height: "auto",
                    overflow: "visible",
                    padding: "20px",
                  }}

                >

                  <aside className="sidebar-area">
                    {/* 🔍 TÌM KIẾM */}
                    <div className="widget widget_search mb-4">
                      <h3 className="widget_title title-shep">Tìm kiếm</h3>
                      <form className="search-form" onSubmit={handleSearchSubmit}>
                        <input
                          type="text"
                          name="searchInput"
                          placeholder="Nhập từ khóa..."
                          className="form-control"
                        />
                        <button
                          className="vs-btn"
                          type="submit"
                          style={{
                            padding: "15px 30px",
                            fontSize: "1rem",
                            borderRadius: "25px",
                            minWidth: "100px",
                          }}
                        >
                          Tìm
                        </button>

                      </form>
                    </div>

                    {/* 💰 LỌC THEO GIÁ */}
                    <PriceFilter
                      minPrice={minPrice}
                      maxPrice={maxPrice}
                      setMinPrice={setMinPrice}
                      setMaxPrice={setMaxPrice}
                      onFilter={handleFilter}
                    />

                    {/* 📚 DANH MỤC */}
                    <div
                      className="widget wow animate__fadeInUp"
                      data-wow-delay="0.50s"
                    >
                      <div className="wp-block-group widget_categories is-layout-constrained wp-block-group-is-layout-constrained">
                        <div className="wp-block-group__inner-container">
                          <h3 className="wp-block-heading widget_title title-shep">
                            Danh mục
                          </h3>

                          <ul className="wp-block-categories-list wp-block-categories">
                            {/* Mục "Tất cả sản phẩm" */}
                            <li className="cat-item">
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSelectedCategory(null);
                                  setPage(1);
                                }}
                                style={{
                                  fontWeight: !selectedCategory ? "600" : "normal",
                                  color: !selectedCategory ? "#ffffffff" : "#333", color: "#5a201d"
                                }}
                              >
                                Tất cả sản phẩm
                              </a>
                            </li>

                            {/* Danh mục từ API */}
                            {categories.length > 0 ? (
                              categories.map((c) => (
                                <li key={c.id} className="cat-item">
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setSelectedCategory(c.id);
                                      setSearch("");
                                      setPage(1);
                                    }}
                                    style={{
                                      fontWeight: c.id === selectedCategory ? "600" : "normal",
                                      color: c.id === selectedCategory ? "#ffffffff" : "#333",
                                    }}
                                  >
                                    {c.name}
                                  </a>
                                </li>
                              ))
                            ) : (
                              <li className="cat-item">Đang tải...</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>


                    {/* 🌟 TOP SÁCH */}
                    <div className="widget product-sidebar mt-4">
                      <h3 className="widget_title title-shep">Top Sản phẩm</h3>
                      <div className="recent-post-wrap">
                        {topProducts.length > 0 ? (
                          topProducts.map((p) => (
                            <div key={p.id} className="recent-post d-flex mb-3">
                              <div className="media-img">
                                <a onClick={() => navigate(`/shop/${p.id}`)} role="button">
                                 <div
  className="media-img position-relative overflow-hidden"
  style={{ width: "70px", height: "70px", borderRadius: "6px" }}
>
  {/* Nền blur */}
  <div
    className="absolute inset-0 blur-xl scale-110"
    style={{
      backgroundImage: `url(${(p.imageUrl && p.imageUrl.startsWith("https")) ? p.imageUrl : `${API_BASE_URL}${p.imageUrl || p.variants?.[0]?.imageUrl}`})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "blur(14px)",
      transform: "scale(1.1)",
    }}
  ></div>

  {/* Ảnh chính giữ đúng tỉ lệ */}
  <img
    src={
      (p.imageUrl && p.imageUrl.startsWith("https"))
        ? p.imageUrl
        : `${API_BASE_URL}${p.imageUrl || p.variants?.[0]?.imageUrl}`
    }
    alt={p.name}
    className="relative z-10 w-full h-full object-contain p-1"
  />
</div>

                                </a>
                              </div>
                              <div className="media-body ms-3">
                                <h4 className="post-title mb-1">
                                  <a
                                    className="text-inherit"
                                    onClick={() => navigate(`/shop/${p.id}`)}
                                    role="button"
                                  >
                                    {p.name}
                                  </a>
                                </h4>
                                <ul className="price-list list-inline mb-0">
                                  <li className="list-inline-item text-muted">
                                    <del>{p.oldPrice?.toLocaleString()}₫</del>
                                  </li>
                                  <li className="list-inline-item fw-semibold">
                                    {p.variants?.[0]?.price?.toLocaleString()}₫
                                  </li>
                                </ul>
                                <div style={{ fontSize: "0.85rem", color: "#777" }}>
                                  ⭐ {p.averageRating?.toFixed(1) || 0}/5 ({p.reviewCount || 0})
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>Đang tải...</p>
                        )}

                        <a className="vs-btn mt-2" onClick={() => navigate("/shop")} role="button">
                          Xem thêm
                        </a>
                      </div>
                    </div>
                  </aside>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* CSS hiệu ứng */}
      <style>{`
        @keyframes cartShake {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(-15deg); }
          40% { transform: rotate(15deg); }
          60% { transform: rotate(-10deg); }
          80% { transform: rotate(10deg); }
          100% { transform: rotate(0deg); }
        }
        .cart-shake { animation: cartShake 0.6s ease-in-out; }
        .cart-gold { color: #f5b700 !important; transition: color 0.3s ease; }

        @keyframes plusOne {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          80% { opacity: 1; transform: translateY(-30px) scale(1.2); }
          100% { opacity: 0; transform: translateY(-50px) scale(1); }
        }
        .plus-one-fly {
          position: fixed;
          font-size: 18px;
          font-weight: 600;
          color: #ffb300;
          pointer-events: none;
          animation: plusOne 1s ease-out forwards;
          z-index: 2000;
          transform: translateX(-50%);
        }
      `}</style>
    </section>

  );
}
