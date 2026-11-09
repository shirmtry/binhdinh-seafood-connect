import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container">
      <section className="hero">
        <h1>Kết nối tôm hùm Nhơn Hải — không để người nuôi bị ép giá</h1>
        <p className="updated">Cập nhật: 09/11/2026</p>
        <p>
          Sau bão số 9 và số 10 (10/2026) đổ bộ Quy Nhơn, hàng trăm lồng bè tôm hùm tại xã
          Nhơn Hải bị hư hại, người nuôi phải bán tháo để có vốn sửa bè. Thương lái lợi dụng
          cảnh mất điện 3–7 ngày và biển động cấp 7–8 để ép giá xuống chỉ còn 50–60% giá thị
          trường. Nền tảng này kết nối trực tiếp người mua với 30 hộ nuôi tôm hùm xanh, tôm
          hùm bông và hải sản khác tại Nhơn Hải, minh bạch sản lượng và giá mong muốn. Mỗi
          đơn thu mua gửi qua hệ thống là một lần giúp bà con vượt qua mùa mưa lũ 2026.
        </p>
        <div className="hero-actions">
          <Link className="btn" to="/directory">Xem danh sách hộ nuôi</Link>
          <Link className="btn btn-outline" to="/purchase">Gửi nhu cầu thu mua</Link>
        </div>
      </section>

      <section className="stats">
        <div className="stat-card"><strong>30</strong><span>Hộ nuôi Nhơn Hải</span></div>
        <div className="stat-card"><strong>7</strong><span>Loại hải sản</span></div>
        <div className="stat-card"><strong>50–60%</strong><span>Giá bị ép sau bão</span></div>
        <div className="stat-card"><strong>24/7</strong><span>Hotline HTK 0396241674</span></div>
      </section>

      <section className="card">
        <h2>Vì sao cần kết nối trực tiếp?</h2>
        <ul>
          <li>🦞 Tôm hùm xanh, tôm hùm bông đến size xuất bán nhưng không có tàu thu mua sau bão.</li>
          <li>⚡ Mất điện diện rộng khiến hệ thống sục khí lồng bè tê liệt — cần xuất bán sớm.</li>
          <li>💸 Bán thẳng cho người tiêu dùng, nhà hàng, thương lái thiện chí giúp giữ giá công bằng.</li>
          <li>🤝 HTK xác minh nhu cầu và kết nối hai bên qua Hotline/Zalo <a href="tel:0396241674">0396241674</a>.</li>
        </ul>
        <p className="mock-label">Dữ liệu mô phỏng – cập nhật 09/11/2026</p>
      </section>
    </div>
  );
}