import React from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_URL;

export default function CategoryAllGrid({ categoryName, items, handleAddToCart }) {
  const navigate = useNavigate();

  return (
    <div key={categoryName} className="mb-5 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-1">
        <h3 className="fw-bold mb-0" style={{ fontSize: "1.5rem", color: "#3a2f2b" }}>
          {categoryName}
        </h3>
        <button className="btn btn-outline-dark btn-sm" onClick={() => navigate("/shop")}>
          ← Quay lại
        </button>
      </div>

      <div className="row">
        {items.map((v, index) => (
          <div
            key={`${v.productId}-${v.id}-${index}`}
            className="col-6 col-md-4 col-lg-3 mb-4 animate__animated animate__fadeInUp"
            style={{ animationDelay: `${0.05 * index}s` }}
          >
            <div className="product-style1">
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
                    transform: "scale(1.2)",
                    opacity: 0.85,
                  }}
                ></div>

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.1)",
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
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />

                <div
                  className="product-btns"
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    zIndex: 50,
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
          </div>
        ))}
      </div>
    </div>
  );
}
