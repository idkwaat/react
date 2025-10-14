// src/components/TestimonialsSection.js
import React, { useEffect } from "react";
import WOW from "wowjs";

export default function TestimonialsSection() {
  useEffect(() => {
    const wow = new WOW.WOW({ live: false });
    wow.init();

    document.querySelectorAll("[data-bg-src]").forEach((el) => {
      const bg = el.getAttribute("data-bg-src");
      if (bg) el.style.backgroundImage = `url(${bg})`;
    });
  }, []);

  // 👉 sau này bạn có thể map từ API testimonials
  const testimonials = [
    {
      id: 1,
      name: "Rodja Hartmann",
      role: "Designer, Vecurosoft",
      rating: 4,
      image: "assets/img/testimonial/testi-1-1.jpg",
      quoteIcon: "assets/img/icons/quote-icon.svg",
      highlightIcon: "assets/img/testimonial/testi-icon1.png",
      content:
        "When you work with Los Angeles House Cleaners Refal Agen cleaning room breathe easy because your home will soon be clean again.",
    },
    {
      id: 2,
      name: "Alaxander Pall",
      role: "Designer, Vecurosoft",
      rating: 5,
      image: "assets/img/testimonial/testi-1-1.jpg",
      quoteIcon: "assets/img/icons/quote-icon.svg",
      highlightIcon: "assets/img/testimonial/testi-icon1.png",
      content:
        "When you work with Los Angeles House Cleaners Refal Agen cleaning room breathe easy because your home will soon be clean again.",
    },
  ];

  return (
    <section className="vs-testi__layout1 space">
      <div className="container">
        <div className="row g-5">
          {/* Banner trái */}
          <div className="col-xl-5">
            <div className="banner-img">
              <img src="assets/img/others/banner1.jpg" alt="banner" />
              <div className="banner-content">
                <span className="sub-title">Best offer</span>
                <h2 className="banner-title">Save Up to $15</h2>
                <a className="vs-btn" href="/shop">
                  Shop Now
                </a>
              </div>
            </div>
          </div>

          {/* Testimonials phải */}
          <div className="col-xl-7">
            <div className="vs-testi__inner">
              <div
                className="title-area text-left wow animate__fadeInUp title-anime animation-style5"
                data-wow-delay="0.25s"
              >
                <span className="sec-subtitle left-shape justify-content-center title-anime__title">
                  Testimonials
                </span>
                <h2 className="sec-title title-anime__title">
                  What Our Clients Say
                </h2>
                <p className="sec-text">
                  Real feedback from our customers who experienced our handmade
                  art and service.
                </p>
              </div>

              <div
                className="vs-testi__items wow animate__fadeInUp"
                data-wow-delay="0.35s"
              >
                <div className="vs-carousel testi-slider">
                  {testimonials.map((t) => (
                    <div key={t.id} className="vs-testi__style1">
                      <span className="vs-testi__icon">
                        <img src={t.quoteIcon} alt="quote" />
                      </span>
                      <div className="vs-testi__top">
                        <div className="vs-testi__image">
                          <img src={t.image} alt={t.name} />
                        </div>
                        <div className="vs-testi__author">
                          <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <i
                                key={s}
                                className={`fa-star ${
                                  t.rating >= s
                                    ? "fa-solid"
                                    : "fa-regular"
                                }`}
                              ></i>
                            ))}
                          </div>
                          <h3 className="vs-testi__title">{t.name}</h3>
                          <span className="vs-testi__desi">{t.role}</span>
                        </div>
                      </div>
                      <div className="vs-testi__content">
                        <p className="vs-testi__text">
                          <span className="text-highlight">
                            <img
                              className="icon"
                              src={t.highlightIcon}
                              alt="highlight"
                            />{" "}
                            {t.content}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nút điều hướng carousel (chưa cần JS riêng nếu không xài slick.js) */}
              <div
                className="custom-arraw wow animate__fadeInUp"
                data-wow-delay="0.45s"
              >
                <div className="icon-arraw slick-prev">
                  <button className="icon-btn">
                    <i className="fa-regular fa-arrow-right"></i>
                  </button>
                </div>
                <div className="icon-arraw slick-next">
                  <button className="icon-btn">
                    <i className="fa-regular fa-arrow-left"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
