import { motion } from "framer-motion";
import {
  Scroll,
  Leaf,
  Palette,
  HandHeart,
  HeartHandshake,
  Users
} from "lucide-react";


import { Breadcrumb } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


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
      img: "assets/img/NgoHoangAn.jpg",
    },
    {
      name: "Nguyễn Thị Thảo",
      role: "CPO",
      desc: "Thiết kế sản phẩm nghệ thuật, đảm bảo giá trị độc bản và tinh hoa sáng tạo.",
      img: "assets/img/NguyenThiThao.jpg",
    },
    {
      name: "Phùng Tố Uyên",
      role: "CFO",
      desc: "Quản trị tài chính, đầu tư hiệu quả và duy trì nền tảng vững chắc.",
      img: "assets/img/PhungToUyen.jpg",
    },
    {
      name: "Lý Ngọc Khánh",
      role: "CMO",
      desc: "Chiến lược truyền thông và lan tỏa giá trị nghệ thuật giấy Trúc Chỉ đến cộng đồng.",
      img: "assets/img/LyNgocKhanh.jpg",
    },
    {
      name: "Lương Minh Quý",
      role: "COO",
      desc: "Quản lý vận hành và đảm bảo chất lượng cho từng sản phẩm nghệ thuật.",
      img: "assets/img/LuongMinhQuy.jpg",
    },
  ];
  const heroImages = [
  "/assets/slide/1.jpg",
  "/assets/slide/2.jpg",
  "/assets/slide/3.jpg",
  "/assets/slide/4.jpg",
  "/assets/slide/5.jpg"
];


  return (
    <>
     <section className="position-relative text-white">
  <Slider
    autoplay={true}
    autoplaySpeed={3500}
    speed={1200}
    infinite={true}
    fade={true}
    arrows={false}
    dots={false}
    pauseOnHover={false}
  >
    {heroImages.map((img, index) => (
      <div key={index}>
        <div
          style={{
            height: "600px",
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(60%)",
          }}
        />
      </div>
    ))}
  </Slider>

  {/* Overlay text */}
  <div
    className="position-absolute top-50 start-50 translate-middle text-center px-3"
    style={{ maxWidth: "800px", zIndex: 10 }}
  >
    <h2 className="fw-bold mb-3 display-6">
      Trúc Hoạ Viên - Nghệ thuật giấy mới trong dòng chảy văn hoá Việt

    </h2>

    <p className="fs-5">
      <span style={{ color: "#fff" }}>
        Chúng tôi tạo nên những tác phẩm giấy mang chiều sâu văn hoá Việt, kết hợp kỹ nghệ thủ công tinh tế với tư duy thiết kế hiện đại, để mỗi sản phẩm không chỉ đẹp mắt mà còn truyền tải giá trị và tinh thần của nghệ thuật giấyTrúc Chỉ trong thời đại mới.
      </span>
    </p>
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
                Trúc Hoạ Viên mang đến cho giấy nghệ thuật Trúc Chỉ khả năng “thoát khỏi thân phận làm nền” - để mỗi tấm giấy trở thành một tác phẩm có linh hồn, phản chiếu tinh thần Việt.
              </p>
            </div>
<div class="list-style1 wow animate__fadeInUp" data-wow-delay="0.50s">
  <ul class="list-unstyled">
    <li><i class="fa-solid fa-leaf"></i> Khơi nguồn tinh hoa Việt từ trang giấy nghệ thuật</li>
    <li><i class="fa-solid fa-scroll"></i> Sáng tạo từ truyền thống - vươn tới tương lai</li>
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
                    Trúc Chỉ là một dòng giấy nghệ thuật độc bản, ra đời từ niềm trân trọng với nghề làm giấy truyền thống Việt Nam. Mỗi tấm giấy không chỉ mang trong mình giá trị của kỹ thuật thủ công, mà còn là kết tinh của sự sáng tạo, của niềm đam mê và khát vọng lưu giữ hồn Việt bằng hình thức mới.

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
                src="assets/img/DSC02057.jpg"
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
                 Tầm nhìn
              </h2>
              <p className="fs-5 text-dark lh-lg" style={{ fontFamily: "Crimson Pro" }}>
                Trúc Hoạ Viên định vị mình là đơn vị tiên phong trong nghệ thuật giấy Trúc Chỉ, nơi quy trình chế tác thủ công được thực hiện với sự tỉ mỉ và tinh thần sáng tạo cao nhất. Chúng tôi hướng đến việc tôn vinh vẻ đẹp thẩm mỹ và giá trị văn hóa Việt, để mỗi tác phẩm Trúc Chỉ không chỉ được gìn giữ như một di sản, mà còn được thổi vào hơi thở mới - hài hòa trong không gian sống đương đại.
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
                src="assets/img/DSC02001.jpg"
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
                 Sứ mệnh
              </h2>
              <p className="fs-5 text-dark lh-lg" style={{ fontFamily: "Crimson Pro" }}>
                Trúc Hoạ Viên mang sứ mệnh lan tỏa tinh hoa văn hoá Việt qua nghệ thuật giấy Trúc Chỉ, nơi mỗi tác phẩm là sự giao hòa giữa truyền thống và sáng tạo đương đại.
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
    icon: <Scroll size={40} color="#a33a2c" className="mb-3" />,
    title: "Di sản",
    desc: "Trúc Hoạ Viên tôn vinh giấy Trúc Chỉ như một di sản văn hoá Việt, kết hợp hài hòa giữa gìn giữ truyền thống và lan tỏa sáng tạo đương đại.",
  },
  {
    icon: <Leaf size={40} color="#a33a2c" className="mb-3" />,
    title: "Bền vững",
    desc: "Chúng tôi hướng đến phát triển bền vững với nguyên liệu tự nhiên, quy trình thân thiện môi trường và thiết kế có giá trị lâu dài.",
  },
  {
    icon: <Palette size={40} color="#a33a2c" className="mb-3" />,
    title: "Nghệ thuật",
    desc: "Mỗi tác phẩm là sự biểu đạt về cảm xúc và thẩm mỹ, kể câu chuyện văn hoá qua chất liệu và tâm hồn.",
  },
  {
    icon: <HandHeart size={40} color="#a33a2c" className="mb-3" />,
    title: "Thủ công",
    desc: "Từng sản phẩm được tạo nên từ bàn tay khéo léo và tâm huyết của nghệ nhân, mang đậm dấu ấn độc bản của Trúc Hoạ Viên.",
  },
]
.map((item, i) => (
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
