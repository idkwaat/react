import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import PriceFilter from "../components/PriceFilter";
import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { useCart } from "../context/CartContext";
import { Breadcrumb } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";





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
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
const selectedCategoryId = searchParams.get("categoryId");
const CategoryAllGrid = React.lazy(() => import("./CategoryAllGrid"));

  


useEffect(() => {
  const params = new URLSearchParams(location.search);
  const categoryId = params.get("categoryId");

  if (categoryId) {
    setSelectedCategory(Number(categoryId)); // hoặc parseInt(categoryId)
    setPage(1);
  } else {
    setSelectedCategory(null);
  }
}, [location.search]);

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
            categoryId: p.categoryId,
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

  const filteredVariants = useMemo(() => {
  if (!selectedCategoryId) return sortedVariants;
  return sortedVariants.filter(v => String(v.categoryId) === String(selectedCategoryId));
}, [selectedCategoryId, sortedVariants]);

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
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      position: "absolute",
      left: "-45px", // đẩy ra ngoài slider
      top: "35%",
      transform: "translateY(-50%)",
      zIndex: 10,
      background: "rgba(0,0,0,0.6)",
      border: "none",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      color: "white",
      cursor: "pointer",
      boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      transition: "all 0.3s ease",
    }}
    onMouseEnter={(e) =>
      (e.currentTarget.style.background = "rgba(0,0,0,0.9)")
    }
    onMouseLeave={(e) =>
      (e.currentTarget.style.background = "rgba(0,0,0,0.6)")
    }
  >
    <i className="fa-solid fa-chevron-left"></i>
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      position: "absolute",
      right: "-45px", // đẩy ra ngoài slider
      top: "35%",
      transform: "translateY(-50%)",
      zIndex: 10,
      background: "rgba(0,0,0,0.6)",
      border: "none",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      color: "white",
      cursor: "pointer",
      boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      transition: "all 0.3s ease",
    }}
    onMouseEnter={(e) =>
      (e.currentTarget.style.background = "rgba(0,0,0,0.9)")
    }
    onMouseLeave={(e) =>
      (e.currentTarget.style.background = "rgba(0,0,0,0.6)")
    }
  >
    <i className="fa-solid fa-chevron-right"></i>
  </button>

);
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

