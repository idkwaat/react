// UnauthorizedPage.js
export default function UnauthorizedPage() {
  return (
    <div className="container text-center mt-5">
      <h1>🚫 Không có quyền truy cập</h1>
      <p>Bạn cần quyền Admin để truy cập trang này.</p>
      <a href="/" className="btn btn-primary mt-3">Quay lại trang chủ</a>
    </div>
  );
}
