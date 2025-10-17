import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function OrderSuccess() {
  const { id } = useParams(); // orderId từ URL

  return (
    <motion.div
      className="container py-5 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{marginBottom:"100px"}}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#d1f7d6",
            color: "#2ecc71",
            borderRadius: "50%",
            width: "100px",
            height: "100px",
            lineHeight: "100px",
            fontSize: "3rem",
          }}
        >
          ✓
        </div>
      </motion.div>

      <h2 className="mt-4">Cảm ơn bạn đã thanh toán!</h2>
      <p className="text-muted">
        Đơn hàng của bạn <strong>#{id}</strong> đã được xác nhận thành công.
      </p>

      <div className="mt-4">
        <Link to={`/shop-detail/${id}`} className="btn btn-outline-primary mx-2">
          Xem chi tiết đơn hàng
        </Link>
        <Link to="/shop" className="btn btn-primary mx-2">
          Tiếp tục mua sắm
        </Link>
      </div>
    </motion.div>
  );
}
