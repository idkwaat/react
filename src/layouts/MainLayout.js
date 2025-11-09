import Header from "../components/Header";
import Footer from "../components/Footer";
import PopupSearchBox from "../components/PopupSearchBox";
import MobileMenu from "../components/MobileMenu";
import BackToTop from "../components/BackToTop";
import Preloader from "../components/Preloader";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function MainLayout({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Chạy lại script JS template để menu, dropdown, sticky hoạt động
    import("../assets/js/main.js");
  }, [location.pathname]);

  return (
    <>
      <Preloader /> {/* luôn render, animation GSAP tự handle */}
      <MobileMenu />
      <Header />
      <PopupSearchBox />
      <main>{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
