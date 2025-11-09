import React, { useState, useContext } from "react";
import { FaChevronDown } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import Breadcrumb from "../components/Breadcrumb";
import { Share2, PackageCheck, Wallet, Truck, ShieldCheck, RotateCcw, BookOpen } from "lucide-react";



export default function Contact() {
  const { user } = useContext(AuthContext); // 👉 Lấy user từ context thật
  const [service, setService] = useState("Chọn dịch vụ");
  const [open, setOpen] = useState(false);

  const services = [
    "Trang trí sự kiện",
    "Trang trí cưới hỏi",
    "Hoa tươi & decor",
    "Chăm sóc sân vườn",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cảm ơn bạn đã gửi liên hệ! 🌸");
  };

  return (
    <>
<section
  className="policy-layout space"
  style={{
    backgroundColor: "#fef6e9",
    paddingTop: "60px",
    paddingBottom: "150px",
  }}
>
  <div className="container">
    <h2
      className="sec-title text-center mb-5"
      style={{ color: "#a33a2c", fontFamily: "Crimson Pro, serif" }}
    >
      Chính sách Mua hàng & Hậu mãi
    </h2>

    {/* Block Mục Chính */}
    <div className="row gy-4">
      {/* Kênh phân phối */}
      <div className="col-12">
        <div className="p-4 border rounded-4 shadow-sm policy-card" style={{ borderColor: "#a33a2c" }}>
          <div className="d-flex align-items-center mb-3">
            <Share2 size={24} className="me-2" style={{ color: "#a33a2c" }} />
            <h3 className="text-title fw-bold mb-0" style={{ fontFamily: "Crimson Pro, serif" }}>
              Kênh phân phối
            </h3>
          </div>
          <p className="mb-0" style={{ color: "#3C1E17" }}>Sản phẩm được phân phối qua các kênh trực tuyến (website, mạng xã hội Facebook/Instagram) và trực tiếp (showroom, sự kiện, triển lãm).</p>
        </div>
      </div>

      {/* Quy trình đặt hàng */}
      <div className="col-12">
        <div className="p-4 border rounded-4 shadow-sm policy-card" style={{ borderColor: "#a33a2c" }}>
          <div className="d-flex align-items-center mb-3">
            <PackageCheck size={24} className="me-2" style={{ color: "#a33a2c" }} />
            <h3 className="text-title fw-bold mb-0" style={{ fontFamily: "Crimson Pro, serif" }}>
              Quy trình đặt hàng
            </h3>
          </div>
          <p style={{ color: "#3C1E17" }}><strong>Sản phẩm có sẵn:</strong> Khách hàng lựa chọn sản phẩm, cung cấp thông tin và thanh toán. Đơn hàng sẽ được xác nhận qua email hoặc điện thoại.</p>
          <p className="mb-0" style={{ color: "#3C1E17" }}><strong>Sản phẩm tùy biến:</strong> Khách hàng liên hệ để nhận tư vấn và báo giá. Đơn hàng được tiến hành sau khi khách hàng đặt cọc 100% giá trị sản phẩm.</p>
        </div>
      </div>

      {/* Thanh toán */}
      <div className="col-12">
        <div className="p-4 border rounded-4 shadow-sm policy-card" style={{ borderColor: "#a33a2c" }}>
          <div className="d-flex align-items-center mb-3">
            <Wallet size={24} className="me-2" style={{ color: "#a33a2c" }} />
            <h3 className="text-title fw-bold mb-0" style={{ fontFamily: "Crimson Pro, serif" }}>
              Thanh toán
            </h3>
          </div>
          <p className="mb-0" style={{ color: "#3C1E17" }}>Chấp nhận thanh toán qua chuyển khoản ngân hàng (TPBank) và tiền mặt khi nhận hàng (COD) với các điều kiện áp dụng.</p>
        </div>
      </div>

      {/* Vận chuyển */}
      <div className="col-12">
        <div className="p-4 border rounded-4 shadow-sm policy-card" style={{ borderColor: "#a33a2c" }}>
          <div className="d-flex align-items-center mb-3">
            <Truck size={24} className="me-2" style={{ color: "#a33a2c" }} />
            <h3 className="text-title fw-bold mb-0" style={{ fontFamily: "Crimson Pro, serif" }}>
              Vận chuyển
            </h3>
          </div>
          <p className="mb-0" style={{ color: "#3C1E17" }}>Sản phẩm được đóng gói chuyên nghiệp để đảm bảo an toàn. Hợp tác với các đơn vị vận chuyển uy tín và áp dụng chính sách miễn phí vận chuyển cho các đơn hàng đủ điều kiện.</p>
        </div>
      </div>


      {/* Chính sách đổi trả */}
      <div className="col-12">
        <div className="p-4 border rounded-4 shadow-sm policy-card" style={{ borderColor: "#a33a2c" }}>
          <div className="d-flex align-items-center mb-3">
            <RotateCcw size={24} className="me-2" style={{ color: "#a33a2c" }} />
            <h3 className="text-title fw-bold mb-0" style={{ fontFamily: "Crimson Pro, serif" }}>
              Chính sách Đổi trả
            </h3>
          </div>
          <p style={{ color: "#3C1E17" }}><strong>Thời hạn:</strong> 07 ngày kể từ ngày nhận hàng.</p>
          <p style={{ color: "#3C1E17" }}><strong>Điều kiện áp dụng:</strong> Sản phẩm bị lỗi kỹ thuật, giao sai mẫu, hư hỏng do vận chuyển.</p>
          <p className="mb-0" style={{ color: "#3C1E17" }}><strong>Lưu ý:</strong> Không áp dụng với sản phẩm thiết kế riêng theo yêu cầu.</p>
        </div>
      </div>

      {/* Hướng dẫn bảo quản */}
      <div className="col-12">
        <div className="p-4 border rounded-4 shadow-sm policy-card" style={{ borderColor: "#a33a2c" }}>
          <div className="d-flex align-items-center mb-3">
            <BookOpen size={24} className="me-2" style={{ color: "#a33a2c" }} />
            <h3 className="text-title fw-bold mb-0" style={{ fontFamily: "Crimson Pro, serif" }}>
              Hướng dẫn Sử dụng & Bảo quản
            </h3>
          </div>
          <p style={{ color: "#3C1E17" }}><strong>Trưng bày:</strong> Tránh ánh nắng trực tiếp và môi trường ẩm.</p>
          <p style={{ color: "#3C1E17" }}><strong>Vệ sinh:</strong> Dùng chổi mềm hoặc khăn khô, không dùng nước/hóa chất.</p>
          <p style={{ color: "#3C1E17" }}><strong>Di chuyển:</strong> Cầm vào phần khung hoặc đế sản phẩm.</p>
          <p className="mb-0" style={{ color: "#3C1E17" }}><strong>Lưu trữ:</strong> Bọc sản phẩm bằng giấy/vải mềm khi không sử dụng.</p>
        </div>
      </div>
    </div>
  </div>
</section>


    </>
  );
}
