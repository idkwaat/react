// src/components/TrendingProducts.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useCart } from "../context/CartContext"; // ✅ nhớ import context giỏ hàng nếu có
import Background from "three/src/renderers/common/Background.js";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5186";

export default function TrendingProducts() {
  const [variants, setVariants] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart(); // ✅ dùng context giỏ hàng

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
  const products = data.data || []; // ✅ Lấy mảng sản phẩm thật

  const allVariants = products.flatMap((p) =>
    (p.variants || []).map((v) => ({
      ...v,
      productId: p.id,
      productName: p.name,
      categoryName: p.categoryName,
      productDescription: p.description,
      averageRating: p.averageRating,
      reviewCount: p.reviewCount,
    }))
  );

  // ✅ Lọc top 6 sản phẩm hot (hoặc tạm hiển thị hết)
  const trending = allVariants
    .filter((v) => v.isHot || v.discount > 0 || true)
    .slice(0, 6);

  setVariants(trending);
})

      .catch((err) => console.error("Fetch trending error:", err));
  }, []);

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
    const cartIcon = document.querySelector(".header-cart .vs-icon i");
    const fallbackIcon = document.querySelector(".fa-basket-shopping");
    const targetIcon = cartIcon || fallbackIcon;
    if (!targetIcon) return;

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
    <section className="trending-layout1 space" style={{backgroundColor:"#fef6e9"}}>
      
      <div className="container">
        <div className="title-area2 animation-style1 title-anime">
          <span className="border-line d-xxl-block d-none"></span>
          <h2 className="sec-title title-anime__title">Sản phẩm nổi bật</h2>
          <a
            className="vs-btn wow animate__flipInX"
            data-wow-delay="0.30s"
            onClick={(e) => {
              e.preventDefault();
              navigate("/shop");
            }}
            href="/shop"
          >
            Xem Thêm
          </a>
        </div>

        <div className="row g-4">
{variants.length > 0 ? (
  variants.map((v, i) => (
    <div
      key={v.id}
      className="col-xl-2 col-md-4 col-sm-6"
      style={{ cursor: "pointer" }}
    >
      <div
        className="product-style1 wow animate__fadeInUp"
        data-wow-delay={`${0.3 + i * 0.1}s`}
      >
<div
  className="product-img"
  role="button"
  onClick={() => navigate(`/shop/${v.productId}/${v.id}`)}
  style={{
    position: "relative",
    overflow: "hidden",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: "1 / 1.2",
    cursor: "pointer",
  }}
>
  {/* ✅ Blur nền */}
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

  {/* ✅ Overlay làm dịu nền */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.08)",
    }}
  ></div>

  {/* ✅ Ảnh chính scale mượt */}
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

  {/* ✅ Button cart giữ đúng hiệu ứng hover */}
<div
  className="product-btns"
  style={{
    position: "absolute",
    bottom: "10px",
    right: "10px",
    zIndex: 50,
    pointerEvents: "auto",
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


  {/* ✅ Badge Hot / Discount */}
  <ul className="post-box absolute top-3 left-3 z-20">
    {v.isHot && <li>Hot</li>}
    {v.discount > 0 && <li>-{v.discount}%</li>}
  </ul>
</div>



        <div className="product-content">
<div
  className="product-rating"
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "nowrap",
    overflow: "hidden",
  }}
>
  <div className="stars d-flex align-items-center" style={{ gap: "2px", flexShrink: 0 }}>
    {[1, 2, 3, 4, 5].map((s) => (
      <FaStar
        key={s}
        size={14}
        color={v.averageRating >= s ? "#52c761ff" : "#ddd"}
      />
    ))}
    <span style={{ fontSize: "0.85rem", color: "#666", marginLeft: "4px" }}>
      ({v.averageRating?.toFixed(1) || "0.0"})
    </span>
  </div>

  <ul
    className="price-list mb-0"
    style={{
      display: "flex",
      alignItems: "center",
      gap: "4px",
      marginLeft: "auto",
      whiteSpace: "nowrap",
      flexShrink: 0,
    }}
  >
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
  <div className="text-center py-5">💤 Đang tải sản phẩm...</div>
)}

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
