import React, { useState, useContext } from "react";
import { FaChevronDown } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import Breadcrumb from "../components/Breadcrumb";


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
<Breadcrumb/>
      {/* Contact Section */}
      <section className="contact-layout2 space">
        <div className="container">
          <div className="row g-4 space-bottom">
            {/* Thông tin liên hệ */}
            <div className="col-xl-4 col-lg-6 col-md-6 d-flex" >
              <div className="contact-media wow animate__fadeInUp flex-grow-1" data-wow-delay="0.25s" >
                <div className="media-style1 h-100" >
                  <div className="media-info">
                    <h3 className="media-title">Địa chỉ cửa hàng</h3>
                    <div className="media-icon">
                      <img src="assets/img/icons/location.svg" alt="icon" />
                    </div>
                  </div>
                  <p className="media-text">Số 28, Ngõ 8, Xã Bình Minh, Hà Nội</p>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-6 col-md-6 d-flex">
              <div className="contact-media wow animate__fadeInUp flex-grow-1" data-wow-delay="0.45s">
                <div className="media-style1 h-100">
                  <div className="media-info">
                    <h3 className="media-title">Số điện thoại</h3>
                    <div className="media-icon">
                      <img src="assets/img/icons/call.svg" alt="icon" />
                    </div>
                  </div>
                  <p className="media-text">+84 912 345 678</p>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-6 col-md-6 d-flex">
              <div className="contact-media wow animate__fadeInUp flex-grow-1" data-wow-delay="0.65s">
                <div className="media-style1 h-100">
                  <div className="media-info">
                    <h3 className="media-title">Email liên hệ</h3>
                    <div className="media-icon">
                      <img src="assets/img/icons/mail.svg" alt="icon" />
                    </div>
                  </div>
                  <p className="media-text">Truchoavien@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form liên hệ hoặc yêu cầu đăng nhập */}
          <div className="row">
            <div className="col-12 text-center">
              {user ? (
                <form
                  className="form-style1 wow animate__fadeInUp"
                  data-wow-delay="0.35s"
                  onSubmit={handleSubmit}
                >
                  <div className="title-area animation-style1 title-anime">
                    <h2 className="sec-title text-title title-anime__title">
                      Liên hệ với Trúc Họa Viên
                    </h2>
                    <p style={{color:"#1b1b1b"}}>Xin chào {user.username}! Hãy để lại yêu cầu của bạn nhé</p>
                  </div>

                  <div className="row gx-20">
                   

                    {/* Nội dung */}
                    <div className="col-md-12 form-group">
                      <textarea
  className="form-control"
  placeholder="Nội dung tin nhắn..."
  required
  rows="5" // 👈 thêm dòng này — mặc định chỉ là 2
></textarea>

                    </div>

                    <div className="col-md-12 form-group">
                      <button className="vs-btn justify-content-center" type="submit">
                        Gửi liên hệ
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="login-required wow animate__fadeInUp" data-wow-delay="0.35s">
                  <h3 className="text-title">Vui lòng đăng nhập để gửi liên hệ 🌸</h3>
                  <a href="/login" className="vs-btn mt-3">
                    Đăng nhập ngay
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <div className="map-layout1" style={{marginBottom: "100px"}}>
        <div
          className="ratio ratio-21x9 wow animate__fadeInUp"
          data-wow-delay="0.35s"
          style={{ height: "742px" }}
        >
          <iframe
            src="https://www.google.com/maps?q=28+Ngo+8,+Xa+Binh+Minh,+Ha+Noi,+Vietnam&output=embed"
            width="800"
            height="720"
            style={{ border: "0" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="map"
          ></iframe>
        </div>
      </div>
    </>
  );
}
