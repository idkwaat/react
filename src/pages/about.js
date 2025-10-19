import { motion } from "framer-motion";
import { Target, Leaf, HeartHandshake, Users } from "lucide-react";
import { Breadcrumb } from "react-bootstrap";
import {
  FaFlag,
  FaRecycle,
  FaLightbulb,
  FaHandsHelping,
} from "react-icons/fa";

export default function About() {
  const team = [
    {
      name: "Ngô Hoàng An",
      role: "CEO & Founder",
      desc: "Định hướng chiến lược, xây dựng thương hiệu và phát triển bền vững cho Trúc Họa Viên.",
      img: "https://images.unsplash.com/photo-1603415526960-f7e0328ad451?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Nguyễn Thị Thảo",
      role: "CPO",
      desc: "Thiết kế sản phẩm nghệ thuật, đảm bảo giá trị độc bản và tinh hoa sáng tạo.",
      img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Phùng Tố Uyên",
      role: "CFO",
      desc: "Quản trị tài chính, đầu tư hiệu quả và duy trì nền tảng vững chắc.",
      img: "https://images.unsplash.com/photo-1614281196710-3b3bde11d3b9?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Lý Ngọc Khánh",
      role: "CMO",
      desc: "Chiến lược truyền thông và lan tỏa giá trị nghệ thuật Trúc Chỉ đến cộng đồng.",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Lương Minh Quý",
      role: "COO",
      desc: "Quản lý vận hành và đảm bảo chất lượng cho từng sản phẩm nghệ thuật.",
      img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=500&q=80",
    },
  ];

  return (
    <>
      {/* --- VIDEO GIỚI THIỆU --- */}
      <section className="position-relative text-center text-white">
        <Breadcrumb/>
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
          className="position-absolute top-50 start-50 translate-middle text-center px-3"
          style={{ maxWidth: "800px" }}
        >
          <motion.h2
            className="fw-bold mb-3 display-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Trúc Họa Viên — Hành trình kết nối truyền thống và hiện đại
          </motion.h2>
          <motion.p
            className="fs-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span style={{color:"#fff"}}>
            Nơi nghệ thuật giấy Trúc Chỉ được tái sinh trong không gian sống đương đại,
            kết nối tinh hoa văn hóa Việt với hơi thở của thời đại.
            </span>
          </motion.p>
        </div>
      </section>

        <section class="about-layout1 space-top" style={{ backgroundColor: "#fef6e9" }}>
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
                  <a class="vs-btn" href="about.html">Xem thêm</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

      {/* --- TẦM NHÌN --- */}
      <section className="py-5" style={{ backgroundColor: "#fef6e9" }}>
        <div className="container">
          <div className="row align-items-center">
            <motion.div
              className="col-md-6 mb-4 mb-md-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=800&q=80"
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
              <h2
                className="fw-bold mb-3 d-flex align-items-center justify-content-center justify-content-md-start"
                style={{ color: "#a33a2c", fontFamily: "Crimson Pro, serif" }}
              >
                <Target size={32} className="me-2 text-danger" /> Tầm nhìn
              </h2>
              <p className="fs-5 text-dark lh-lg" style={{ fontFamily: "Crimson Pro" }}>
                Kiến tạo một tương lai nơi nghệ thuật giấy Trúc Chỉ trở thành biểu tượng
                của sự hòa quyện giữa tinh hoa truyền thống và không gian sống đương đại.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SỨ MỆNH --- */}
      <section className="py-5" style={{ backgroundColor: "#fef6e9" }}>
        <div className="container">
          <div className="row align-items-center flex-md-row-reverse">
            <motion.div
              className="col-md-6 mb-4 mb-md-0"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=800&q=80"
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
              <h2
                className="fw-bold mb-3 d-flex align-items-center justify-content-center justify-content-md-start"
                style={{ color: "#a33a2c", fontFamily: "Crimson Pro, serif" }}
              >
                <Leaf size={32} className="me-2 text-danger" /> Sứ mệnh
              </h2>
              <p className="fs-5 text-dark lh-lg" style={{ fontFamily: "Crimson Pro" }}>
                Lan tỏa tinh hoa Trúc Chỉ – biểu trưng cho nghệ thuật Việt, kết hợp truyền
                thống và hiện đại, hướng tới phát triển bền vững.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- GIÁ TRỊ CỐT LÕI --- */}
      <section
        className="py-5 text-center"
        style={{
          backgroundColor: "#fef6e9",
        }}
      >
        <div className="container">
          <motion.h2
            className="fw-bold mb-5"
            style={{ color: "#a33a2c", fontFamily: "Crimson Pro, serif" }}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Giá trị cốt lõi
          </motion.h2>

          <div className="row g-4 justify-content-center">
            {[
              {
                icon: <FaFlag className="text-danger mb-3" size={40} />,
                title: "Bản sắc Việt",
                desc: "Tôn vinh nghệ thuật Trúc Chỉ – tái sinh tinh hoa truyền thống qua hơi thở đương đại.",
              },
              {
                icon: <FaRecycle className="text-danger mb-3" size={40} />,
                title: "Bền vững",
                desc: "Cam kết phát triển hài hòa với tự nhiên và sử dụng nguyên liệu bản địa.",
              },
              {
                icon: <FaLightbulb className="text-danger mb-3" size={40} />,
                title: "Sáng tạo",
                desc: "Không ngừng đổi mới để hòa quyện nghệ thuật truyền thống với hiện đại.",
              },
              {
                icon: <FaHandsHelping className="text-danger mb-3" size={40} />,
                title: "Chân thành",
                desc: "Tôn trọng con người, nghệ nhân và cộng đồng sáng tạo.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="col-md-6 col-lg-3 d-flex"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * i }}
              >
                <div
                  className="card border-0 shadow-sm p-4 rounded-4 text-center w-100 h-100 d-flex flex-column justify-content-center align-items-center"
                  style={{
                    backgroundColor: "#fff",
                    borderTop: "4px solid #a33a2c",
                    transition: "all 0.3s ease",
                  }}
                >
                  {item.icon}
                  <h5 className="fw-bold">{item.title}</h5>
                  <p className="text-muted">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 text-muted" style={{ fontFamily: "Crimson Pro" }}>
            <HeartHandshake className="text-danger mb-2" size={42} />
            <p className="fw-semibold fs-5">
              Lan tỏa giá trị – Kết nối cộng đồng – Nuôi dưỡng sáng tạo.
            </p>
          </div>
        </div>
      </section>
              <div
  style={{
    backgroundColor: "#fef6e9",   // 👈 màu nền bao quanh
    padding: "30px 0",            // tạo khoảng cách trên dưới
  }}
>
  <div
    style={{
      width: "60%",
      height: "2px",
      backgroundColor: "#a33a2c",
      margin: "0 auto",
      borderRadius: "2px"
    }}
  ></div>
</div>

      {/* --- ĐỘI NGŨ --- */}
<section
  className="py-5 pb-24"  // <- thêm pb-24 hoặc pb-28 (tương đương 96px - 112px)
  style={{
    backgroundColor: "#fef6e9",
  }}
>
        <div className="container text-center">
          <motion.h2
            className="fw-bold mb-5 d-flex align-items-center justify-content-center"
            style={{ color: "#a33a2c", fontFamily: "Crimson Pro, serif"}}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Users className="me-2 text-danger" /> Đội ngũ của chúng tôi
          </motion.h2>

          <div className="row g-4 justify-content-center">
            {team.map((member, i) => (
              <motion.div
                key={i}
                className="col-md-6 col-lg-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 * i }}
              >
                <div
                  className="card h-100 border-0 shadow-sm p-4 rounded-4 d-flex flex-column align-items-center justify-content-center"
                  style={{
                    backgroundColor: "#fff",
                    transition: "all 0.3s ease",
                  }}
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    className="rounded-circle shadow-sm mb-3 mx-auto"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      border: "4px solid #a33a2c",
                    }}
                  />
                  <h5 className="fw-bold text-dark mt-2">{member.name}</h5>
                  <p className="text-danger fw-semibold mb-2">{member.role}</p>
                  <p className="text-muted mb-0">{member.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div
  style={{
    backgroundColor: "#fef6e9",   // 👈 màu nền bao quanh
    padding: "50px 0",            // tạo khoảng cách trên dưới
  }}
>
</div>
      </section>
    </>
  );
}
