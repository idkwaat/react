import React, { useEffect, useState, useMemo } from "react";
import { Modal, Button, Spinner, ProgressBar } from "react-bootstrap";
import * as signalR from "@microsoft/signalr";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // 🛒 thêm dòng này

const PaymentPopup = ({ show, onClose, orderId, amount, qrUrl, customerName, accountName, accountNo }) => {

  const [status, setStatus] = useState("pending");
  const [timeLeft, setTimeLeft] = useState(600);
  const navigate = useNavigate();
    const { clearCart } = useCart();



  // 🔄 Kết nối SignalR (nhận realtime thanh toán từ backend)
  useEffect(() => {
    if (!orderId || !show) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(
        `https://truchoavien2.onrender.com/hubs/payments?orderId=${orderId}`
      )
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => console.log("✅ Connected to SignalR for order", orderId))
      .catch((err) => console.error("❌ SignalR connection error:", err));

    connection.on("PaymentStatus", (data) => {
      console.log("📩 Payment status:", data);
      if (data.status === "success") setStatus("success");
    });


    return () => {
      connection.stop();
    };
  }, [orderId, show]);

  // ⏱ Đếm ngược thời gian
  useEffect(() => {
    if (!show || status !== "pending") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setStatus("expired");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [show, status]);

  // ✅ Khi thanh toán thành công → tự đóng sau 3s
  useEffect(() => {
    if (status === "success") {
      clearCart(); // 💥 Xóa giỏ ngay khi backend báo thanh toán thành công
      const timer = setTimeout(() => {
        onClose();
        navigate(`/orders/${orderId}/success`);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, navigate, onClose, orderId, clearCart]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progress = (timeLeft / 600) * 100;

  return (
    <Modal show={show} onHide={onClose} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Thanh toán đơn hàng #{orderId}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center">
        <AnimatePresence mode="wait">
          {status === "pending" && (
            <motion.div
              key="pending"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p>
                Quét mã QR để thanh toán{" "}
                <strong>{Number(amount || 0).toLocaleString("vi-VN")}₫</strong>
              </p>

              <img
                src={qrUrl}
                alt="QR thanh toán"
                style={{
                  width: 250,
                  height: 250,
                  border: "1px solid #ccc",
                  borderRadius: 10,
                  padding: 10,
                }}
              />

              <p className="mt-2 mb-0">
                <strong>{accountName}</strong> - TPBank
              </p>
              <p className="text-muted small mb-2">STK: {accountNo}</p>
<p className="text-muted">
  Nội dung chuyển khoản:{" "}
  <strong>
    DH{orderId}_{customerName?.toUpperCase().replace(/\s+/g, "")}
  </strong>
</p>



              <div className="mt-3">
                <ProgressBar
                  now={progress}
                  variant="info"
                  style={{ height: "6px", borderRadius: "4px" }}
                />
                <div className="small text-muted mt-1">
                  Thời gian còn lại: {formatTime(timeLeft)}
                </div>
              </div>

              <div className="mt-3 text-secondary">
                <Spinner animation="border" size="sm" /> Đang chờ thanh toán...
              </div>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-success"
            >
              <h4>🎉 Thanh toán thành công!</h4>
              <p>Đơn hàng #{orderId} đã được xác nhận.</p>
              <p className="text-muted small">Chuyển hướng sau 3 giây...</p>
            </motion.div>
          )}

          {status === "expired" && (
            <motion.div
              key="expired"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-danger"
            >
              <h4>⏰ Hết thời gian thanh toán!</h4>
              <p>Đơn hàng sẽ bị hủy nếu chưa thanh toán.</p>
              <Button variant="secondary" onClick={onClose}>
                Đóng
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal.Body>
    </Modal>
  );
};

export default PaymentPopup;
