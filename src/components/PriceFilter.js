import React, { useEffect, useRef, useState } from "react";
import noUiSlider from "nouislider";
import wNumb from "wnumb";
import "nouislider/dist/nouislider.css";

export default function PriceFilter({ minPrice, maxPrice, setMinPrice, setMaxPrice, onFilter }) {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    // 🔒 Nếu slider đã được tạo, thì không tạo lại nữa
    if (slider.noUiSlider) return;

    noUiSlider.create(slider, {
      start: [minPrice || 0, maxPrice || 10000000],
      connect: true,
      range: {
        min: 0,
        max: 10000000,
      },
      tooltips: false,
      format: wNumb({ decimals: 0 }),
    });

    // 🔄 Cập nhật giá khi người dùng kéo
    slider.noUiSlider.on("update", (values) => {
      setMinPrice(Number(values[0]));
      setMaxPrice(Number(values[1]));
    });

    // 🧹 Hủy khi unmount để tránh lỗi “already initialized”
    return () => {
      if (slider.noUiSlider) slider.noUiSlider.destroy();
    };
  }, []); // chỉ chạy 1 lần

  return (
    <div className="widget wow animate__fadeInUp" data-wow-delay="0.40s">
      <h3 className="widget_title mb-35 title-shep">Lọc theo giá</h3>
      <div className="slider-area">
        <div className="slider-area-wrapper">
          <div id="skipstep" className="slider mb-20" ref={sliderRef}></div>
          <div className="range-btn d-flex align-items-center justify-content-between">
            <button className="vs-btn" type="button" onClick={onFilter}>
              Lọc
            </button>
            <div className="price-range">
              Giá: ₫{minPrice.toLocaleString()} - ₫{maxPrice.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
