
export default function VendorDetails() {
  return (
<>  
<section className="books-layout1 space-top space-extra-bottom">
  <div className="container">
    <div className="row g-4">
      <div className="col-xl-8 col-lg-7">
        <div className="vendor-item space-bottom">
          <div className="vendor-style1 style2 wow animate__fadeInUp" data-wow-delay="0.20s">
            <div className="vendor-body">
              <div className="vendor-inner">
                <span className="vendor-icon">
                  <img src="assets/img/vendor/vendor-1-1.jpg" alt="vendor image"/>
                </span>
                <div>
                  <h6 className="vendor-title"><a href="vendor-details.html">Book Store</a></h6>
                  <div className="star-rating">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                </div>
              </div>
              <div className="list-style1">
                <ul className="list-unstyled">
                  <li><i className="fas fa-map-marked-alt"></i> Willow Creek, # 32/65 Colorado United State Of America</li>
                  <li><i className="fas fa-envelope"></i><a href="mailto:example@ebokz.com"> example@ebokz.com</a></li>
                  <li><i className="fa-solid fa-headset"></i> <a href="tel:+0061365000299"> +(006) 1365 000 29</a></li>
                </ul>
              </div>
            </div>
            <div className="vendor-image">
              <img src="assets/img/vendor/vendor-img2.jpg" alt="vendor-image"/>
            </div>
          </div>
        </div>

        <h3 className="vendor-details-title title-shep">RR Publisher Product</h3>

        <div className="vs-sort-bar">
          <div className="row gap-4 align-items-center">
            <div className="col-md-auto flex-grow-1">
              <p className="woocommerce-result-count">
                Showing <span>1-9 of 40</span> results
              </p>
            </div>
            <div className="col-md-auto">
              <form className="woocommerce-ordering" method="get">
                <select name="orderby" className="orderby" aria-label="Shop order" defaultValue="recent_product">
                  <option value="recent_product">Short By Latest</option>
                  <option value="popularity">Sort by popularity</option>
                  <option value="rating">Sort by average rating</option>
                  <option value="date">Sort by latest</option>
                  <option value="price">Sort by price: low to high</option>
                  <option value="price-desc">Sort by price: high to low</option>
                </select>
              </form>
            </div>
          </div>
        </div>

        {/* ... phần sản phẩm giữ nguyên nhưng nhớ sửa <img ...>, <input ...> thành self-closing */}

      </div>

      <div className="col-xl-4 col-lg-5">
        <aside className="sidebar-area">
          <div className="widget widget_search wow animate__fadeInUp" data-wow-delay="0.30s">
            <h3 className="wp-block-heading widget_title title-shep">Search</h3>
            <form className="search-form">
              <input type="text" placeholder="Search Here..." />
              <button className="vs-btn" type="submit">Search</button>
            </form>
          </div>

          {/* ... các widget khác cũng sửa <input>, <textarea> thành self-closing nếu cần */}
          <div className="widget widget-update wow animate__fadeInUp" data-wow-delay="0.60s">
            <h3 className="wp-block-heading widget_title title-shep">Contact Vendor</h3>
            <form className="search-form">
              <input type="text" placeholder="Your Name" />
              <input type="text" placeholder="Your Email" />
              <textarea id="message" name="message" rows="4" cols="50" placeholder="Type Your Message..."></textarea>
              <button className="vs-btn" type="submit">Submit</button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  </div>
</section>


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
  </section></>
      );
}