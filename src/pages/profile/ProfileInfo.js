import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfileInfo() {
  const [user, setUser] = useState({});
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    address: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Bạn cần đăng nhập để xem thông tin cá nhân.");
      return;
    }

    axios
      .get("http://localhost:5186/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setUser(res.data);
        setForm(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Không thể tải thông tin người dùng.");
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập lại!");
      return;
    }

    try {
      await axios.put("http://localhost:5186/api/profile", form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Cập nhật thành công!");
    } catch (err) {
      console.error(err);
      alert("Lỗi khi cập nhật thông tin!");
    }
  };

  if (error) {
    return <div className="alert alert-warning mt-3">{error}</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Tên người dùng</label>
        <input
          name="username"
          className="form-control"
          value={form.username || ""}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input
          name="email"
          className="form-control"
          value={form.email || ""}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Số điện thoại</label>
        <input
          name="phone"
          className="form-control"
          value={form.phone || ""}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Địa chỉ</label>
        <input
          name="address"
          className="form-control"
          value={form.address || ""}
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-primary">Lưu thay đổi</button>
    </form>
  );
}