{/* ======= DANH MỤC SẢN PHẨM ======= */}
<div className="space-y-5">
  <AnimatePresence mode="wait">
    {Object.entries(
      sortedVariants.reduce((acc, v) => {
        if (!acc[v.categoryName]) acc[v.categoryName] = [];
        acc[v.categoryName].push(v);
        return acc;
      }, {})
    ).map(([categoryName, items]) => {
      const categoryId = items[0]?.categoryId;
      const isViewAll = searchParams.get("categoryId") == categoryId;

      // 🔹 Slider view
      const displayItems =
        items.length < 10
          ? [...items, ...Array(10 - items.length).fill(null).map((_, i) => items[i % items.length])]
          : items;

      const settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        swipeToSlide: true,
        cssEase: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        responsive: [
          { breakpoint: 1200, settings: { slidesToShow: 4 } },
          { breakpoint: 992, settings: { slidesToShow: 3 } },
          { breakpoint: 768, settings: { slidesToShow: 2 } },
          { breakpoint: 576, settings: { slidesToShow: 1 } },
        ],
      };

      return (
        <motion.div
          key={isViewAll ? `viewall-${categoryId}` : `slider-${categoryId}`}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -25 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          <div key={categoryName} className="mb-5 fade-in" style={{ animation: "fadeIn 0.6s ease-out" }}>
            <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-1"
              style={{
    borderBottom: "3px solid rgba(58, 47, 43, 0.9)",
    boxShadow: "0 1px 0 rgba(58, 47, 43, 0.2)",
  }}
            >
              <h3
                className="fw-bold mb-0"
                style={{ fontSize: "1.5rem", color: "#3a2f2b" }}
              >
                {categoryName}
              </h3>
              {categoryId ? (
                isViewAll ? (
                  <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => navigate("/shop")}
                  >
                    ← Quay lại
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => navigate(`/shop?categoryId=${categoryId}`)}
                  >
                    Xem tất cả →
                  </button>
                )
              ) : null}
            </div>

            {isViewAll ? (
              // === VIEW ALL MODE (GRID) ===
              <div className="row">
                {items.map((v, index) => (
                  <motion.div
                    key={`${v?.productId}-${v?.id}-${index}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="col-6 col-md-4 col-lg-3 mb-4"
                  >
                    {v && (
                      <div
                        className="product-style1"
                        style={{
                          willChange: "transform, opacity",
                          animationDelay: `${0.03 * index}s`,
                        }}
                      >
                        <div
                          className="product-img"
                          style={{
                            position: "relative",
                            overflow: "hidden",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            aspectRatio: "1 / 1",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              backgroundImage: `url(${
                                v.imageUrl?.startsWith("https")
                                  ? v.imageUrl
                                  : `${API_BASE_URL}${v.imageUrl}`
                              })`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              filter: "blur(25px) brightness(0.55)",
                              transform: "scale(1.4)",
                              transition: "opacity 0.4s ease",
                            }}
                          ></div>

                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              backgroundColor: "rgba(0,0,0,0.05)",
                            }}
                          ></div>

                          <img
                            loading="lazy"
                            src={
                              v.imageUrl?.startsWith("https")
                                ? v.imageUrl
                                : `${API_BASE_URL}${v.imageUrl}`
                            }
                            alt={v.name}
                            style={{
                              position: "relative",
                              zIndex: 10,
                              maxHeight: "100%",
                              maxWidth: "110%",
                              objectFit: "contain",
                              transition: "transform 0.4s ease-out",
                              willChange: "transform",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                          />

                          <div
                            className="product-btns"
                            style={{
                              position: "absolute",
                              bottom: "10px",
                              right: "10px",
                              zIndex: 50,
                              opacity: 0,
                              transform: "translateY(10px)",
                              transition: "opacity 0.3s ease, transform 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.opacity = 1;
                              e.currentTarget.style.transform = "translateY(0)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.opacity = 0;
                              e.currentTarget.style.transform = "translateY(10px)";
                            }}
                          >
                            <a
                              href="#"
                              className="icon-btn cart"
                              style={{
                                backgroundColor: "rgba(0,0,0,0.7)",
                                color: "white",
                                borderRadius: "50%",
                                padding: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleAddToCart(v);
                              }}
                            >
                              <i className="fa-solid fa-basket-shopping"></i>
                            </a>
                          </div>
                        </div>

                        <div className="product-content text-center mt-2">
                          <h2 className="product-title" style={{ fontSize: "1rem" }}>
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
                          <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
                            {v.price?.toLocaleString()}₫
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              // === SLIDER MODE ===
              <div style={{ position: "relative", overflow: "visible", padding: "0 40px" }}>
                <Slider {...settings} nextArrow={<NextArrow />} prevArrow={<PrevArrow />}>
                  {displayItems.map((v, index) => (
                    <motion.div
                      key={`${v?.productId}-${v?.id}-${index}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-2"
                    >
                      {v && (
                        <div
                          className="product-style1"
                          style={{
                            willChange: "transform, opacity",
                            animationDelay: `${0.03 * index}s`,
                          }}
                        >
                          <div
                            className="product-img"
                            style={{
                              position: "relative",
                              overflow: "hidden",
                              borderRadius: "8px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              aspectRatio: "1 / 1",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                inset: 0,
                                backgroundImage: `url(${
                                  v.imageUrl?.startsWith("https")
                                    ? v.imageUrl
                                    : `${API_BASE_URL}${v.imageUrl}`
                                })`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                filter: "blur(25px) brightness(0.55)",
                                transform: "scale(1.4)",
                                transition: "opacity 0.4s ease",
                              }}
                            ></div>

                            <div
                              style={{
                                position: "absolute",
                                inset: 0,
                                backgroundColor: "rgba(0,0,0,0.05)",
                              }}
                            ></div>

                            <img
                              loading="lazy"
                              src={
                                v.imageUrl?.startsWith("https")
                                  ? v.imageUrl
                                  : `${API_BASE_URL}${v.imageUrl}`
                              }
                              alt={v.name}
                              style={{
                                position: "relative",
                                zIndex: 10,
                                maxHeight: "100%",
                                maxWidth: "110%",
                                objectFit: "contain",
                                transition: "transform 0.4s ease-out",
                                willChange: "transform",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
                              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            />

                            <div
                              className="product-btns"
                              style={{
                                position: "absolute",
                                bottom: "10px",
                                right: "10px",
                                zIndex: 50,
                                opacity: 0,
                                transform: "translateY(10px)",
                                transition: "opacity 0.3s ease, transform 0.3s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.opacity = 1;
                                e.currentTarget.style.transform = "translateY(0)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.opacity = 0;
                                e.currentTarget.style.transform = "translateY(10px)";
                              }}
                            >
                              <a
                                href="#"
                                className="icon-btn cart"
                                style={{
                                  backgroundColor: "rgba(0,0,0,0.7)",
                                  color: "white",
                                  borderRadius: "50%",
                                  padding: "10px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleAddToCart(v);
                                }}
                              >
                                <i className="fa-solid fa-basket-shopping"></i>
                              </a>
                            </div>
                          </div>

                          <div className="product-content text-center mt-2">
                            <h2 className="product-title" style={{ fontSize: "1rem" }}>
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
                            <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
                              {v.price?.toLocaleString()}₫
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </Slider>
              </div>
            )}
          </div>
        </motion.div>
      );
    })}
  </AnimatePresence>
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
<div
  className="media-img"
  style={{
    position: "relative",
    overflow: "hidden",
    width: "70px",
    height: "70px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  {/* ✅ Blur nền sâu + tối nhẹ */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage: `url(${
        p.imageUrl && p.imageUrl.startsWith("https")
          ? p.imageUrl
          : `${API_BASE_URL}${p.imageUrl || p.variants?.[0]?.imageUrl}`
      })`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "blur(18px) brightness(0.7)",
      transform: "scale(1.4)",
    }}
  ></div>

  {/* ✅ Ảnh chính luôn căn giữa, không méo */}
  <img
    src={
      p.imageUrl && p.imageUrl.startsWith("https")
        ? p.imageUrl
        : `${API_BASE_URL}${p.imageUrl || p.variants?.[0]?.imageUrl}`
    }
    alt={p.name}
    style={{
      position: "relative",
      zIndex: 10,
      maxHeight: "85%",
      maxWidth: "85%",
      objectFit: "contain",
      transition: "transform 0.3s ease",
    }}
  />
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
