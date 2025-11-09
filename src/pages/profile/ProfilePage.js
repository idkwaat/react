import { useState, useContext, useEffect } from "react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import AvatarUpload from "./AvatarUpload";
import OrderHistory from "./OrderHistory";
import { AuthContext } from "../../context/AuthContext";


export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("info");
  const { user } = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState("/assets/img/default-avatar.png");

  // ✅ Theo dõi avatar trong localStorage để cập nhật ngay
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedAvatar =
      storedUser?.avatar || localStorage.getItem("avatar") || "/assets/img/default-avatar.png";
    setAvatarUrl(storedAvatar);

    const handleAuthChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setAvatarUrl(updatedUser?.avatar || "/assets/img/default-avatar.png");
    };

    window.addEventListener("authChanged", handleAuthChange);
    return () => window.removeEventListener("authChanged", handleAuthChange);
  }, [user]);

  const tabs = [
    { key: "info", label: "Thông tin cá nhân" },
    { key: "password", label: "Đổi mật khẩu" },
    { key: "avatar", label: "Ảnh đại diện" },
    { key: "orders", label: "Lịch sử đơn hàng" },
  ];

  return (
    <div
      className="vs-checkout-wrapper space-top space-extra-bottom"
      style={{ marginBottom: "100px" }}
    >
      <div className="container">
        {/* ==== Tiêu đề có Avatar ==== */}
        <h2 className="mb-4 text-center sec-title d-flex align-items-center justify-content-center gap-3">
          <img
            src={avatarUrl}
            alt="Avatar"
            style={{
              width: "65px",
              height: "65px",
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow: "0 0 8px rgba(0,0,0,0.15)",
              border: "3px solid #fff",
              backgroundColor: "#fff",
            }}
          />
          Hồ sơ cá nhân
        </h2>

        {/* ==== Tabs ==== */}
        <ul className="nav justify-content-center nav-tabs mb-4 border-0 flex-wrap gap-2">
          {tabs.map((tab) => (
            <li key={tab.key} className="nav-item mx-1">
              <button
                className={`vs-btn ${
                  activeTab === tab.key ? "" : "vs-btn-outline"
                }`}
                style={{
                  padding: "10px 20px",
                  minWidth: "180px",
                  fontWeight: "500",
                }}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        {/* ==== Nội dung ==== */}
        <div
          className="p-4 rounded shadow-sm"
          style={{
            backgroundColor: "#fffdfa",
            border: "1px solid #f1e9da",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          {activeTab === "info" && <ProfileInfo />}
          {activeTab === "password" && <ChangePassword />}
          {activeTab === "avatar" && <AvatarUpload />}
          {activeTab === "orders" && <OrderHistory />}
        </div>
      </div>
    </div>
  );
}
