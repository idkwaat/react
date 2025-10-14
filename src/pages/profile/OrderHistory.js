import { useEffect, useState } from "react";
import axios from "axios";
import { Fragment } from "react";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token"); // token lưu sau khi login
    if (!token) {
      setError("Vui lòng đăng nhập để xem đơn hàng của bạn.");
      return;
    }

    axios
      .get("http://localhost:5186/api/orders/my-orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 401) {
          setError("Phiên đăng nhập hết hạn hoặc không hợp lệ.");
        } else {
          setError("Lỗi khi tải danh sách đơn hàng.");
        }
      });
  }, []);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h4 className="mb-3 fw-bold">🧾 Lịch sử đơn hàng</h4>

      {orders.length === 0 ? (
        <p>Chưa có đơn hàng nào.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Mã đơn</th>
                <th>Ngày đặt</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <Fragment key={o.id}>
                  <tr>
                    <td>#{o.id}</td>
                    <td>
                      {new Date(o.createdAt || o.orderDate).toLocaleDateString()}
                    </td>
                    <td>{(o.totalAmount || o.total).toLocaleString()}₫</td>
                    <td>
                      <span
                        className={`badge ${
                          o.status === "Delivered"
                            ? "bg-success"
                            : o.status === "Pending"
                            ? "bg-warning text-dark"
                            : "bg-secondary"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => toggleExpand(o.id)}
                      >
                        {expanded === o.id ? "Ẩn" : "Xem"}
                      </button>
                    </td>
                  </tr>

                  {expanded === o.id && (
                    <tr>
                      <td colSpan="5">
                        <div className="p-3 bg-light rounded">
                          <h6 className="fw-bold mb-2">Sản phẩm:</h6>
                          <ul className="list-unstyled mb-0">
                            {o.items?.map((item) => (
                              <li key={item.productId}>
                                {item.productName} × {item.quantity} —{" "}
                                {(item.price * item.quantity).toLocaleString()}₫
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

