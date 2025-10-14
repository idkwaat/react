export default function Footer() {
  return (
    <footer className="footer-layout1 style2 z-index-common">
      {/* CTA AREA */}
      <div className="container">
        <div className="cta-layout1 style2 z-index-common blog-title">
          <div className="row gx-60 align-items-center">
            <div className="col-lg-3">
              <div className="cta-logo">
                <a href="/">
                  <img src="/assets/img/logo.svg" alt="Trúc Họa Viên" className="logo" />
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
                      <button type="submit" className="vs-btn">
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
            {/* Giới thiệu */}
            <div className="col-md-6 col-lg-4">
              <div className="widget footer-widget">
                <h3 className="widget_title">
                  Về chúng tôi
                  <span className="title-shape">
                    <img src="/assets/img/shapes/footer-line-shape.svg" alt="Shape" />
                  </span>
                </h3>
                <p>
                  <strong>Trúc Họa Viên LLC</strong> — nơi lưu giữ tinh hoa nghệ thuật
                  thủ công Việt Nam. Chúng tôi tự hào mang đến những sản phẩm
                  tinh tế, chan chứa hồn Việt.
                </p>
                <ul className="social-links">
                  <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                  <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                  <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
                </ul>
              </div>
            </div>

            {/* Liên kết nhanh */}
            <div className="col-md-6 col-lg-3">
              <div className="widget widget_nav_menu footer-widget">
                <h3 className="widget_title">
                  Liên kết nhanh
                  <span className="title-shape">
                    <img src="/assets/img/shapes/footer-line-shape.svg" alt="Shape" />
                  </span>
                </h3>
                <ul className="menu">
                  <li><a href="/about"><i className="fa-solid fa-leaf me-2 text-success"></i> Giới thiệu</a></li>
<li><a href="/products"><i className="fa-solid fa-leaf me-2 text-success"></i> Sản phẩm</a></li>
<li><a href="/contact"><i className="fa-solid fa-leaf me-2 text-success"></i> Liên hệ</a></li>

                </ul>
              </div>
            </div>

            {/* Thông tin liên hệ */}
            <div className="col-md-6 col-lg-4">
              <div className="widget footer-widget">
                <h3 className="widget_title">
                  Thông tin liên hệ
                  <span className="title-shape">
                    <img src="/assets/img/shapes/footer-line-shape.svg" alt="Shape" />
                  </span>
                </h3>
                <ul className="list-unstyled list-style1">
                  <li>
                    <i className="fas fa-map-marked-alt" style={{marginRight: "5px"}}></i>
                    <span>
                      Số 28 ngõ 8, Xóm Lục, Xã Bình Minh, Thành phố Hà Nội
                    </span>
                  </li>
                  <li>
                    <i className="fas fa-user" style={{marginRight: "5px"}}></i>
                    <span>Người đại diện: <strong>Ms. Nguyễn Thị Thảo</strong></span>
                  </li>
                  <li>
                    <i className="fas fa-envelope" style={{marginRight: "5px"}}></i>
                    <a href="mailto:Truchoavien@gmail.com">Truchoavien@gmail.com</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="copyright-wrap">
        <div className="container">
          <p className="copyright-text text-center">
            © {new Date().getFullYear()} <strong>Trúc Họa Viên LLC</strong> — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
