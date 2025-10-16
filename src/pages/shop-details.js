// src/pages/ShopDetails.js
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "@google/model-viewer";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5186";

export default function ShopDetails() {
  const { productId, variantId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [show3D, setShow3D] = useState(false);
  const [fadeClass, setFadeClass] = useState("fade-in");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const imageRef = useRef(null);
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // -----------------------------
  // Fetch reviews
  const fetchReviews = async (prodId) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/reviews/product/${prodId}`);
      setReviews(res.data);
    } catch (err) {
      console.error("Lỗi khi tải reviews:", err);
      setReviews([]);
    }
  };

  // -----------------------------
  // Fetch product & select variant
  useEffect(() => {
    if (!productId) return;
    fetch(`${BASE_URL}/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        if (data.variants && data.variants.length > 0) {
          const foundVariant =
            variantId && !isNaN(parseInt(variantId))
              ? data.variants.find((v) => v.id === parseInt(variantId))
              : null;
          setSelectedVariant(foundVariant || data.variants[0]);
        }
        fetchReviews(data.id);
      })
      .catch((err) => console.error("Lỗi tải sản phẩm:", err));
  }, [productId, variantId]);

  // -----------------------------
  // Model viewer logic (3D)
  useEffect(() => {
    const modelViewer = document.querySelector("model-viewer");
    if (!modelViewer) return;

    if (show3D && selectedVariant?.modelUrl) {
      modelViewer.src = `${BASE_URL}${selectedVariant.modelUrl}`;
    }

    const handleWheel = (e) => {
      if (modelViewer.matches(":hover")) {
        e.stopPropagation();
        e.preventDefault();
      }
    };
    modelViewer.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      modelViewer.removeEventListener("wheel", handleWheel);
      modelViewer.src = "";
    };
  }, [show3D, selectedVariant]);



  // -----------------------------
  // Fade effect khi đổi ảnh / model
  const triggerFade = (callback) => {
    setFadeClass("fade-out");
    setTimeout(() => {
      callback();
      setFadeClass("fade-in");
    }, 200);
  };

  // -----------------------------
  // Add to cart
  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    const cartItem = {
      productId: product.id,
      variantId: selectedVariant.id,
      productName: `${product.name} - ${selectedVariant.name}`,
      price: selectedVariant.price ?? 0,
      quantity,
      imageUrl: selectedVariant.imageUrl,
    };

    addToCart(cartItem);
    

    // Hiệu ứng +1
    // 🌟 Hiệu ứng +1 bay lên và rung icon giỏ
