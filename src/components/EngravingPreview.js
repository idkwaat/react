import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useCart } from "../context/CartContext";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5186";

export default function EngravingPreview({ variantId, onClose }) {
  const [loading, setLoading] = useState(true);
  const [engraving, setEngraving] = useState(null);
  const [variant, setVariant] = useState(null);
  const [text, setText] = useState("");
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null); // 🆕 thêm dòng này

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Lấy thông tin khắc
        const engravingRes = await axios.get(`${API_BASE_URL}/api/products/${variantId}/engraving`);
        setEngraving(engravingRes.data);

        // ✅ Lấy toàn bộ sản phẩm để tìm đúng variant
        const productRes = await axios.get(`${API_BASE_URL}/api/products`);
        const allProducts = productRes.data.data || productRes.data.Data || [];

        const foundProduct = allProducts.find(p =>
          p.variants?.some(v => v.id === variantId)
        );
        if (foundProduct) {
          const foundVariant = foundProduct.variants.find(v => v.id === variantId);
          setVariant(foundVariant);
          setProduct(foundProduct); // 🆕 lưu sản phẩm gốc lại
        }

      } catch (err) {
        console.error(err);
        alert("⚠️ Lỗi khi tải dữ liệu sản phẩm hoặc thông tin khắc!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [variantId]);

  const handleAddToCart = () => {
    if (!text.trim()) {
      onClose?.();
      alert(" Vui lòng nhập nội dung khắc!");
      return;
    }

    if (!variant) {
      alert(" Không tìm thấy thông tin sản phẩm!");
      return;
    }

    const extraPrice = engraving?.extraPrice || 0;

    // ✅ Ưu tiên lấy ảnh theo thứ tự an toàn
    const imageUrl =
      variant.image ||
      variant.thumbnail ||
      variant.imageUrl ||
      variant.images?.[0] ||
      engraving.cleanImageUrl ||
      engraving.imageUrl ||
      engraving.previewImage ||
      (variant.productImage && `${API_BASE_URL}${variant.productImage}`) ||
      "";

    // ✅ Thêm vào giỏ
    addToCart({
      productId: product?.id || variant.productId, // 🆕 Dùng product (state)
      variantId: variant.id,
      name: variant.name || "Sản phẩm không tên",
      price: variant.price || 0,
      engravingText: text.trim(),
      engravingFee: extraPrice,
      imageUrl,
      quantity: 1,
    });

    alert("✅ Đã thêm sản phẩm vào giỏ hàng!");
    onClose?.();
  };





  if (loading)
    return (
      <>
      </>
    );

  if (!engraving || !variant)
    return (
      <>

      </>
    );

  const {
    engravingX,
    engravingY,
    engravingColor,
    engravingFont,
    engravingSize,
    cleanImageUrl,
    extraPrice = 0,
  } = engraving;

  const basePrice = variant.price || 0;
  const totalPrice = basePrice + extraPrice;

  const imageSrc = cleanImageUrl?.startsWith("http")
    ? cleanImageUrl
    : `${API_BASE_URL}${cleanImageUrl}`;

  return (
    <div className="engraving-overlay">
      <motion.div
        className="engraving-modal"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h4 className="mb-4 fw-bold text-center">Cá nhân hóa sản phẩm của bạn</h4>

        <div className="editor-content">
          {/* Khu vực xem trước */}
          <div className="preview-area">
            <div
              className="preview-bg"
              style={{ backgroundImage: `url(${imageSrc})` }}
            ></div>

            <img src={imageSrc} alt="Product" className="preview-img" />

            <motion.div
              className="engraving-text"
              style={{
                left: `${engravingX}%`,
                top: `${engravingY}%`,
                fontFamily: `${engravingFont}, sans-serif !important`,
                color: engravingColor,
                fontSize: `${engravingSize || 22}px`,
                textShadow:
                  engravingColor === "#fff"
                    ? "1px 1px 2px rgba(0,0,0,0.6)"
                    : "1px 1px 2px rgba(255,255,255,0.6)",
              }}
            >
              {text}
            </motion.div>

          </div>

          {/* Điều khiển và giá */}
          <div className="controls">
            <label className="form-label fw-semibold mt-3">Nội dung chữ khắc</label>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Nhập chữ muốn khắc (tối đa 20 ký tự)"
              maxLength={20}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <div className="price-box mt-3 p-3 rounded shadow-sm bg-light">
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span >Tổng cộng:</span>
                <span style={{ color: "#651C17" }}>{totalPrice.toLocaleString()}₫</span>
              </div>
            </div>

            <div className="actions mt-4 d-flex justify-content-center gap-3">
              <button className="vs-btn btn-primary" onClick={handleAddToCart}>
                Thêm vào giỏ hàng
              </button>
              <button className="vs-btn btn-secondary" style={{ color: "#fff" }} onClick={onClose}>
                Hủy
              </button>
            </div>
          </div>
        </div>

        {/* Style đồng bộ admin */}
        <style>{`
          .engraving-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 3000;
            backdrop-filter: blur(5px);
          }

          .engraving-modal {
            background: #fff;
            padding: 36px 40px;
            border-radius: 20px;
            width: 95%;
            max-width: 1350px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.25);
            animation: popupZoom 0.3s ease;
          }

          @keyframes popupZoom {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }

          .editor-content {
            display: grid;
            grid-template-columns: 1.2fr 0.8fr;
            gap: 30px;
            align-items: start;
          }

          .preview-area {
            position: relative;
            width: 100%;
            aspect-ratio: 1/1;
            overflow: hidden;
            border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fafafa;
          }

          .preview-bg {
            position: absolute;
            inset: 0;
            background-size: cover;
            background-position: center;
            filter: blur(15px) brightness(0.8);
            transform: scale(1.1);
          }

          .preview-img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            position: relative;
            z-index: 2;
          }

          .engraving-text {
            position: absolute;
            transform: translate(-50%, -50%);
            font-weight: 600;
            user-select: none;
            pointer-events: none;
            z-index: 3;
            white-space: nowrap;
          }

          .price-box {
            background: #f8f9fa;
            border: 1px solid #ddd;
          }

          .vs-btn {
            padding: 12px 24px;
            border-radius: 8px;
            border: none;
            font-weight: 600;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.2s ease;
          }

          .btn-primary {
            background: #2b7cff;
            color: #fff;
          }

          .btn-primary:hover {
            background: #1b6cf6;
          }

          .btn-secondary {
            background: #ddd;
            color: #333;
          }

          .btn-secondary:hover {
            background: #ccc;
          }

          .form-label {
            font-weight: 600;
            margin-bottom: 4px;
          }
        `}</style>
      </motion.div>
    </div>
  );
}
