export default function About() {
  return (
    <div className="container narrow">
      <h1>Giới thiệu dự án</h1>
      <p className="updated">Cập nhật: 09/11/2026</p>

      <section className="card">
        <h2>Bối cảnh Bình Định — mùa mưa lũ 2026</h2>
        <p>
          Tháng 10–12/2026, Bình Định liên tiếp chịu bão số 9, số 10 đổ bộ Quy Nhơn – Phù Cát –
          Hoài Nhơn, lũ sông Kôn dâng cao ở Tuy Phước và An Nhơn, sạt lở An Lão – Vĩnh Thạnh –
          Tây Sơn, ngập úng đô thị Quy Nhơn và xói lở bờ biển Nhơn Lý, Cát Tiến, Mỹ Thành.
          Nhiều vùng mất điện 3–7 ngày, tàu cá gặp nạn khi biển động cấp 7–8.
        </p>
        <p>
          Riêng xã Nhơn Hải (TP Quy Nhơn) — thủ phủ tôm hùm lồng bè — người nuôi chịu thiệt
          hại kép: lồng bè hư hỏng và bị thương lái ép giá khi cần bán gấp. Dự án
          <strong> binhdinh-seafood-connect</strong> minh bạch hóa sản lượng, giá mong muốn của
          30 hộ nuôi và mở kênh thu mua trực tiếp, góp phần phục hồi sinh kế sau bão.
        </p>
        <p className="mock-label">Dữ liệu mô phỏng – cập nhật 09/11/2026</p>
      </section>

      <section className="card contact-block">
        <h2>Liên hệ HTK – 0396241674</h2>
        <ul>
          <li>📞 Hotline: <a href="tel:0396241674">0396241674</a></li>
          <li>💬 Zalo: <a href="https://zalo.me/0396241674" target="_blank" rel="noreferrer">zalo.me/0396241674</a></li>
          <li>✉️ Email: <a href="mailto:htk.contact@gmail.com">htk.contact@gmail.com</a></li>
        </ul>
        <p>Cập nhật: 09/11/2026</p>
      </section>

      <section className="card">
        <h2>Công nghệ</h2>
        <p>
          Backend Node.js Express (JSON API: /api/farms, /api/types, /api/purchases) + Frontend
          React SPA (Vite, react-router-dom). Deploy trên Vercel. Mọi dữ liệu hộ nuôi và số
          điện thoại trong danh bạ là dữ liệu mô phỏng phục vụ demo.
        </p>
      </section>
    </div>
  );
}