
const HeroSection = () => {
  return (
    <section
      className="hero-layout1"
      data-wow-delay="0.25s"
      aria-hidden="true"
    >
      <div
        className="hero-item"
        style={{ backgroundImage: "url(/assets/img/bg/hero-bg1.jpg)" }}
      >
        <div className="container position-relative z-index">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 position-relative">
              <div className="hero-content">
                <h1
                  className="hero-title wow animate__fadeInUp"
                  data-wow-delay="0.50s"
                >
                  Nơi ánh sáng và{" "}
                  <span className="title-highlight">Nghệ thuật</span> trong từng tấm giấy.
                </h1>
                <p
                  className="hero-text wow animate__fadeInUp"
                  data-wow-delay="0.75s"
                >
                  Đánh thức Cảm xúc qua nghệ thuật Trúc Chỉ.
                </p>
                <a
                  className="vs-btn wow animate__flipInX"
                  data-wow-delay="0.95s"
                  href="/shop.html"
                >
                  Xem thêm
                </a>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="hero-img">
                <img
                  src="/assets/img/hero/hero-img-1-1.png"
                  alt="hero image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <span
        className="shape-mockup element1 z-index1 d-xxl-block d-none"
        data-wow-delay="0.80s"
        style={{ right: 0, top: "-10px" }}
      >
        <img src="/assets/img/shapes/hero-shape2.svg" alt="Hero shape" />
      </span>
      <span
        className="shape-mockup element2 z-index1 d-xxl-block d-none"
        data-wow-delay="0.80s"
        style={{ left: 0, bottom: "-10px" }}
      >
        <img src="/assets/img/shapes/hero-shape3.svg" alt="Hero shape" />
      </span>
      <span
        className="shape-mockup z-index1 wow animate__fadeInLeft d-xxl-block d-none"
        data-wow-delay="0.80s"
        style={{ left: 0, top: 0 }}
      >
        <img src="/assets/img/shapes/hero-shape1.svg" alt="Hero shape" />
      </span>
    </section>
  );
};

export default HeroSection;
