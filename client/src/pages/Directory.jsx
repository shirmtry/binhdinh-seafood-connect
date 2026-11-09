import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const fmtVnd = (n) => new Intl.NumberFormat('vi-VN').format(n) + ' đ/kg';

export default function Directory() {
  const [farms, setFarms] = useState([]);
  const [types, setTypes] = useState([]);
  const [type, setType] = useState('');
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/types')
      .then((r) => r.json())
      .then((d) => setTypes(d.types || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setError('');
    const url = type ? `/api/farms?type=${encodeURIComponent(type)}` : '/api/farms';
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then((d) => setFarms(d.farms || []))
      .catch(() => setError('Không tải được dữ liệu. Vui lòng thử lại hoặc gọi HTK 0396241674.'))
      .finally(() => setLoading(false));
  }, [type]);

  const filtered = useMemo(() => {
    const kw = q.trim().toLowerCase();
    if (!kw) return farms;
    return farms.filter(
      (f) =>
        f.ten.toLowerCase().includes(kw) ||
        f.loai.toLowerCase().includes(kw) ||
        f.khuVuc.toLowerCase().includes(kw)
    );
  }, [farms, q]);

  return (
    <div className="container">
      <h1>Danh sách hộ nuôi Nhơn Hải</h1>
      <p className="mock-label">Dữ liệu mô phỏng – cập nhật 09/11/2026 (SĐT là số mô phỏng)</p>

      <div className="filters">
        <label>
          Loại hải sản
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Tất cả (30 hộ)</option>
            {types.map((t) => (
              <option key={t.slug} value={t.slug}>{t.ten} ({t.soHo} hộ)</option>
            ))}
          </select>
        </label>
        <label className="grow">
          Tìm kiếm
          <input
            type="search"
            placeholder="Tìm theo tên chủ hộ, khu vực, loại hải sản..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
      </div>

      {loading && <p>Đang tải dữ liệu hộ nuôi...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <p className="result-count">Tìm thấy <strong>{filtered.length}</strong> hộ nuôi phù hợp.</p>
      )}

      <div className="farm-grid">
        {filtered.map((f) => (
          <article className="farm-card" key={f.id}>
            <div className="farm-head">
              <h3>{f.ten}</h3>
              <span className={'badge badge-' + f.loaiSlug}>{f.loai}</span>
            </div>
            <p className="farm-area">📍 {f.khuVuc}</p>
            <p>🎣 Sản lượng sẵn sàng bán: <strong>{f.sanLuongKg} kg</strong></p>
            <p>💰 Giá mong muốn: <strong>{fmtVnd(f.giaMongMuon)}</strong></p>
            <p>📞 SĐT (mô phỏng): <a href={'tel:' + f.sdt}>{f.sdt}</a></p>
            <p className="farm-note">{f.tinhTrang}</p>
            <Link className="btn btn-small" to="/purchase">Đăng ký thu mua</Link>
          </article>
        ))}
      </div>
      {!loading && !error && filtered.length === 0 && (
        <p>Không có hộ nuôi phù hợp. Thử đổi bộ lọc hoặc gọi <a href="tel:0396241674">HTK 0396241674</a>.</p>
      )}
    </div>
  );
}