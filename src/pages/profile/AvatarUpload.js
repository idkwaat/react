import { useState } from "react";
import axios from "axios";

export default function AvatarUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Vui lòng chọn ảnh trước khi tải lên!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Bạn cần đăng nhập để tải ảnh đại diện!");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        "http://localhost:5186/api/profile/avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPreview(`http://localhost:5186${res.data.avatarUrl}`);

      setMessage("🎉 Upload thành công!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload thất bại! Kiểm tra lại file hoặc token.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <input
        type="file"
        accept="image/*"
        className="form-control mb-3"
        onChange={(e) => {
          const f = e.target.files[0];
          setFile(f);
          setPreview(URL.createObjectURL(f));
          setMessage("");
        }}
      />

      {preview && (
        <img
          src={preview}
          alt="Avatar preview"
          width="120"
          height="120"
          className="mt-2 rounded-circle border"
        />
      )}

      <div className="mt-3">
        <button
          className="btn btn-success"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Đang tải lên..." : "Tải ảnh lên"}
        </button>
      </div>

      {message && <p className="mt-3 text-muted">{message}</p>}
    </div>
  );
}
