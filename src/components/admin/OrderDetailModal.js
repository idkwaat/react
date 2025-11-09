// src/components/OrderDetailModal.jsx
import React from "react";
import { motion } from "framer-motion";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5186";

const OrderDetailModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="orderdetail-overlay" onClick={onClose}>
      <motion.div
        className="orderdetail-modal"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="close-btn">×</button>

        <h3 className="modal-title">🧾 Chi tiết đơn hàng #{order.id}</h3>

        <div className="info-grid">
          <div>
            <p><strong>Trạng thái:</strong> {order.status}</p>
            <p><strong>Ngày đặt:</strong> {new Date(order.orderDate).toLocaleString("vi-VN")}</p>
            <p><strong>Tổng tiền:</strong> {order.total.toLocaleString()} đ</p>

            {/* ✅ Hiển thị thông tin khắc nếu có */}
           {/* ✅ Hiển thị thông tin khắc nếu có */}
{order.items?.some(item => item.engravingText) && (
  <p>
    <strong>Nội dung khắc:</strong>{" "}
    {order.items
      .filter(item => item.engravingText)
      .map((item, idx, arr) => (
        <span key={idx}>
          {item.engravingText}
          {idx < arr.length - 1 && ", "}
        </span>
      ))}
  </p>
)}

          </div>

          <div>
            <p><strong>Khách hàng:</strong> {order.customerName}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Địa chỉ:</strong> {order.address}</p>
            {order.phone && <p><strong>Điện thoại:</strong> {order.phone}</p>}
          </div>
        </div>

        <h4 className="section-title">📋 Sản phẩm trong đơn</h4>
        <div className="table-wrapper">
          <table className="order-table">
            <thead>
              <tr>
                <th>Ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Tổng</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map((item) => (
                <React.Fragment key={`${item.productId}-${item.variantId || 0}`}>
                  <tr>
                    <td className="text-center">
                      <img
                        src={
                          item.imageUrl?.startsWith("http")
                            ? item.imageUrl
                            : item.imageUrl
                            ? `${API_BASE_URL}${item.imageUrl}`
                            : "/images/no-image.png"
                        }
                        alt={item.productName}
                        className="item-img"
                      />
                    </td>
                    <td>
  {item.variantName || item.variant?.name || item.productName || item.name || ""}
  {item.engravingText && (
    <span className="engraving-note" style={{ color: "#5a201d" }}> (Có khắc)</span>
  )}
</td>

                    <td className="text-center">{item.quantity}</td>
                    <td>{item.price.toLocaleString()} đ</td>
                    <td className="font-semibold">
                      {(item.price * item.quantity).toLocaleString()} đ
                    </td>
                  </tr>

              
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className="total">
          Tổng cộng: <span style={{color:"#5a201d"}}>{order.total.toLocaleString()} đ</span>
        </div>

        {/* Giữ nguyên phần style của bạn */}
        <style>{`
          .orderdetail-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 3000;
            backdrop-filter: blur(6px);
          }
          .orderdetail-modal {
            background: #fff;
            padding: 32px 40px;
            border-radius: 18px;
            width: 95%;
            max-width: 1100px;
            max-height: 85vh;
            overflow-y: auto;
            box-shadow: 0 12px 40px rgba(0,0,0,0.25);
            position: relative;
          }
          .close-btn {
            position: absolute;
            top: 14px;
            right: 18px;
            font-size: 26px;
            border: none;
            background: none;
            color: #555;
            cursor: pointer;
            transition: 0.2s;
          }
          .close-btn:hover { color: #000; transform: scale(1.1); }
          .modal-title { font-size: 22px; font-weight: 700; text-align: center; margin-bottom: 20px; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; background: #f9fafb; border-radius: 12px; padding: 16px 20px; margin-bottom: 20px; }
          .section-title { font-size: 18px; font-weight: 600; margin-bottom: 10px; }
          .table-wrapper { overflow-x: auto; border-radius: 12px; }
          .order-table { width: 100%; border-collapse: collapse; border: 1px solid #ddd; }
          .order-table th { background: #f3f4f6; padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          .order-table td { padding: 10px; border-bottom: 1px solid #eee; vertical-align: middle; }
          .order-table tr:hover { background: #fafafa; }
          .item-img { width: 50px; height: 50px; object-fit: cover; border-radius: 6px; }
          .engraving-row { background: #fcfcfc; }
          .engraving-details { padding: 8px 14px; border-left: 3px solid #1b6cf6; background: #f9fbff; border-radius: 6px; font-size: 14px; line-height: 1.5; }
          .engraving-note { font-size: 13px; color: #1b6cf6; font-weight: 500; margin-left: 4px; }
          .color-dot { display: inline-block; width: 14px; height: 14px; border-radius: 50%; border: 1px solid #aaa; vertical-align: middle; }
          .total { text-align: right; font-weight: 700; font-size: 18px; margin-top: 16px; }
          .total span { color: #1b6cf6; }
        `}</style>
      </motion.div>
    </div>
  );
};

export default OrderDetailModal;
