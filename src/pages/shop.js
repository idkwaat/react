// src/pages/ShopSidebar.jsx
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5186";

export default function Shop() {
  const [variants, setVariants] = useState([]);
  const [sortOption, setSortOption] = useState("recent_product");
  const navigate = useNavigate();

  // 🔹 Lấy sản phẩm từ API
  useEffect(() => {
    fetch(`${BASE_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        const allVariants = data.flatMap((p) =>
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
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // 🔹 Sắp xếp
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
                  😴 Chưa có sản phẩm để hiển thị
                </div>
              )}
            </div>
          </div>

          {/* ======== SIDEBAR ======== */}
<div className="col-xl-4 col-lg-5">
  <aside className="sidebar-area">
    <div className="widget widget_search wow animate__fadeInUp" data-wow-delay="0.30s">
      <h3 className="wp-block-heading widget_title title-shep">Search</h3>
      <form className="search-form">
        <input type="text" placeholder="Search Here..." />
        <button className="vs-btn" type="submit">Search</button>
      </form>
    </div>

    <div className="widget wow animate__fadeInUp" data-wow-delay="0.40s">
      <h3 className="widget_title mb-35 title-shep">Filter By Price</h3>
      <div className="slider-area">
        <div className="slider-area-wrapper">
          <div id="skipstep" className="slider mb-20"></div>
          <div className="range-btn">
            <button className="vs-btn" type="submit">Filter</button>
            <div className="price-range">
              Price: $<span className="price" id="skip-value-lower"></span>-$<span className="price" id="skip-value-upper"></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="widget wow animate__fadeInUp" data-wow-delay="0.50s">
      <div className="wp-block-group widget_categories is-layout-constrained wp-block-group-is-layout-constrained">
        <div className="wp-block-group__inner-container">
          <h3 className="wp-block-heading widget_title title-shep">Categories</h3>
          <ul className="wp-block-categories-list wp-block-categories">
            <li className="cat-item">
              <a href="shop.html">Romance</a>
            </li>
            <li className="cat-item">
              <a href="shop.html">Thriller</a>
            </li>
            <li className="cat-item">
              <a href="shop.html">Fantasy</a>
            </li>
            <li className="cat-item">
              <a href="shop.html">Since Fiction</a>
            </li>
            <li className="cat-item">
              <a href="shop.html">Since</a>
            </li>
            <li className="cat-item">
              <a href="shop.html">Astronomy</a>
            </li>
            <li className="cat-item">
              <a href="shop.html">Kids</a>
            </li>
            <li className="cat-item">
              <a href="shop.html">Cartoon &amp; Story</a>
            </li>
            <li className="cat-item">
              <a href="shop.html">Educational</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="widget product-sidebar wow animate__fadeInUp" data-wow-delay="0.60s">
      <h3 className="widget_title title-shep">top Books This Week</h3>
      <div className="recent-post-wrap">
        <div className="recent-post">
          <div className="media-img">
            <a href="blog-details.html">
              <img src="assets/img/product/product-sidebar-1-1.jpg" alt="Blog Image" />
            </a>
          </div>
          <div className="media-body">
            <span className="product-author"><strong>By:</strong> Fahim Al Bashar</span>
            <h4 className="post-title">
              <a className="text-inherit" href="blog-details.html">Rat Phnory Mttke Srial Tofairle</a>
            </h4>
            <ul className="price-list">
              <li><del>$39.99</del></li>
              <li>$30.00</li>
            </ul>
          </div>
        </div>

        <div className="recent-post">
          <div className="media-img">
            <a href="blog-details.html">
              <img src="assets/img/product/product-sidebar-1-2.jpg" alt="Blog Image" />
            </a>
          </div>
          <div className="media-body">
            <span className="product-author"><strong>By:</strong> Fahim Al Bashar</span>
            <h4 className="post-title">
              <a className="text-inherit" href="blog-details.html">Amazona Book Cover</a>
            </h4>
            <ul className="price-list">
              <li><del>$39.99</del></li>
              <li>$30.00</li>
            </ul>
          </div>
        </div>

        <div className="recent-post">
          <div className="media-img">
            <a href="blog-details.html">
              <img src="assets/img/product/product-sidebar-1-3.jpg" alt="Blog Image" />
            </a>
          </div>
          <div className="media-body">
            <span className="product-author"><strong>By:</strong> Fahim Al Bashar</span>
            <h4 className="post-title">
              <a className="text-inherit" href="blog-details.html">Quantum Entanglement</a>
            </h4>
            <ul className="price-list">
              <li><del>$39.99</del></li>
              <li>$30.00</li>
            </ul>
          </div>
        </div>

        <a className="vs-btn wow animate__flipInX" data-wow-delay="0.70s" href="#">View More</a>
      </div>
    </div>
  </aside>
</div>


        </div>
      </div>
    </section>
  );
}
