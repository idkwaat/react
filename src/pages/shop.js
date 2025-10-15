import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import PriceFilter from "../components/PriceFilter";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5186";

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

  // 🔹 Gọi API sản phẩm (có tìm kiếm, phân trang, lọc)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/products?search=${encodeURIComponent(search)}&page=${page}&pageSize=9` +
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
    fetch(`${BASE_URL}/api/categories`)
      .then((res) => res.json())
      .then(setCategories)
      .catch((err) => console.error("❌ Fetch categories error:", err));
  }, []);

  // 🔹 Lấy top sản phẩm tháng (ngay cả khi chưa có ai mua)
  useEffect(() => {
    fetch(`${BASE_URL}/api/products/top-month`)
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Top tháng API response:", data);
        // nếu không có data hoặc data rỗng → fallback sang danh sách sản phẩm thường
        if (!data?.data?.length && !data?.Data?.length) {
          console.warn("⚠️ Không có top-month, fallback sang /api/products");
          return fetch(`${BASE_URL}/api/products?page=1&pageSize=5`)
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
  return (
    <section className="books-layout1 space-top space-extra-bottom">
      <div className="container">
        <div className="row g-4">
          {/* ======== DANH SÁCH SẢN PHẨM ======== */}
          <div className="col-xl-8 col-lg-7">
            {/* Sort bar */}
            <div className="vs-sort-bar mb-4">
              <div className="row gap-4 align-items-center">
                <div className="col-md-auto flex-grow-1">
                  <p className="woocommerce-result-count m-0">
                    Hiển thị <strong>{variants.length}</strong> sản phẩm
                  </p>
                </div>
                <div className="col-md-auto" style={{ minWidth: "220px" }}>
                  <Select
                    options={sortOptions}
                    defaultValue={sortOptions[0]}
                    styles={customSelectStyles}
                    onChange={(opt) => setSortOption(opt.value)}
                    isSearchable={false}
                  />
                </div>
              </div>
            </div>

            {/* Grid sản phẩm */}
            <div className="row g-4">
              {sortedVariants.length > 0 ? (
                sortedVariants.map((v, index) => (
                  <div
                    key={`${v.productId}-${v.id}`}
                    className="col-xl-4 col-md-6 col-sm-6"
                  >
                    <div
                      className="product-style1 wow animate__fadeInUp"
                      data-wow-delay={`${0.3 + index * 0.05}s`}
                    >
                      <div
                        className="product-img"
                        role="button"
                        onClick={() =>
                          navigate(`/shop/${v.productId}/${v.id}`)
                        }
                      >
                        <img
                          src={
                            v.imageUrl
                              ? `${BASE_URL}${v.imageUrl}`
                              : "/images/default.jpg"
                          }
                          alt={v.name}
                        />
                        <div className="product-btns">
                          <a
                            href="#"
                            className="icon-btn cart"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              alert(`Thêm ${v.name} vào giỏ (demo)`);
                            }}
                          >
                            <i className="fa-solid fa-basket-shopping"></i>
                          </a>
                        </div>
                        <ul className="post-box">
                          {v.isHot && <li>Hot</li>}
                          {v.discount && <li>-{v.discount}%</li>}
                        </ul>
                      </div>

                      <div className="product-content">
                        <div className="product-rating d-flex align-items-center gap-2">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <FaStar
                              key={s}
                              size={16}
                              color={v.averageRating >= s ? "#0b4b32" : "#ddd"}
                            />
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
                <div className="text-center py-5 col-12">
                  😴 Không có sản phẩm phù hợp
                </div>
              )}
            </div>

            {/* ======== PHÂN TRANG ======== */}
            {totalPages > 1 && (
              <div className="pagination mt-5 d-flex justify-content-center gap-2">
                <button
                  className="vs-btn"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
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

          {/* ======== SIDEBAR ======== */}
          {/* ======== SIDEBAR ======== */}
          <div className="col-xl-4 col-lg-5">
            <aside className="sidebar-area">

              {/* 🔍 TÌM KIẾM */}
              <div className="widget widget_search wow animate__fadeInUp" data-wow-delay="0.30s">
                <h3 className="wp-block-heading widget_title title-shep">Tìm kiếm</h3>
                <form className="search-form d-flex" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    name="searchInput"
                    placeholder="Nhập từ khóa..."
                    className="form-control"
                  />
                  <button className="vs-btn ms-2" type="submit">Tìm</button>
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
              <div className="widget wow animate__fadeInUp" data-wow-delay="0.50s">
                <div className="wp-block-group widget_categories is-layout-constrained wp-block-group-is-layout-constrained">
                  <div className="wp-block-group__inner-container">
                    <h3 className="wp-block-heading widget_title title-shep">Danh mục</h3>
                    <ul className="wp-block-categories-list wp-block-categories list-unstyled mb-0">
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
      color: !selectedCategory ? "#0b4b32" : "#333",
    }}
  >
    Tất cả sản phẩm
  </a>
</li>

                      {categories.length > 0 ? (
                        categories.map((c) => (
                          <li key={c.id} className="cat-item">
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedCategory(c.id);
                                setSearch(""); // reset tìm kiếm nếu cần
                                setPage(1);
                              }}
                              style={{
                                fontWeight: c.id === selectedCategory ? "600" : "normal",
                                color: c.id === selectedCategory ? "#0b4b32" : "#333",
                                cursor: "pointer",
                              }}
                            >
                              {c.name}
                            </a>

                          </li>
                        ))
                      ) : (
                        <li>Đang tải...</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* 🌟 TOP SÁCH TUẦN */}
              <div className="widget product-sidebar wow animate__fadeInUp" data-wow-delay="0.60s">
                <h3 className="widget_title title-shep">Top sách tháng</h3>
                <div className="recent-post-wrap">
                  {topProducts.length > 0 ? (
                    topProducts.map((p) => (
                      <div key={p.id} className="recent-post d-flex mb-3">
                        <div className="media-img">
                          <a onClick={() => navigate(`/shop/${p.id}`)} role="button">
                            <img
                              src={`${BASE_URL}${p.imageUrl || p.variants?.[0]?.imageUrl}`}
                              alt={p.name}
                              width="70"
                              className="rounded"
                            />
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

                  <a
                    className="vs-btn wow animate__flipInX"
                    data-wow-delay="0.70s"
                    onClick={() => navigate("/shop")}
                    role="button"
                  >
                    Xem thêm
                  </a>
                </div>
              </div>

            </aside>
          </div>


        </div>
      </div>
    </section>
  );
}
