import { useEffect, useState, Fragment } from "react";
import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5186";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Vui lòng đăng nhập để xem đơn hàng của bạn.");
      return;
    }

    axios
      .get(`${API_BASE_URL}/api/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => {
        if (err.response?.status === 401)
          setError("Phiên đăng nhập hết hạn.");
        else setError("Lỗi khi tải danh sách đơn hàng.");
      });
  }, []);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  if (error)
    return <div className="alert alert-warning text-center mt-3">{error}</div>;

  return (
    <div className="checkout-summary p-3 border rounded">
      <h4 className="fw-bold mb-4">📦 Lịch sử đơn hàng</h4>

      {orders.length === 0 ? (
        <p>Chưa có đơn hàng nào.</p>
      ) : (
        orders.map((o) => (
          <Fragment key={o.id}>
            <div
              className="p-3 mb-3 rounded shadow-sm bg-white border"
              style={{ borderColor: "#f1e9da" }}
            >
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h6 className="fw-bold mb-1">Đơn hàng #{o.id}</h6>
                  <div className="text-muted small">
                    Ngày đặt:{" "}
                    {new Date(o.createdAt || o.orderDate).toLocaleString(
                      "vi-VN",
                      { hour12: false }
                    )}
                  </div>
                </div>

                <div className="text-end">
                  <span
                    className={`badge px-3 py-2 ${
                      o.status === "Delivered"
                        ? "bg-success"
                        : o.status === "Pending"
                        ? "bg-warning text-dark"
                        : "bg-secondary"
                    }`}
                  >
                    {o.status}
                  </span>
                  <div
                    className="mt-1 fw-semibold"
                    style={{ color: "#e67e22" }}
                  >
                    {(o.totalAmount || o.total).toLocaleString()}₫
                  </div>

                  <button
                    className="vs-btn mt-2"
                    style={{ padding: "4px 12px", fontSize: "0.85rem" }}
                    onClick={() => toggleExpand(o.id)}
                  >
                    {expanded === o.id ? "Ẩn chi tiết" : "Xem chi tiết"}
                  </button>
                </div>
              </div>

              {expanded === o.id && (
                <div className="mt-3 border-top pt-3">
                  {o.items?.length ? (
                    <table className="table table-sm align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>Sản phẩm</th>
                          <th className="text-center">SL</th>
                          <th className="text-end">Thành tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        {o.items.map((item) => (
                          <tr key={item.productId}>
                            <td>{item.productName}</td>
                            <td className="text-center">{item.quantity}</td>
                            <td className="text-end">
                              {(item.price * item.quantity).toLocaleString()}₫
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-muted small">
                      (Chưa có chi tiết sản phẩm)
                    </div>
                  )}
                </div>
              )}
            </div>
          </Fragment>
        ))
      )}
    </div>
  );
}
