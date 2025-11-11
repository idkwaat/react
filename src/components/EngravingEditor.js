import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function EngravingEditor({ variant, onClose, onSaved }) {
  const [text, setText] = useState(variant.engravingText || "Vị trí khắc");
  const [position, setPosition] = useState({
    x: variant.engravingX || 50,
    y: variant.engravingY || 80,
  });
  const [font, setFont] = useState(variant.engravingFont || "Courier New");
  const [color, setColor] = useState(variant.engravingColor || "#333");
  const [fontSize, setFontSize] = useState(variant.engravingSize || 22);
  const [dragging, setDragging] = useState(false);
  const [extraPrice, setExtraPrice] = useState(variant.extraPrice);

  // ✅ Thêm đoạn này — để tự cập nhật lại nếu variant thay đổi
  useEffect(() => {
    if (variant) {
      setText(variant.engravingText || "Vị trí khắc");
      setPosition({
        x: variant.engravingX || 50,
        y: variant.engravingY || 80,
      });
      setFont(variant.engravingFont || "Courier New");
      setColor(variant.engravingColor || "#333");
      setFontSize(variant.engravingSize || 22);
      setExtraPrice(variant.extraPrice || 0);
    }
  }, [variant]);
  // ✅ Điều này cực kỳ quan trọng, vì khi bạn fetch chi tiết variant từ server
  // thì component sẽ tự cập nhật lại nội dung khắc cũ thay vì giữ state cũ

  const engravingColors = [
    { label: "Bạc", value: "#aaa" },
    { label: "Vàng", value: "#c6a400" },
    { label: "Đen", value: "#333" },
    { label: "Trắng", value: "#fff" },
    { label: "Đỏ", value: "#c0392b" },
  ];

  const engravingFonts = [
    "Courier New",
    "Arial",
    "Verdana",
    "Tahoma",
    "Trebuchet MS",
    "Times New Roman",
    "Georgia",
    "Comic Sans MS",
    "Impact",
    "System-ui",
  ];

  const handleSave = async () => {
    try {
      const payload = {
        id: variant.id,
        engravingText: text,
        engravingX: position.x,
        engravingY: position.y,
        engravingFont: font,
        engravingColor: color,
        engravingSize: fontSize,
        extraPrice: extraPrice,
      };

      const API_BASE_URL =
        process.env.REACT_APP_API_URL || "http://localhost:5186";

      await axios.put(
        `${API_BASE_URL}/api/products/${variant.id}/engraving`,
        payload
      );

      onSaved && onSaved(payload);
      onClose();

      setTimeout(() => {
        alert("✅ Đã lưu vị trí và nội dung khắc thành công!");
      }, 300);
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi lưu dữ liệu khắc.");
    }
  };

  const handleDrag = (e) => {
    const rect = e.target.parentElement.getBoundingClientRect();
    setPosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const imageSrc =
    variant.cleanImageUrl?.startsWith("http")
      ? variant.cleanImageUrl
      : `${
          process.env.REACT_APP_API_URL || "http://localhost:5186"
        }${variant.cleanImageUrl}`;

  // ... phần JSX hiển thị (không cần đổi)

  return (
    <div className="engraving-overlay">
      <motion.div
        className="engraving-modal"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h4 className="mb-4 fw-bold text-center">🪶 Tùy chỉnh khắc chữ</h4>

        <div className="editor-content">
          {/* Khu vực xem trước */}
          <div
            className="preview-area"
            onMouseDown={() => setDragging(true)}
            onMouseUp={() => setDragging(false)}
            onMouseMove={(e) => dragging && handleDrag(e)}
          >
            <div
              className="preview-bg"
              style={{ backgroundImage: `url(${imageSrc})` }}
            ></div>

            <img src={imageSrc} alt="clean preview" className="preview-img" />

<div
  className="engraving-text"
  style={{
    left: `${position.x}%`,
    top: `${position.y}%`,
    fontFamily: `${font}, sans-serif`, // hoặc ", serif" nếu là kiểu chữ có chân
    color,
    fontSize: `${fontSize}px`,
    textShadow:
      color === "#fff"
        ? "1px 1px 2px rgba(0,0,0,0.6)"
        : "1px 1px 2px rgba(255,255,255,0.6)",
  }}
>
  {text || "Vị trí khắc"}
</div>

          </div>

          {/* Bảng điều khiển */}
          <div className="controls">
            <label className="form-label"> Nội dung chữ khắc (demo để test)</label>
            <input
              type="text"
              className="form-control mb-3"
              value={text}
              placeholder="Nhập nội dung..."
              onChange={(e) => setText(e.target.value)}
            />
            <label className="form-label"> Giá Custom (₫)</label>
<input
  type="number"
  className="form-control mb-3"
  value={extraPrice}
  min={0}
  step={1000}
  onChange={(e) => setExtraPrice(parseFloat(e.target.value) || 0)}
  placeholder="sẽ là giá + thêm vào giá gốc"
/>


            <label className="form-label"> Font chữ</label>
            <select
              className="form-select mb-3"
              value={font}
              onChange={(e) => setFont(e.target.value)}
            >
              {engravingFonts.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>

            <label className="form-label"> Cỡ chữ ({fontSize}px)</label>
            <input
              type="range"
              className="form-range mb-3"
              min={8}
              max={60}
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
            />

            <label className="form-label"> Màu khắc</label>
            <div className="d-flex align-items-center gap-2 mb-3">
              <select
                className="form-select"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                {engravingColors.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>

              <input
                type="color"
                className="form-control form-control-color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />

              <div style={{ fontWeight: 600, minWidth: 70 }}>{color}</div>
            </div>
          </div>
        </div>

        <div className="actions mt-4 d-flex justify-content-center gap-3">
          <button className="vs-btn btn-primary" onClick={handleSave}>
             Lưu
          </button>
          <button className="vs-btn btn-secondary" onClick={onClose}>
            Hủy
          </button>
        </div>
      </motion.div>

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
    max-width: 1350px; /* 🔹 tăng từ 900px → 1350px (to hơn ~50%) */
    box-shadow: 0 10px 40px rgba(0,0,0,0.25);
    animation: popupZoom 0.3s ease;
  }

  @keyframes popupZoom {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  .editor-content {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr; /* 🔹 cân đối lại tỷ lệ cột */
    gap: 30px;
    align-items: start;
  }

  .preview-area {
    position: relative;
    width: 100%;
    aspect-ratio: 1/1;
    overflow: hidden;
    border-radius: 18px;
    cursor: move;
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
    font-size: 26px; /* 🔹 tăng nhẹ để tương xứng popup */
    user-select: none;
    pointer-events: none;
    z-index: 3;
    white-space: nowrap;
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

    </div>
  );
}
