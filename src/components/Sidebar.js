import React, { useState } from "react";
import { Funnel, Search } from "lucide-react";

export default function Sidebar() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(400000);

  return (
    <aside className="w-full lg:w-80 space-y-8 sticky top-32 h-fit">
      {/* DANH MỤC */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Funnel className="w-5 h-5 text-[#20161F]" />
            <h3 className="text-xl font-display font-bold text-neutral-800">
              Danh Mục Sản Phẩm
            </h3>
          </div>
          <div className="space-y-3">
            <button
              className="w-full text-left px-6 py-4 rounded-2xl font-semibold transition-all duration-300 text-white shadow-lg"
              style={{ backgroundColor: "#20161F" }}
            >
              Tất cả sản phẩm
            </button>
            {/* Thêm các danh mục khác nếu cần */}
            <button className="w-full text-left px-6 py-4 rounded-2xl font-semibold transition-all duration-300 hover:bg-gray-100 text-[#20161F]">
              Truyện tranh
            </button>
            <button className="w-full text-left px-6 py-4 rounded-2xl font-semibold transition-all duration-300 hover:bg-gray-100 text-[#20161F]">
              Khoa học
            </button>
            <button className="w-full text-left px-6 py-4 rounded-2xl font-semibold transition-all duration-300 hover:bg-gray-100 text-[#20161F]">
              Văn học
            </button>
          </div>
        </div>
      </div>

      {/* LỌC THEO GIÁ */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-8">
          <h3 className="text-xl font-display font-bold text-neutral-800 mb-6">
            Khoảng Giá (₫)
          </h3>

          {/* THANH RANGE */}
          <div className="relative w-full h-12 mb-6">
            <div className="absolute top-1/2 left-0 right-0 h-2 bg-neutral-200 rounded-lg transform -translate-y-1/2" />
            <div
              className="absolute top-1/2 h-2 rounded-lg transform -translate-y-1/2"
              style={{
                backgroundColor: "#20161F",
                left: `${(minPrice / 400000) * 100}%`,
                width: `${((maxPrice - minPrice) / 400000) * 100}%`,
              }}
            />
            <input
              type="range"
              min="0"
              max="400000"
              step="1000"
              value={minPrice}
              onChange={(e) =>
                setMinPrice(Math.min(Number(e.target.value), maxPrice - 1000))
              }
              className="absolute top-1/3 left-0 w-full h-2 bg-transparent appearance-none cursor-pointer transform -translate-y-1/2 z-10"
            />
            <input
              type="range"
              min="0"
              max="400000"
              step="1000"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(Math.max(Number(e.target.value), minPrice + 1000))
              }
              className="absolute top-1/3 left-0 w-full h-2 bg-transparent appearance-none cursor-pointer transform -translate-y-1/2 z-20"
            />
          </div>

          <style>{`
            input[type="range"]::-webkit-slider-thumb {
              appearance: none;
              height: 20px;
              width: 20px;
              border-radius: 50%;
              background: #20161F;
              cursor: pointer;
              border: 3px solid white;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
              position: relative;
              z-index: 30;
            }
            input[type="range"]::-moz-range-thumb {
              height: 20px;
              width: 20px;
              border-radius: 50%;
              background: #20161F;
              cursor: pointer;
              border: 3px solid white;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
              position: relative;
              z-index: 30;
            }
            input[type="range"]::-webkit-slider-track {
              background: transparent;
              height: 2px;
            }
            input[type="range"]::-moz-range-track {
              background: transparent;
              height: 2px;
              border: none;
            }
          `}</style>

          <div className="flex justify-between space-x-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-neutral-600 mb-2">
                Từ
              </label>
              <input
                className="input-field w-full border rounded-lg p-2"
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-neutral-600 mb-2">
                Đến
              </label>
              <input
                className="input-field w-full border rounded-lg p-2"
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>

      {/* TÌM KIẾM */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Search className="w-5 h-5 text-[#20161F]" />
            <h3 className="text-xl font-display font-bold text-neutral-800">
              Tìm Kiếm
            </h3>
          </div>

          <div className="relative">
            <input
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full pl-14 pr-6 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-300 transition-all duration-300 text-lg placeholder-gray-400"
              aria-label="Tìm kiếm sản phẩm"
              type="text"
            />
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
          </div>
        </div>
      </div>
    </aside>
  );
}