const cartIcon = document.querySelector(
  ".header-cart .cart-icon-btn i, .header-cart i.fa-basket-shopping, .header-cart .vs-icon i"
);
const fallbackIcon = document.querySelector(".fa-basket-shopping"); // phòng khi header chưa mount
const targetIcon = cartIcon || fallbackIcon;
if (!targetIcon) return;


    const cartRect = targetIcon.getBoundingClientRect();
    const plusOne = document.createElement("div");
    plusOne.innerText = `+${quantity}`;
    plusOne.className = "plus-one-fly";
    plusOne.style.left = cartRect.left + cartRect.width / 2 + "px";
    plusOne.style.top = cartRect.top - 10 + "px";
    document.body.appendChild(plusOne);
    setTimeout(() => plusOne.remove(), 1000);

    targetIcon.classList.add("cart-shake");
    setTimeout(() => {
      targetIcon.classList.remove("cart-shake");
      targetIcon.classList.add("cart-gold");
      setTimeout(() => targetIcon.classList.remove("cart-gold"), 600);
    }, 600);
  };

  // -----------------------------
  // Gửi review
  const submitReview = async () => {
    if (!comment.trim() || rating === 0) {
      alert("Vui lòng nhập nội dung và chọn số sao!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập để gửi review!");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/api/reviews`,
        { productId: product.id, rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Gửi review thành công!");
      setComment("");
      setRating(0);
      fetchReviews(product.id);
    } catch (err) {
      console.error("Lỗi gửi review:", err);
      alert("Gửi review thất bại. Vui lòng đăng nhập lại!");
    }
  };

  // -----------------------------
  // Loading UI
  if (!product || !selectedVariant) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Đang tải sản phẩm...</p>
      </div>
    );
  }
  return (
    <div className="vs-product-wrapper space-top space-extra-bottom">
      <div className="container">
        <div className="row gx-60">
          <div className="col-lg-6">
            <div className="product-slide-row wow animate__fadeInUp" data-wow-delay="0.30s">
              <div className={`product-big-img position-relative ${fadeClass}`} style={{ transition: "opacity 0.25s ease-in-out" }}>
                {show3D && selectedVariant.modelUrl ? (
                  <model-viewer
                    src={`${BASE_URL}${selectedVariant.modelUrl}`}
                    alt={product.name}
                    camera-controls
                    auto-rotate
                    style={{ width: "100%", height: "400px", borderRadius: "10px", background: "#f8f9fa" }}
                  />
                ) : (
                  <img
                    ref={imageRef}
                    src={selectedVariant.imageUrl ? `${BASE_URL}${selectedVariant.imageUrl}` : "/images/default.jpg"}
                    alt={`${product.name} - ${selectedVariant.name}`}
                    className="w-100 rounded"
                    style={{ height: "450px", objectFit: "cover" }}
                  />
                )}

                <button
                  className="vs-btn position-absolute"
                  style={{ top: "10px", right: "10px", padding: "6px 12px", fontSize: "14px" }}
                  onClick={() => triggerFade(() => setShow3D((p) => !p))}
                >
                  {show3D ? "Xem ảnh 2D" : "Xem mô hình 3D"}
                </button>
              </div>

              {/* thumbnails variants */}
              <div className="d-flex gap-3 mt-3 flex-wrap">
                {product.variants?.map((v) => {
                  const variantImage = v.imageUrl ? `${BASE_URL}${v.imageUrl}` : "/images/default.jpg";
                  return (
                    <div key={v.id} className="text-center">
                      <img
                        src={variantImage}
                        alt={v.name}
                        width="90"
                        height="90"
                        className={`rounded border p-1 ${selectedVariant?.id === v.id ? "border-primary shadow" : ""}`}
                        style={{ objectFit: "cover", cursor: "pointer", transition: "transform 0.2s ease" }}
                        onClick={() =>
                          triggerFade(() => {
                            setSelectedVariant(v);
                            setShow3D(false);
                            // cập nhật URL để copy/refresh vẫn đúng variant
                            navigate(`/shop/${product.id}/${v.id}`, { replace: false });
                          })
                        }
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      />
                      <div style={{ fontSize: "13px", marginTop: "4px" }}>{v.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="product-about wow animate__fadeInUp" data-wow-delay="0.30s">
              <h2 className="product-title">
                {product.name} <small style={{ fontSize: "0.9rem", color: "#666" }}>({selectedVariant.name})</small>
              </h2>
{product.averageRating > 0 && (
  <div className="rating-display" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <div className="stars" style={{ display: "flex", gap: "4px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <FaStar
          key={s}
          size={22}
          color={product.averageRating >= s ? "#0b4b32" : "#dcdcdc"}
          style={{
            transition: "0.2s",
            transform: product.averageRating >= s ? "scale(1.1)" : "scale(1)",
          }}
        />
      ))}
    </div>
    <span style={{ color: "#555", fontSize: "0.9rem" }}>
      {product.averageRating.toFixed(1)} / 5 ({product.reviewCount} đánh giá)
    </span>
  </div>
)}

              <span className="product-author">
                <strong>Category:</strong> <a href="#">{product.categoryName}</a>
              </span>
              

              <p className="product-price">{(selectedVariant.price ?? 0).toLocaleString()}₫</p>
              <p className="text">{product.description}</p>

              <span className="product-instock d-flex align-items-center gap-2">
                <p className="m-0">Availability:</p>
                <span>
                  <i className="fas fa-check-square" /> In Stock
                </span>
              </span>

              <div className="actions">
                <div className="quantity">
                  <div className="quantity__field quantity-container">
                    <div className="quantity__buttons">
                      <button className="quantity-plus qty-btn" onClick={() => setQuantity((q) => q + 1)}>
                        <i className="fal fa-plus"></i>
                      </button>

                      <input
                        type="number"
                        id="quantity"
                        className="qty-input"
                        step="1"
                        min="1"
                        max="100"
                        name="quantity"
                        value={quantity}
                        title="Qty"
                        onChange={(e) => setQuantity(Math.max(1, +e.target.value))}
                      />

                      <button className="quantity-minus qty-btn" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                        <i className="fal fa-minus"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <button className="vs-btn" onClick={handleAddToCart}>
                  <i className="fa-solid fa-basket-shopping"></i> Add to Cart
                </button>

              </div>

              <div className="product_meta mt-4">
                <h4 className="h5">Information:</h4>
                <span className="sku_wrapper d-block">
                  <p>SKU:</p> <span className="sku">{product.id}</span>
                </span>
                <span className="posted_in d-block">
                  <p>Variant:</p> <span>{selectedVariant.name}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* TAB MÔ TẢ / REVIEWS */}
{/* TAB MÔ TẢ / REVIEWS */}
<div
  className="product-description wow animate__fadeInUp wow-animated mt-5"
  data-wow-delay="0.50s"
  style={{
    visibility: "visible",
    animationDelay: "0.5s",
    animationName: "fadeInUp",
  }}
>
  <div className="product-description__tab">
    <ul className="nav nav-pills" id="pills-tab" role="tablist">
      <li className="nav-item" role="presentation">
        <button
          className={`nav-link ${activeTab === "description" ? "active" : ""}`}
          id="pills-description-tab"
          type="button"
          role="tab"
          aria-controls="pills-description"
          aria-selected={activeTab === "description"}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button
          className={`nav-link ${activeTab === "reviews" ? "active" : ""}`}
          id="pills-reviews-tab"
          type="button"
          role="tab"
          aria-controls="pills-reviews"
          aria-selected={activeTab === "reviews"}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews ({reviews.length})
        </button>
      </li>
    </ul>
  </div>

  <div className="tab-content mt-3" id="pills-tabContent">
    {/* TAB DESCRIPTION */}
    <div
      className={`tab-pane fade ${activeTab === "description" ? "show active" : ""}`}
      id="pills-description"
      role="tabpanel"
      aria-labelledby="pills-description-tab"
    >
      <div className="description">
        <p className="text">{product?.description || "No description available."}</p>

        <div className="product_meta">
          <span className="sku_wrapper">
            <p>Category</p> <span>{product?.categoryName}</span>
          </span>
          <span className="posted_in">
            <p>3D Model</p>{" "}
            {selectedVariant?.modelUrl ? (
              <a
                href={`${BASE_URL}${selectedVariant?.modelUrl}`}
                target="_blank"
                rel="noreferrer"
              >
                View 3D Model
              </a>
            ) : (
              <span>Không có</span>
            )}
          </span>
        </div>
      </div>
    </div>

    {/* TAB REVIEWS */}
    <div
      className={`tab-pane fade ${activeTab === "reviews" ? "show active" : ""}`}
      id="pills-reviews"
      role="tabpanel"
      aria-labelledby="pills-reviews-tab"
    >
      <div className="woocommerce-reviews mt-4">
        <div className="vs-comments-wrap">
          <ul className="comment-list">
            {reviews.length === 0 && <span>Chưa có đánh giá nào.</span>}
            {reviews.map((r) => (
              <li key={r.id} className="review vs-comment-item">
                <div className="vs-post-comment">
<img
  src={
    r.user?.avatarUrl
      ? `${BASE_URL}${r.user.avatarUrl.startsWith("/") ? "" : "/"}${r.user.avatarUrl}`
      : "/assets/img/default-avatar.png"
  }
  alt="avatar"
  style={{
    width: 120,
    height: 120,
    borderRadius: "50%",
    objectFit: "cover",
    border: "1px solid #ddd",
  }}
/>

                  <div className="comment-content" style={{ marginLeft: "15px" }}>
                    <div className="comment-content__header">
                      <div className="review-rating" style={{ display: "flex", gap: "4px" }}>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <FaStar
                            key={s}
                            size={20}
                            color={s <= r.rating ? "#0b4b32" : "#dcdcdc"}
                          />
                        ))}
                      </div>
                      <h4 className="name h4">{r.user?.name || "Ẩn danh"}</h4>
                    </div>
                    <p className="text">{r.comment}</p>
                    <span className="commented-on">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* FORM ADD REVIEW */}
        <div className="vs-comment-form review-form mt-4">
          <div id="respond" className="comment-respond">
            <div className="form-title">
              <h3 className="blog-inner-title">Add A Review</h3>
              <div className="rating-select">
                <label>Your Rating</label>
                <div className="stars" style={{ display: "flex", gap: "4px", cursor: "pointer" }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <FaStar
                      key={s}
                      size={22}
                      color={rating >= s ? "#0b4b32" : "#dcdcdc"}
                      onClick={() => setRating(s)}
                      style={{
                        transition: "0.2s",
                        transform: rating >= s ? "scale(1.2)" : "scale(1)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-12 form-group">
                <textarea
                  className="form-control"
                  placeholder="Review của bạn"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <div className="col-12 form-group mb-0">
                <button className="vs-btn" onClick={submitReview}>
                  <span className="vs-btn__bar"></span>Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


      </div>

      <style>{`
        @keyframes cartShake { 0% { transform: rotate(0deg);} 20% { transform: rotate(-15deg);} 40% { transform: rotate(15deg);} 60% { transform: rotate(-10deg);} 80% { transform: rotate(10deg);} 100% { transform: rotate(0deg);} }
        .cart-shake { animation: cartShake 0.6s ease-in-out; }
        .cart-gold { color: #f5b700 !important; transition: color 0.3s ease; }
        @keyframes plusOne { 0% { opacity: 1; transform: translateY(0) scale(1);} 80% { opacity: 1; transform: translateY(-30px) scale(1.2);} 100% { opacity: 0; transform: translateY(-50px) scale(1);} }
        .plus-one-fly { position: fixed; font-size: 18px; font-weight: 600; color: #ffb300; pointer-events: none; animation: plusOne 1s ease-out forwards; z-index: 2000; transform: translateX(-50%); }
        .fade-in { opacity: 1; transition: opacity 0.25s ease-in-out; }
        .fade-out { opacity: 0; transition: opacity 0.25s ease-in-out; }
      `}</style>
    </div>
  );
}
