import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import WOW from "wowjs";

import HeroSection from "../components/HeroSection";
import TrendingProducts from "../components/TrendingProducts";
import ProductOfMonthSection from "../components/ProductOfMonthSection";

function Home() {
  const location = useLocation();

  useEffect(() => {
  if (location.pathname === "/") {
    const wow = new WOW.WOW({ live: false });
    wow.init();

    // 🟢 Reinit background images (vì React không chạy lại JS gốc)
    setTimeout(() => {
      document.querySelectorAll("[data-bg-src]").forEach((el) => {
        const bgSrc = el.getAttribute("data-bg-src");
        if (bgSrc && !el.style.backgroundImage) {
          el.style.backgroundImage = `url(${bgSrc})`;
        }
      });
      console.log("✅ Backgrounds reloaded from data-bg-src");
    }, 300);
  }
}, [location.pathname]);

  return (
    <>
    <HeroSection/>
    <TrendingProducts/>
 
  <div className="offer-layout1 space-bottom">
    <div className="container">
      <div className="row g-4">
        <div className="col-xl-6 col-lg-6">
          <div className="offer-style1 wow animate__fadeInLeft" data-wow-delay="0.30s" data-bg-src="assets/img/bg/offer-bg1.jpg">
            <div className="offer-img">
              <img src="assets/img/offer/offer-img1.png" alt="offer image"/>
            </div>
            <div className="offer-content">
              <div className="star-rating">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <h2 className="offer-title">E Emeher Mme</h2>
              <p className="offer-price">Only From <span>$85.00</span></p>
              <a className="vs-btn" href="shop.html">Shop Now</a>
            </div>
            <span className="shape-mockup element1 z-index1  d-xxl-block d-none" data-wow-delay="0.80s" style={{right: "0px", bottom: "-5px" }}><img src="assets/img/shapes/offer-shape1.png" alt="offer shape"/></span>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6">
          <div className="offer-style1 white-style wow animate__fadeInRight" data-wow-delay="0.30s" data-bg-src="assets/img/bg/offer-bg2.jpg">
            <div className="offer-img">
              <img src="assets/img/offer/offer-img1.png" alt="offer image"/>
            </div>
            <div className="offer-content">
              <div className="star-rating">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <h2 className="offer-title">Viving Moneme</h2>
              <p className="offer-price">Only From <span>$85.00</span></p>
              <a className="vs-btn" href="shop.html">Shop Now</a>
            </div>
            <span className="shape-mockup element1 z-index1  d-xxl-block d-none" data-wow-delay="0.80s" style={{right: "0px", bottom: "-5px" }}><img src="assets/img/shapes/offer-shape2.png" alt="offer shape"/></span>
          </div>
        </div>
      </div>
    </div>
  </div>



  <section className="selling-layout1 space" data-bg-src="assets/img/bg/selling-bg.jpg">
    <div className="container">
      <div className="row g-4 gx-40 align-items-center">
        <div className="col-xl-5">
          <div className="selling-content">
            <h2 className="selling-title wow animate__fadeInUp" data-wow-delay="0.20s">Vườn Trúc Chỉ</h2>
            <h4 className="author-name wow animate__fadeInUp" data-wow-delay="0.30s">Cùng đắm chìm vào không gian nghệ thuật của Trúc Chỉ Graden</h4>
          
            <p className="selling-text wow animate__fadeInUp" data-wow-delay="0.50s">Giữa lòng thành phố, Vườn Trúc Chỉ là nơi nghệ thuật và thiên nhiên giao hòa. Từng tấm Trúc Chỉ được sinh ra từ ánh sáng, nước và bàn tay con người – kể lại câu chuyện về sự tĩnh lặng và sáng tạo.</p>

          </div>
        </div>
        <div className="col-xl-4">
          <div className="selling-img-tag wow animate__fadeInUp" data-wow-delay="0.30s">
            <div className="wow animate__fadeInDownBig" data-wow-delay="0.30s">
            </div>
            <img src="assets/img/selling/selling-img.jpg" className="w-100" alt="selling images"/>
          </div>
        </div>
        <div className="col-xl-3">
          <div className="selling-books">
            <div className="book-item wow animate__fadeInDown" data-wow-delay="0.30s">
              <img src="assets/img/selling/book-img1.jpg" alt="book image"/>
            </div>
            <div className="book-item wow animate__fadeInDown" data-wow-delay="0.40s">
              <img src="assets/img/selling/book-img2.jpg" alt="book image"/>
            </div>
            <div className="book-item wow animate__fadeInUp" data-wow-delay="0.50s">
              <img src="assets/img/selling/book-img3.jpg" alt="book image"/>
            </div>
            <div className="book-item wow animate__fadeInUp" data-wow-delay="0.60s">
              <img src="assets/img/selling/book-img4.jpg" alt="book image"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

<ProductOfMonthSection/>


<section className="vs-testi__layout1 space">
  <div className="container">
    <div className="row g-5">
      {/* Banner bên trái */}
      <div className="col-xl-5">
        <div className="banner-img">
          <img src="assets/img/others/banner1.jpg" alt="Trúc Chỉ banner" />
          <div className="banner-content">
            <span className="sub-title">Ưu đãi đặc biệt</span>
            <h2 className="banner-title">Giảm đến 15%</h2>
            <a className="vs-btn" href="/shop">Mua Ngay</a>
          </div>
        </div>
      </div>

      {/* Testimonials bên phải */}
      <div className="col-xl-7">
        <div className="vs-testi__inner">
          <div
            className="title-area text-left wow animate__fadeInUp title-anime animation-style5"
            data-wow-delay="0.25s"
          >
            <span className="sec-subtitle left-shape justify-content-center title-anime__title">
              Phản Hồi Khách Hàng
            </span>
            <h2 className="sec-title title-anime__title">
              Cảm nhận từ những người yêu Trúc Chỉ
            </h2>
            <p className="sec-text">
              Chúng tôi tự hào khi mang đến những tác phẩm Trúc Chỉ mang đậm giá trị văn hóa và tinh thần Việt Nam, được khách hàng tin tưởng và yêu mến.
            </p>
          </div>

          <div
            className="vs-testi__items wow animate__fadeInUp"
            data-wow-delay="0.35s"
          >
            <div className="vs-carousel testi-slider" data-autoplay="true" data-fade="true">
                            {/* Feedback 2 */}
              <div className="vs-testi__style1">
                <span className="vs-testi__icon">
                  <img src="assets/img/icons/quote-icon.svg" alt="icon" />
                </span>
                <div className="vs-testi__top">
                  <div className="vs-testi__image">
                    <img className="img1" src="assets/img/testimonial/testi-1-1.jpg" alt="Khách hàng" />
                  </div>
                  <div className="vs-testi__author">
                    <div className="star-rating">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </div>
                    <h3 className="vs-testi__title">Trần Bảo Ngọc</h3>
                    <span className="vs-testi__desi">Chủ quán cà phê Ánh Giấy</span>
                  </div>
                </div>
                <div className="vs-testi__content">
                  <p className="vs-testi__text">
                    <span className="text-highlight">
                      <img
                        className="icon"
                        src="assets/img/testimonial/testi-icon1.png"
                        alt="icon"
                      />{" "}
                      Nghệ thuật và tinh tế!
                    </span>
                    “Không gian quán của tôi trở nên ấm áp và độc đáo hơn bao giờ hết khi có những tấm Trúc Chỉ treo tường. Mỗi khi ánh sáng chiếu qua, cảm giác thật sự yên bình.”
                  </p>
                </div>
              </div>
              {/* Feedback 1 */}
              <div className="vs-testi__style1">
                <span className="vs-testi__icon">
                  <img src="assets/img/icons/quote-icon.svg" alt="icon" />
                </span>
                <div className="vs-testi__top">
                  <div className="vs-testi__image">
                    <img className="img1" src="assets/img/testimonial/testi-1-2.jpg" alt="Khách hàng" />
                  </div>
                  <div className="vs-testi__author">
                    <div className="star-rating">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                    </div>
                    <h3 className="vs-testi__title">Nguyễn Minh Anh</h3>
                    <span className="vs-testi__desi">Kiến trúc sư nội thất</span>
                  </div>
                </div>
                <div className="vs-testi__content">
                  <p className="vs-testi__text">
                    <span className="text-highlight">
                      <img
                        className="icon"
                        src="assets/img/testimonial/testi-icon1.png"
                        alt="icon"
                      />{" "}
                      Trúc Chỉ mang đến ánh sáng đầy cảm xúc!
                    </span>
                    “Tôi đã sử dụng tranh Trúc Chỉ cho nhiều công trình của mình — không chỉ là trang trí, mà còn là câu chuyện văn hóa được kể bằng ánh sáng. Rất ấn tượng!”
                  </p>
                </div>
              </div>


            </div>
          </div>

          {/* Nút điều hướng */}
          <div className="custom-arraw wow animate__fadeInUp" data-wow-delay="0.45s">
            <div className="icon-arraw slick-prev" data-slick-prev=".testi-slider">
              <button className="icon-btn">
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
            <div className="icon-arraw slick-next" data-slick-next=".testi-slider">
              <button className="icon-btn">
                <i className="fa-solid fa-arrow-left"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  </>
  );
}

export default Home;
