import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";


const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5186";

export default function MyOrders() {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;

      try {
        const res = await fetch(`${API_BASE_URL}/api/orders/my-orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Không thể tải đơn hàng");

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const toggleExpand = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  return (
    <div className="vs-checkout-wrapper space-top space-extra-bottom" style={{marginBottom:"100px"}}>
      <div className="container">
        <h2 className="mb-4">🧾 Đơn hàng của tôi</h2>

        {loading ? (
          <div className="text-center py-5">⏳ Đang tải đơn hàng...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-5 text-muted">
            Bạn chưa có đơn hàng nào.
          </div>
        ) : (
          <div className="checkout-summary p-3 border rounded">
            {orders.map((order) => (
              <div
                key={order.id}
                className="order-card p-3 mb-4 border-bottom"
                style={{
                  borderRadius: "12px",
                  background: "#fff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                {/* Header đơn hàng */}
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <div>
                    <h5 style={{ margin: 0 }}>
                      <strong>Đơn #{order.id}</strong>
                    </h5>
                    <div
                      className="text-muted"
                      style={{ fontSize: "0.9rem", marginTop: "3px" }}
                    >
                      Ngày đặt:{" "}
                      {new Date(order.createdAt).toLocaleString("vi-VN", {
                        hour12: false,
                      })}
                    </div>
                  </div>

                  <div className="text-end">
                    <span
                      className={`badge px-3 py-2 ${
                        order.status === "Pending"
                          ? "bg-warning text-dark"
                          : order.status === "Shipped"
                          ? "bg-info text-dark"
                          : order.status === "Completed"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                      style={{ fontSize: "0.9rem" }}
                    >
                      {order.status}
                    </span>
                    <div
                      style={{
                        fontWeight: "600",
                        color: "#e67e22",
                        fontSize: "1rem",
                        marginTop: "5px",
                      }}
                    >
                      {order.totalAmount.toLocaleString()}₫
                    </div>
                    <button
                      className="vs-btn mt-2"
                      style={{ padding: "4px 12px", fontSize: "0.9rem" }}
                      onClick={() => toggleExpand(order.id)}
                    >
                      {expandedOrderId === order.id 
                        ? "Ẩn chi tiết"
                        : "Xem chi tiết"}
                    </button>
                  </div>
                </div>

                {/* Chi tiết sản phẩm */}
                <AnimatePresence>
                {expandedOrderId === order.id && (
                    <motion.div
      className="mt-3"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
                  <div className="mt-3">
                    {order.items && order.items.length > 0 ? (
                      <table className="table table-sm align-middle mt-2">
                        <thead className="table-light">
                          <tr>
                            <th style={{ width: "55%" }}>Sản phẩm</th>
                            <th style={{ textAlign: "center", width: "15%" }}>
                              Số lượng
                            </th>
                            <th style={{ textAlign: "right", width: "30%" }}>
                              Thành tiền
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item, idx) => (
                            <tr key={idx}>
                              <td>
                                <div className="d-flex align-items-center gap-3">
                                  <img
                                    src={
                                      item.imageUrl?.startsWith("http")
                                        ? item.imageUrl
                                        : `${API_BASE_URL}${item.imageUrl}`
                                    }
                                    alt={item.productName}
                                    style={{
                                      width: "60px",
                                      height: "60px",
                                      objectFit: "cover",
                                      borderRadius: "8px",
                                      boxShadow: "0 0 3px rgba(0,0,0,0.1)",
                                    }}
                                  />
                                  <div>
                                    <div
                                      style={{
                                        fontWeight: "600",
                                        fontSize: "0.95rem",
                                        color: "#333",
                                      }}
                                    >
                                      {item.productName}
                                    </div>
                                    {item.variantName && (
                                      <div
                                        style={{
                                          fontSize: "0.85rem",
                                          color: "#777",
                                        }}
                                      >
                                        Biến thể: {item.variantName}
                                      </div>
                                    )}
                                    <div
                                      style={{
                                        fontSize: "0.85rem",
                                        color: "#999",
                                      }}
                                    >
                                      Đơn giá:{" "}
                                      {item.price.toLocaleString()}₫
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.quantity}
                              </td>
                              <td
                                style={{
                                  textAlign: "right",
                                  fontWeight: "600",
                                  color: "#d35400",
                                }}
                              >
                                {(item.price * item.quantity).toLocaleString()}₫
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-muted small">
                        (Đơn hàng chưa có chi tiết sản phẩm)
                      </div>
                    )}
                  </div>
                  </motion.div>
                )}
                </AnimatePresence>
              </div>
            ))}
            
          </div>
        )}
        
      </div>
    </div>
  );
}
