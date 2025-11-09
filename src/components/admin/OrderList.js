import React, { useEffect, useState } from "react";
import OrderDetailModal from "./OrderDetailModal";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5186";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE_URL}/api/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  };

  const fetchOrderDetail = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return alert("Không thể tải chi tiết đơn hàng.");
      const data = await res.json();
      setSelectedOrder(data);
    } catch (err) {
      console.error(err);
      alert("Lỗi khi tải chi tiết đơn hàng.");
    }
  };

  const updateStatus = async (id, newStatus) => {
    const token = localStorage.getItem("token");
    if (!window.confirm(`Xác nhận đổi trạng thái đơn #${id} sang "${newStatus}"?`)) return;

    await fetch(`${API_BASE_URL}/api/orders/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newStatus),
    });
    await fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Đang tải đơn hàng...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📦 Quản lý đơn hàng</h2>

      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border p-2">ID</th>
            <th className="border p-2">Khách hàng</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Tổng tiền</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Ngày đặt</th>
            <th className="border p-2 text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="hover:bg-gray-50">
              <td className="border p-2">{o.id}</td>
              <td className="border p-2">{o.customerName}</td>
              <td className="border p-2">{o.email}</td>
              <td className="border p-2">{o.total.toLocaleString()} đ</td>
              <td className={`border p-2 font-medium rounded ${statusColors[o.status] || ""}`}>
                {o.status}
              </td>
              <td className="border p-2">
                {new Date(o.orderDate).toLocaleString("vi-VN")}
              </td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => fetchOrderDetail(o.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                >
                  Xem
                </button>

                <select
                  className="border px-2 py-1 rounded"
                  value={o.status}
                  onChange={(e) => updateStatus(o.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Chi tiết đơn hàng */}
      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default OrderList;
