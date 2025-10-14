
export default function error() {
  return (
    <>
  <div className="space error-style1">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="error-img wow animate__fadeInUp" data-wow-delay="0.35s">
            <img src="assets/img/404/404.png" alt="404"/>
          </div>
        </div>
        <div className="col-lg-6 ">
          <div className="text-center  wow animate__fadeInUp" data-wow-delay="0.55s">
            <div className="title-area animation-style1 title-anime">
              <h2 className="sec-title text-title title-anime__title">Oops! That Page Can't Be Found.</h2>
            </div>
            <p className="error-text wow animate__fadeInUp" data-wow-delay="0.75s">Unfortunately, something went wrong and this page does not exist. Try using the search or return to the previous page.</p>
            <a href="index.html" className="vs-btn wow animate__bounceInUp" data-wow-delay="0.85s">Go Back to home</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section className="cta-layout1 z-index-common blog-title">
    <div className="container">
      <div className="row gx-60 align-items-center">
        <div className="col-lg-3">
          <div className="cta-logo">
            <a href="index.html"><img src="assets/img/logo.svg" alt="Ebukz" className="logo"/></a>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="row justify-content-xl-between justify-content-center align-items-center">
            <div className="col-xl-4 col-lg-5">
              <div className="newsletter-inner">
                <span className="newsletter-icon"><img src="assets/img/icons/mail-2.svg" alt="icon"/></span>
                <div className="newsletter-content">
                  <h4 className="newsletter_title">Get In Touch</h4>
                  <p className="newsletter-text">Subscribe for more Update</p>
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-lg-7">
              <div className="newsletter-form">
                <div className="search-btn">
                  <input className="form-control" type="email" placeholder="Your Email Address"/>
                  <button type="submit" className="vs-btn"><i className="fa-solid fa-paper-plane"></i> Subscribe</button>
                </div>
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