import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
  const preloaderRef = useRef(null);

  useEffect(() => {
    const preloader = preloaderRef.current;
    if (!preloader) return;

    // Mở preloader ngay khi vào web
    gsap.fromTo(
      preloader,
      { autoAlpha: 1, y: "0%" },  // hiển thị ngay
      { y: "0%", autoAlpha: 1, duration: 0 } // giữ nguyên lúc mới load
    );

    // Đóng preloader sau 1.2s
    const timer = setTimeout(() => {
      gsap.to(preloader, {
        y: "-100%",   // trượt lên
        autoAlpha: 0, // ẩn dần
        duration: 1.2,
        ease: "power3.inOut",
      });
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={preloaderRef} className="preloader">
      <div className="preloader-inner">
        <img src="/assets/img/logo-01.svg" alt="logo" />
        <span className="loader"></span>
      </div>
    </div>
  );
}
