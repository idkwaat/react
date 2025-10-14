import { motion } from "framer-motion";
import { Leaf, Target, HeartHandshake } from "lucide-react";
import { FaLeaf, FaScroll, FaPaintBrush, FaStar } from "react-icons/fa";

export default function About() {
  return (
    <>
  <section class="about-layout1 space-top">
    <div class="container space-bottom">
      <div class="row g-5 justify-content-center align-items-center">
        <div class="col-lg-4">
          <div class="about-img wow animate__fadeInUp" data-wow-delay="0.45s">
            <img src="assets/img/about/about-img-1-1.jpg" alt="about image"/>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="about-content">
            <div class="wow animate__fadeInUp" data-wow-delay="0.35s">
              <div class="title-area animation-style1 title-anime">
                <h2 class="sec-title text-title title-anime__title">Một giá trị văn hóa Việt mới</h2>
              </div>
              <p class="about-text wow animate__fadeInUp" data-wow-delay="0.30s">
                Mang lại cho giấy thêm khả năng, “thoát” khỏi thân phận làm “nền” để trở thành một tác phẩm tự thân và độc lập.
              </p>
            </div>
<div class="list-style1 wow animate__fadeInUp" data-wow-delay="0.50s">
  <ul class="list-unstyled">
    <li><i class="fa-solid fa-leaf"></i> Khơi nguồn tinh hoa từ trang giấy Việt.</li>
    <li><i class="fa-solid fa-scroll"></i> Gìn giữ hồn xưa trong hình hài mới.</li>
    <li><i class="fa-solid fa-paint-brush"></i> Khi văn hóa chạm đến từng sợi giấy.</li>
    <li><i class="fa-solid fa-star"></i> Từ truyền thống – viết tiếp tương lai.</li>
  </ul>
</div>

            <div class="about-content wow animate__fadeInUp" data-wow-delay="0.75s">
              <div class="about-box">
                <div class="about-img wow animate__fadeInUp" data-wow-delay="0.55s">
                  <img src="assets/img/about/about-img-1-2.jpg" alt="about image"/>
                </div>
                <div class="about-inner mb-0 wow animate__fadeInUp" data-wow-delay="0.95s">
                  <p class="about-text mb-20">
                    Trúc Chỉ là tên gọi của loại Nghệ thuật - giấy, Giấy - nghệ thuật mới của Việt Nam dựa trên cơ sở nghề giấy truyền thống; với hàm ý Tre trúc là biểu tượng của Văn hóa và tinh thần Việt.
Trúc Chỉ là kết quả của công trình khoa học do Họa sĩ Phan Hải Bằng cùng các cộng sự nghiên cứu và phát triển từ năm 2000 đến nay.
                  </p>
                  <a class="vs-btn" href="about.html">Explore More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

      {/* --- VIDEO SECTION --- */}
      <section className="position-relative text-center text-white">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-100"
          style={{
            maxHeight: "600px",
            objectFit: "cover",
            filter: "brightness(60%)",
          }}
        >
          <source src="/assets/video/aboutus.mp4" type="video/mp4" />
        </video>

        <div
          className="position-absolute top-50 start-50 translate-middle"
          style={{ maxWidth: "700px" }}
        >
          <motion.h2
            className="fw-bold mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Về Chúng Tôi
          </motion.h2>
          <motion.p
            className="fs-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Chúng tôi khơi dậy tinh hoa văn hóa Việt qua từng tấm giấy — nơi
            nghệ thuật và truyền thống giao hòa.
          </motion.p>
          <motion.p
            className="fs-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Mỗi sợi giấy là một câu chuyện, được kể lại bằng ánh sáng, màu sắc
            và cảm xúc.
          </motion.p>
        </div>
      </section>

      {/* --- TẦM NHÌN --- */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #F8FFF2, #E2F5D3, #C7E5A6)",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <motion.div
              className="col-md-6 mb-4 mb-md-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/assets/img/gia-tri-cot-loi.jpg"
                alt="Tầm nhìn"
                className="img-fluid rounded-4 shadow-lg"
              />
            </motion.div>

            <motion.div
              className="col-md-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="fw-bold text-success mb-3 d-flex align-items-center">
                <Target size={32} className="me-2 text-success" /> Tầm nhìn
              </h2>
              <p className="fs-5 text-dark lh-lg">
                Trúc Chỉ hướng đến trở thành cầu nối giữa nghệ thuật truyền thống
                Việt Nam và hơi thở hiện đại — lan tỏa tinh thần sáng tạo và giá
                trị văn hóa bền vững đến cộng đồng.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SỨ MỆNH --- */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #FFF9E6, #FAE7A5, #F6D860)",
        }}
      >
        <div className="container">
          <div className="row align-items-center flex-md-row-reverse">
            <motion.div
              className="col-md-6 mb-4 mb-md-0"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://trucchiart.vn/wp-content/uploads/2023/04/su-menh.jpg"
                alt="Sứ mệnh"
                className="img-fluid rounded-4 shadow-lg"
              />
            </motion.div>

            <motion.div
              className="col-md-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="fw-bold text-success mb-3 d-flex align-items-center">
                <Leaf size={32} className="me-2 text-success" /> Sứ mệnh
              </h2>
              <p className="fs-5 fst-italic text-dark lh-lg">
                “Mang lại cho giấy thêm khả năng — thoát khỏi thân phận làm ‘nền’,
                để trở thành một tác phẩm tự thân, độc lập và mang dấu ấn Việt.”
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- GIÁ TRỊ CỐT LÕI --- */}
      <section
        className="py-5 text-center"
        style={{
          background: "linear-gradient(135deg, #E3F2FD, #C8E6FA, #A5D6F9)",
        }}
      >
        <div className="container">
          <motion.h2
            className="fw-bold text-success mb-5"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Giá trị cốt lõi
          </motion.h2>

          <div className="row g-4">
            {[{
              img: "https://trucchiart.vn/wp-content/uploads/2023/05/Tham-my-Giao-duc-Xa-hoi.png",
              title: "Thẩm mỹ – Giáo dục – Xã hội"
            }, {
              img: "https://trucchiart.vn/wp-content/uploads/2023/05/Sang-tao-Cong-hien-Chia-se.png",
              title: "Sáng tạo – Cống hiến – Chia sẻ"
            }].map((item, i) => (
              <motion.div
                key={i}
                className="col-md-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * i }}
              >
                <div
                  className="card border-0 shadow-sm h-100 p-4"
                  style={{
                    borderRadius: "20px",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "translateY(-6px)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="img-fluid rounded-4 mb-3"
                  />
                  <h4 className="fw-bold text-dark mt-2">{item.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 text-muted">
            <HeartHandshake className="text-success mb-2" size={40} />
            <p className="fw-semibold">
              Lan tỏa giá trị – Kết nối cộng đồng – Nuôi dưỡng sáng tạo.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
