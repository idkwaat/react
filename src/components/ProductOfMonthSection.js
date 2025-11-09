import React, { useEffect, useState } from "react";
import WOW from "wowjs";
import { useNavigate } from "react-router-dom";
import { FaStar, FaHeart, FaBasketShopping } from "react-icons/fa6";
import { useCart } from "../context/CartContext";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5186";

export default function ProductOfMonthSection() {
    const [variants, setVariants] = useState([]);
    const navigate = useNavigate();
    const { addToCart } = useCart();

    // ✅ Lấy dữ liệu sản phẩm từ API
   // ✅ Đổi API call
useEffect(() => {
    fetch(`${API_BASE_URL}/api/Products/top-month`)
        .then((res) => res.json())
        .then((res) => {
            const data = res.data || res.Data; // đảm bảo lấy đúng field từ backend

            // Backend trả về dạng: Product -> Variants[] -> Chỉ cần lấy từng variant kèm thông tin product
            const allVariants = data.flatMap((p) =>
                (p.variants || []).map((v) => ({
                    ...v,
                    productId: p.id,
                    productName: p.name,
                    categoryName: p.categoryName,
                    averageRating: p.averageRating,
                    reviewCount: p.reviewCount,
                    description: p.description,
                }))
            );

            setVariants(allVariants.slice(0, 8));
        })
        .catch((err) => console.error("❌ API error:", err));
}, []);


    // ✅ WOW.js khởi tạo + background image
    useEffect(() => {
        const wow = new WOW.WOW({ live: false });
        wow.init();

        document.querySelectorAll("[data-bg-src]").forEach((el) => {
            const bg = el.getAttribute("data-bg-src");
            if (bg) el.style.backgroundImage = `url(${bg})`;
        });
    }, [variants]);

    return (
        <section
            className="books-layout1 space background-image"
            data-bg-src="assets/img/bg/section-bg1.jpg"
        >
            <div className="container">
                <div className="title-area text-center animation-style1 title-anime mb-5">
                    <h2 className="sec-title title-anime__title" style={{ textTransform: "initial" }}>
                        Top Sản Phẩm Tháng
                    </h2>
                </div>

                <div className="row g-4">
                    {variants.length === 0 ? (
                        <p className="text-center">Đang tải sản phẩm...</p>
                    ) : (
                        variants.map((v, i) => (
                            <div key={v.id} className="col-xl-3 col-md-4 col-sm-6">
                                <div
                                    className="product-style1 wow animate__fadeInUp"
                                    data-wow-delay={`${0.3 + i * 0.1}s`}
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
    aspectRatio: "1 / 1.2", // ✅ Giữ layout đẹp, không cần height fix cứng
    cursor: "pointer",
  }}
  onClick={() => navigate(`/shop/${v.productId}/${v.id}`)}
>
  {/* ✅ Blur nền sâu hơn + brightness để highlight ảnh chính */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage: `url(${v.imageUrl?.startsWith("https") ? v.imageUrl : `${API_BASE_URL}${v.imageUrl}`})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "blur(26px) brightness(0.55)",
      transform: "scale(1.4)",
      transition: "transform 0.4s ease",
    }}
    className="group-hover:scale-[1.5]"
  ></div>

  {/* ✅ Overlay che nhẹ để ảnh chính nổi */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.08)",
    }}
  ></div>

  {/* ✅ Ảnh chính full tỉ lệ, hover scale mượt */}
  <img
    src={v.imageUrl?.startsWith("https") ? v.imageUrl : `${API_BASE_URL}${v.imageUrl}`}
    alt={v.name}
    style={{
      position: "relative",
      zIndex: 10,
      maxHeight: "100%",
      maxWidth: "110%",
      objectFit: "contain",
      transition: "transform 0.35s ease",
    }}
    className="group-hover:scale-105"
  />

  {/* ✅ Nút Cart top-right */}
<div
  className="product-btns"
  style={{
    position: "absolute",
    top: "10px",        // dịch xuống một chút cho đẹp
    right: "10px",      // cách mép phải 10px
    zIndex: 50,         // cao hơn ảnh và các layer khác
    pointerEvents: "auto", // cho phép click (phòng trường hợp slick tắt pointer)
  }}
>
  <button
    className="icon-btn cart"
    onClick={(e) => {
      e.stopPropagation();
      addToCart(v);
    }}
    style={{
      backgroundColor: "rgba(0,0,0,0.6)", // nền mờ
      color: "white",
      border: "none",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.9)")}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.6)")}
  >
    <FaBasketShopping size={18} />
  </button>
</div>

</div>




                                    <div className="product-content">
                                        <div className="product-rating">
                                            <div className="stars" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <FaStar
                                                        key={s}
                                                        size={16}
                                                        color={v.averageRating >= s ? "#0b4b32" : "#ddd"}
                                                        style={{
                                                            transition: "0.2s",
                                                            transform: v.averageRating >= s ? "scale(1.1)" : "scale(1)",
                                                        }}
                                                    />
                                                ))}
                                                <span style={{ marginLeft: 6, fontSize: "0.9rem", color: "#666" }}>
                                                    ({v.averageRating !== null && v.averageRating !== undefined ? v.averageRating.toFixed(1) : "5.0"})

                                                </span>
                                            </div>

                                            <ul className="price-list">
                                                {v.price && (
                                                    <>
                                                        <li>
                                                            <del>
                                                                {(v.price * 1.2).toLocaleString("vi-VN")}₫
                                                            </del>
                                                        </li>
                                                        <li>{v.price.toLocaleString("vi-VN")}₫</li>
                                                    </>
                                                )}
                                            </ul>
                                        </div>


                                        <h2 className="product-title" style={{ marginTop: "5px" }}>
                                            <button
                                                onClick={() => navigate(`/product/${v.productId}`)}
                                                style={{
                                                    background: "none",
                                                    border: "none",
                                                    color: "#333",
                                                    cursor: "pointer",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {v.name}
                                            </button>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="text-center mt-5">
                    <button
                        className="vs-btn wow animate__flipInX"
                        data-wow-delay="0.4s"
                        onClick={() => navigate("/shop")}
                    >
                        Xem Thêm
                    </button>
                </div>
            </div>
        </section>
    );
}
