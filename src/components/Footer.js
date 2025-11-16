export default function Footer() {
  return (
    <footer
      className="footer-layout1 style2 z-index-common"
      style={{ backgroundColor: "#ede5d8" }}
    >
      {/* CTA AREA */}
      <div className="container">
        <div className="cta-layout1 style2 z-index-common blog-title">
          <div className="row gx-60 align-items-center">
            <div className="col-lg-3">
              <div className="cta-logo" >
                <a href="/">
                  <img src="/assets/img/logo-04.svg" alt="Trúc Họa Viên" className="logo" />
                </a>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="row justify-content-xl-between justify-content-center align-items-center">
                <div className="col-lg-5">
                  <div className="newsletter-inner">
                    <span className="newsletter-icon">
                      <img src="/assets/img/icons/mail-2.svg" alt="icon" />
                    </span>
                    <div className="newsletter-content">
                      <h4 className="newsletter_title">Liên hệ với chúng tôi</h4>
                      <p className="newsletter-text">Đăng ký để nhận thông tin mới nhất</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="newsletter-form">
                    <div className="search-btn">
                      <input
                        className="form-control"
                        type="email"
                        placeholder="Nhập email của bạn"
                      />
                    <button
  type="submit"
  className="vs-btn"
  style={{
    backgroundColor: "#9e3a2f",
    color: "#FAF5F0",
    width: "100%",        // ✅ full chiều ngang
    display: "block",      // ✅ tránh khoảng trắng inline
    padding: "14px 26px",  // ✅ co lại cho cân
    border: "none",        // ✅ tránh border mặc định
  }}
>
  <i className="fa-solid fa-paper-plane"></i> Đăng ký
</button>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER TOP */}
      <div className="footer-top">
        <div className="container">
          <div className="row g-5 justify-content-between">
            {/* Về chúng tôi */}
            <div className="col-md-6 col-lg-4">
              <div className="widget footer-widget">
                <h3 className="widget_title" style={{ color: "#8B2F2F" }}>
                  Về chúng tôi
                  <span className="title-shape">
                    <img
                      src="/assets/img/shapes/footer-line-shape.svg"
                      alt="Shape"
                    />
                  </span>
                </h3>
                <p style={{ color: "#3C1E17" }}>
                  <strong>Trúc Họa Viên LLC</strong> — tôn vinh nghệ thuật thủ công Việt qua từng sản phẩm tinh xảo, giàu giá trị văn hoá.
                </p>
                <ul className="social-links">
                  <li>
  <a
    href="https://www.facebook.com/profile.php?id=61573447291270"
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className="fab fa-facebook-f"></i>
  </a>
</li>

<li>
  <a
    href="https://www.instagram.com/truchoavien_3/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className="fab fa-instagram"></i>
  </a>
</li>

<li>
  <a
    href="https://www.tiktok.com/@truchoavien103"
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className="fa-brands fa-tiktok"></i>
  </a>
</li>


                </ul>
              </div>
            </div>

            {/* Liên kết nhanh */}
            <div className="col-md-6 col-lg-3">
              <div className="widget widget_nav_menu footer-widget">
                <h3 className="widget_title" style={{ color: "#8B2F2F" }}>
                  Liên kết nhanh
                  <span className="title-shape">
                    <img
                      src="/assets/img/shapes/footer-line-shape.svg"
                      alt="Shape"
                    />
                  </span>
                </h3>
                <ul className="menu">
                  <li>
                    <a href="/about" style={{ color: "#3C1E17" }}>
                      <i
                        className="fa-solid fa-leaf me-2"
                        style={{ color: "#A54034" }}
                      ></i>{" "}
                      Giới thiệu
                    </a>
                  </li>
                  <li>
                    <a href="/shop" style={{ color: "#3C1E17" }}>
                      <i
                        className="fa-solid fa-leaf me-2"
                        style={{ color: "#A54034" }}
                      ></i>{" "}
                      Sản phẩm
                    </a>
                  </li>
                  <li>
                    <a href="/contact" style={{ color: "#3C1E17" }}>
                      <i
                        className="fa-solid fa-leaf me-2"
                        style={{ color: "#A54034" }}
                      ></i>{" "}
                      Liên hệ
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Thông tin liên hệ + Bản đồ */}
            <div className="col-md-6 col-lg-4">
              <div className="widget footer-widget">
                <h3 className="widget_title" style={{ color: "#8B2F2F" }}>
                  Thông tin liên hệ
                  <span className="title-shape">
                    <img
                      src="/assets/img/shapes/footer-line-shape.svg"
                      alt="Shape"
                    />
                  </span>
                </h3>
                <ul className="list-unstyled list-style1 mb-3">
                  <li>
                    <i
                      className="fas fa-map-marked-alt"
                      style={{ marginRight: "5px", color: "#8B2F2F" }}
                    ></i>
                    <span style={{ color: "#3C1E17" }}>
                      Ngõ 8, Xã Bình Minh, Hà Nội
                    </span>
                  </li>
                  <li>
                    <i
                      className="fas fa-user"
                      style={{ marginRight: "5px", color: "#8B2F2F" }}
                    ></i>
                    <span style={{ color: "#3C1E17" }}>
                      Người đại diện: <strong>Ms. Nguyễn Thị Thảo</strong>
                    </span>
                  </li>
                  <li>
                    <i
                      className="fas fa-phone"
                      style={{ marginRight: "5px", color: "#8B2F2F" }}
                    ></i>
                    <a href="tel:+84912345678" style={{ color: "#3C1E17" }}>
                      0976775203
                    </a>
                  </li>
                  <li>
                    <i
                      className="fas fa-envelope"
                      style={{ marginRight: "5px", color: "#8B2F2F" }}
                    ></i>
                    <a
                      href="mailto:Truchoavien@gmail.com"
                      style={{ color: "#3C1E17" }}
                    >
                      Truchoavien@gmail.com
                    </a>
                  </li>
                </ul>

                <h4
                  style={{
                    color: "#8B2F2F",
                    fontSize: "18px",
                    marginBottom: "10px",
                  }}
                >
                  Bản đồ
                </h4>
                <div
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
<iframe
  title="Bản đồ Trúc Họa Viên"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0045057200637!2d105.91210857486194!3d21.03574478748492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abddf92e9cb5%3A0x6d9a0630e6e6e808!2zU-G7kSAyOCBOZ-G7jSA4LCBCw6xuaCBNaW5oLCBIw6AgTuG7mWkg!5e0!3m2!1svi!2s!4v1739599180000!5m2!1svi!2s"
  width="100%"
  height="250"
  style={{ border: "2px solid #a33a2c", borderRadius: "10px" }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="copyright-wrap">
        <div className="container">
          <p
            className="copyright-text text-center"
            style={{ color: "#3C1E17", margin: 0 }}
          >
            © {new Date().getFullYear()} <strong>Trúc Họa Viên LLC</strong> — All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
