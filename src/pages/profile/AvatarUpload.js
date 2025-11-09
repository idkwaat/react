import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5186";

export default function AvatarUpload() {
  const { user, setUser } = useContext(AuthContext);
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar || "/assets/img/default-avatar.png"
  );
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/upload-avatar`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload thất bại");
      const data = await res.json();

      const newUrl = data.url || `${API_BASE_URL}${data.path}`;
      setAvatarPreview(newUrl);

      // ✅ Cập nhật context và localStorage
      setUser((prev) => ({ ...prev, avatar: newUrl }));
      localStorage.setItem("avatar", newUrl);

      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      localStorage.setItem("user", JSON.stringify({ ...storedUser, avatar: newUrl }));

      // 🔔 Báo toàn app cập nhật
      window.dispatchEvent(new Event("authChanged"));

      alert("✅ Cập nhật ảnh đại diện thành công!");
    } catch (err) {
      console.error("Lỗi upload avatar:", err);
      alert("❌ Không thể tải ảnh lên!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="text-center">
      <img
        src={avatarPreview}
        alt="Avatar"
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          objectFit: "cover",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      />
      <div className="mt-3">
        <label className="vs-btn" htmlFor="avatarInput">
          {uploading ? "Đang tải..." : "Chọn ảnh mới"}
        </label>
        <input
          type="file"
          id="avatarInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
