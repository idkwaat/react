import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5186";

export default function AdminPage() {
  const [stats, setStats] = useState(null);

  const [range, setRange] = useState("week"); // 🌟 range mặc định
  const [revenueChart, setRevenueChart] = useState(null);
  const [visitorChart, setVisitorChart] = useState(null);

  // ----------------------------
  // 📌 LOAD OVERVIEW
  // ----------------------------
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/dashboard/overview`)
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Overview error:", err));
  }, []);

  // ----------------------------
  // 📌 LOAD BIỂU ĐỒ KHI RANGE THAY ĐỔI
  // ----------------------------
  useEffect(() => {
    // Biểu đồ doanh thu
    axios
      .get(`${API_BASE_URL}/api/dashboard/revenue-chart?range=${range}`)
      .then((res) => {
        setRevenueChart({
          labels: res.data.map((x) => x.date),
          datasets: [
            {
              label: "Doanh thu (VND)",
              data: res.data.map((x) => x.revenue),
              borderColor: "#28a745",
              fill: false,
              tension: 0.3,
            },
          ],
        });
      })
      .catch((err) => console.error("Revenue chart error:", err));

    // Biểu đồ truy cập
    axios
      .get(`${API_BASE_URL}/api/dashboard/visit-chart?range=${range}`)
      .then((res) => {
        setVisitorChart({
          labels: res.data.map((x) => x.date),
          datasets: [
            {
              label: "Lượt truy cập",
              data: res.data.map((x) => x.count),
              borderColor: "#007bff",
              fill: false,
              tension: 0.3,
            },
          ],
        });
      })
      .catch((err) => console.error("Visit chart error:", err));
  }, [range]);

  // ----------------------------
  if (!stats) return <div className="text-center mt-5">Đang tải Dashboard...</div>;
  // ----------------------------

  return (
    <>
      <div className="row">
        <div className="col-md-12 page-header">
          <div className="page-pretitle">Overview</div>
          <h2 className="page-title">Dashboard</h2>
        </div>
      </div>

      {/* ============================== */}
      {/* 🔹 THỐNG KÊ TỔNG QUAN */}
      {/* ============================== */}

      <div className="row">
        {/* Đơn hàng */}
        <div className="col-sm-6 col-md-6 col-lg-3 mt-3">
          <div className="card">
            <div className="content">
              <div className="row">
                <div className="col-sm-4 text-center">
                  <i className="teal fas fa-shopping-cart fa-2x"></i>
                </div>
                <div className="col-sm-8">
                  <p className="detail-subtitle">Đơn hàng hôm nay</p>
                  <span className="number">{stats.todayOrders}</span>
                </div>
              </div>
              <hr />
              <div className="stats">
                <i className="fas fa-calendar"></i> Tổng: {stats.totalOrders}
              </div>
            </div>
          </div>
        </div>

        {/* Doanh thu */}
        <div className="col-sm-6 col-md-6 col-lg-3 mt-3">
          <div className="card">
            <div className="content">
              <div className="row">
                <div className="col-sm-4 text-center">
                  <i className="olive fas fa-money-bill-alt fa-2x"></i>
                </div>
                <div className="col-sm-8">
                  <p className="detail-subtitle">Doanh thu hôm nay</p>
                  <span className="number">{stats.todayRevenue.toLocaleString()}₫</span>
                </div>
              </div>
              <hr />
              <div className="stats">
                <i className="fas fa-calendar"></i> Tổng: {stats.totalRevenue.toLocaleString()}₫
              </div>
            </div>
          </div>
        </div>

        {/* Lượt truy cập */}
        <div className="col-sm-6 col-md-6 col-lg-3 mt-3">
          <div className="card">
            <div className="content">
              <div className="row">
                <div className="col-sm-4 text-center">
                  <i className="violet fas fa-eye fa-2x"></i>
                </div>
                <div className="col-sm-8">
                  <p className="detail-subtitle">Lượt truy cập hôm nay</p>
                  <span className="number">{stats.todayVisits}</span>
                </div>
              </div>
              <hr />
              <div className="stats">
                <i className="fas fa-stopwatch"></i> Tổng: {stats.totalVisits}
              </div>
            </div>
          </div>
        </div>

        {/* Người dùng */}
        <div className="col-sm-6 col-md-6 col-lg-3 mt-3">
          <div className="card">
            <div className="content">
              <div className="row">
                <div className="col-sm-4 text-center">
                  <i className="orange fas fa-user fa-2x"></i>
                </div>
                <div className="col-sm-8">
                  <p className="detail-subtitle">Tổng người dùng</p>
                  <span className="number">{stats.totalUsers}</span>
                </div>
              </div>
              <hr />
              <div className="stats">
                <i className="fas fa-user-check"></i> Active users
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================== */}
      {/* 🔹 LỰA CHỌN HIỂN THỊ RANGE */}
      {/* ============================== */}
      <div className="d-flex gap-2 mt-4">
        <button
          className={`btn ${range === "week" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setRange("week")}
        >
          Tuần
        </button>

        <button
          className={`btn ${range === "month" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setRange("month")}
        >
          Tháng
        </button>

        <button
          className={`btn ${range === "year" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setRange("year")}
        >
          Năm
        </button>

        <button
          className={`btn ${range === "all" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setRange("all")}
        >
          Tất cả
        </button>
      </div>

      {/* ============================== */}
      {/* 🔹 BIỂU ĐỒ */}
      {/* ============================== */}

      <div className="row mt-4">
        {/* Biểu đồ doanh thu */}
        <div className="col-md-6">
          <div className="card">
            <div className="content">
              <h5>📈 Doanh thu ({range})</h5>

              {revenueChart && (
                <p className="text-muted mb-2">
                  Tổng:{" "}
                  <strong>
                    {revenueChart.datasets[0].data.reduce((a, b) => a + b, 0).toLocaleString()}₫
                  </strong>
                </p>
              )}

              <div className="canvas-wrapper">
                {revenueChart ? <Line data={revenueChart} height={180} /> : <p>Đang tải...</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Biểu đồ truy cập */}
        <div className="col-md-6">
          <div className="card">
            <div className="content">
              <h5>👁️‍🗨️ Lượt truy cập ({range})</h5>

              {visitorChart && (
                <p className="text-muted mb-2">
                  Tổng:{" "}
                  <strong>
                    {visitorChart.datasets[0].data.reduce((a, b) => a + b, 0).toLocaleString()}
                  </strong>{" "}
                  lượt
                </p>
              )}

              <div className="canvas-wrapper">
                {visitorChart ? <Line data={visitorChart} height={180} /> : <p>Đang tải...</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
