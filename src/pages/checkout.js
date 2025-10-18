import React, { useState, useContext } from "react";
import { useCart } from "../context/CartContext";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";
import PaymentPopup from "../components/PaymentPopup"; // popup hiển thị QR
import { useNavigate } from "react-router-dom";


const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5186";

export default function CheckOut() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    province: "",
    district: "",
    ward: "",
    address: "",
    notes: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("❌ Bạn cần đăng nhập để đặt hàng!");
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);

      // 🔹 1️⃣ Gửi request tạo đơn hàng (OrdersController)
      const order = {
        customerName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        address: `${formData.address}, ${formData.ward}, ${formData.district}, ${formData.province}`,
        notes: formData.notes,
        paymentMethod: "Chuyển khoản ngân hàng",
        totalAmount: getCartTotal(),
        items: cartItems.map((item) => ({
          productId: item.productId,
          variantId: item.variantId || null,
          variantName: item.variantName || null,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const res = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order),
      });

      if (!res.ok) {
        if (res.status === 401) {
          alert("⚠️ Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.");
          localStorage.removeItem("token");
        } else {
          const errorText = await res.text();
          console.error("Server error:", errorText);
          alert("❌ Lỗi khi tạo đơn hàng!");
        }
        return;
      }

      const result = await res.json();

      // 🔹 2️⃣ Dùng VietQR trả từ backend (OrdersController)
      setCreatedOrder({
        id: result.id,
        totalAmount: result.totalAmount || getCartTotal(),
        qrUrl: result.qrUrl, // ✅ link VietQR backend trả về
      });

      setShowPopup(true);
    } catch (err) {
      console.error("Lỗi khi gửi đơn hàng:", err);
      alert("❌ Không thể kết nối tới server hoặc token lỗi!");
    }
  };

  return (
    <div className="vs-checkout-wrapper space-top space-extra-bottom">
      <div className="container">
        <form className="checkout-form mt-40" onSubmit={handlePlaceOrder}>
          <div className="row">
            {/* --- THÔNG TIN NGƯỜI NHẬN --- */}
            <div className="col-lg-6">
              <h3>Thông tin giao hàng</h3>
              {[
                { label: "Họ và tên *", name: "fullName" },
                { label: "Số điện thoại *", name: "phone" },
                { label: "Email", name: "email", type: "email" },
                { label: "Tỉnh / Thành phố *", name: "province" },
                { label: "Quận / Huyện *", name: "district" },
                { label: "Phường / Xã *", name: "ward" },
                { label: "Địa chỉ chi tiết *", name: "address" },
              ].map((f) => (
                <div className="form-group" key={f.name}>
                  <label>{f.label}</label>
                 <input
  type={f.type || "text"}
  name={f.name}
  value={formData[f.name]}
  onChange={handleChange}
  required={f.label.includes("*")}
  style={{ color: formData[f.name] ? "white" : "#333", transition: "0.2s" }}
  onFocus={(e) => (e.target.style.color = "white")}
  onBlur={(e) => {
    if (!e.target.value) e.target.style.color = "#333"; // Nếu trống, chuyển lại xám
  }}
/>

                </div>
              ))}
              <div className="form-group">
                <label>Ghi chú</label>
                <textarea
  name="notes"
  value={formData.notes}
  onChange={handleChange}
  style={{ color: formData.notes ? "white" : "#333", transition: "0.2s" }}
  onFocus={(e) => (e.target.style.color = "white")}
  onBlur={(e) => {
    if (!e.target.value) e.target.style.color = "#333";
  }}
></textarea>

              </div>
            </div>

            {/* --- THÔNG TIN ĐƠN HÀNG + THANH TOÁN --- */}
            <div className="col-lg-6">
              <h3>Thanh toán chuyển khoản</h3>
              <div className="checkout-summary p-3 border rounded">
                <table className="table mb-3 align-middle">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: "55%" }}>Sản phẩm</th>
                      <th style={{ textAlign: "center", width: "15%" }}>SL</th>
                      <th style={{ textAlign: "right", width: "30%" }}>
                        Thành tiền
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(!Array.isArray(cartItems) || cartItems.length === 0) ? (
                      <tr>
                        <td colSpan="3" className="text-center py-3 text-muted">
                          Giỏ hàng trống
                        </td>
                      </tr>
                    ) : (
                      cartItems.map((item) => (
                        <tr key={`${item.productId}-${item.variantId || "base"}`}>
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
                                  width: "64px",
                                  height: "64px",
                                  objectFit: "cover",
                                  borderRadius: "10px",
                                  boxShadow: "0 0 4px rgba(0,0,0,0.1)",
                                }}
                              />
                              <div>
                                <div
                                  style={{
                                    fontWeight: "600",
                                    fontSize: "1rem",
                                    color: "#333",
                                  }}
                                >
                                  {item.productName}
                                </div>
                                {item.variantName && (
                                  <div style={{ fontSize: "0.9em", color: "#777" }}>
                                    <i>Biến thể:</i> {item.variantName}
                                  </div>
                                )}
                                <div style={{ fontSize: "0.85em", color: "#999" }}>
                                  Đơn giá: {item.price.toLocaleString()}₫
                                </div>
                              </div>
                            </div>
                          </td>
                          <td style={{ textAlign: "center", fontWeight: "500" }}>
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
                      ))
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan="2" style={{ textAlign: "right" }}>
                        Tổng cộng
                      </th>
                      <th style={{ textAlign: "right", color: "#e74c3c" }}>
                        {getCartTotal().toLocaleString()}₫
                      </th>
                    </tr>
                  </tfoot>
                </table>

                <button type="submit" className="vs-btn mt-3 w-100">
                  Xác nhận đặt hàng
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* 🧾 Popup thanh toán */}
        {createdOrder && (
          <PaymentPopup
            show={showPopup}
            onClose={() => setShowPopup(false)}
            orderId={createdOrder.id}
            amount={createdOrder.totalAmount}
            qrUrl={createdOrder.qrUrl}
            customerName={formData.fullName}
            accountName="PHUNG TO UYEN"
            accountNo="26266363999"
            onPaid={() => clearCart()}
          />
        )}
      </div>
    </div>
  );
}
