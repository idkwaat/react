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
                  onClick={() => navigate(`/shop/${v.productId}/${v.id}`)}
                >
                  <div className="product-img">
                    <img
                      src={
                        v.imageUrl
                          ? `${API_BASE_URL}${v.imageUrl}`
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
                          handleAddToCart(v);
                        }}
                      >
                        <i className="fa-solid fa-basket-shopping"></i>
                      </a>
                    </div>

                    <ul className="post-box">
                      {v.isHot && <li>Hot</li>}
                      {v.discount > 0 && <li>-{v.discount}%</li>}
                    </ul>
                  </div>

                  <div className="product-content">
                    <div className="product-rating">
                      <span className="star">
                        <FaStar color="#52c761ff" /> (
                        {v.averageRating?.toFixed(1) || "0.0"})
                      </span>
                      <ul className="price-list">
                        {v.oldPrice && (
                          <li>
                            <del>{v.oldPrice.toLocaleString()}₫</del>
                          </li>
                        )}
                        <li>{v.price?.toLocaleString()}₫</li>
                      </ul>
                    </div>

                    <h2 className="product-title" style={{ marginTop: "5px"}}>{v.name}</h2>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-5">💤 Chưa có sản phẩm trending</div>
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
