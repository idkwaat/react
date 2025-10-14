import { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import AvatarUpload from "./AvatarUpload";
import OrderHistory from "./OrderHistory";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("info");

  const tabs = [
    { key: "info", label: "Thông tin cá nhân" },
    { key: "password", label: "Đổi mật khẩu" },
    { key: "avatar", label: "Ảnh đại diện" },
    { key: "orders", label: "Lịch sử đơn hàng" },
    { key: "reviews", label: "Đánh giá sản phẩm" },
  ];

  return (
    <div className="container py-5">
      <h2 className="mb-4">👤 Hồ sơ cá nhân</h2>

      <ul className="nav nav-tabs mb-4">
        {tabs.map(tab => (
          <li key={tab.key} className="nav-item">
            <button
              className={`nav-link ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      {activeTab === "info" && <ProfileInfo />}
      {activeTab === "password" && <ChangePassword />}
      {activeTab === "avatar" && <AvatarUpload />}
      {activeTab === "orders" && <OrderHistory />}
      {activeTab === "reviews" && <div>Chức năng đánh giá sản phẩm...</div>}
    </div>
  );
}
