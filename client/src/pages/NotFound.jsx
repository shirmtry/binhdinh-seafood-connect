import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container narrow center">
      <h1>404 — Không tìm thấy trang</h1>
      <p>Trang bạn tìm không tồn tại hoặc đã được chuyển đi trong mùa mưa lũ 2026.</p>
      <p>
        Cần hỗ trợ kết nối thu mua tôm hùm Nhơn Hải? Gọi ngay Hotline/Zalo HTK:{' '}
        <a href="tel:0396241674"><strong>0396241674</strong></a> ·{' '}
        <a href="mailto:htk.contact@gmail.com">htk.contact@gmail.com</a>
      </p>
      <Link className="btn" to="/">Về trang chủ</Link>
    </div>
  );
}