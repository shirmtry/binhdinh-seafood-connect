// binhdinh-seafood-connect — Kết nối tiêu thụ tôm hùm Nhơn Hải sau bão 2026
// Tác giả: HTK — Hotline/Zalo: 0396241674 — Email: htk.contact@gmail.com
// Cập nhật: 09/11/2026
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());

// Vercel rewrite "/(.*)" -> "/api/index?__path=$1": @vercel/node only matches
// the exact function path, so the original path travels in the __path query
// param. Restore req.url before routing (proven pattern from binhdinh-sos-emergency).
app.use((req, res, next) => {
  const qIdx = req.url.indexOf('?');
  const qs = qIdx >= 0 ? req.url.slice(qIdx + 1) : '';
  const params = new URLSearchParams(qs);
  if (params.has('__path')) {
    const p = params.get('__path').replace(/^\/+/, '');
    params.delete('__path');
    const rest = params.toString();
    req.url = '/' + p + (rest ? '?' + rest : '');
  } else if (req.url === '/api/index' || req.url.startsWith('/api/index/')) {
    req.url = req.url.slice('/api/index'.length) || '/';
  } else if (req.url.startsWith('/api/index?')) {
    req.url = req.url.slice('/api/index'.length);
  }
  next();
});

const MOCK_LABEL = 'Dữ liệu mô phỏng – cập nhật 09/11/2026';

const TYPES = [
  { slug: 'tom-hum-xanh', ten: 'Tôm hùm xanh' },
  { slug: 'tom-hum-bong', ten: 'Tôm hùm bông' },
  { slug: 'cua', ten: 'Cua' },
  { slug: 'ghe', ten: 'Ghẹ' },
  { slug: 'so', ten: 'Sò' },
  { slug: 'hau', ten: 'Hàu' },
  { slug: 'muc', ten: 'Mực' }
];

// 30 hộ nuôi tôm hùm & hải sản Nhơn Hải — Dữ liệu mô phỏng – cập nhật 09/11/2026
// SĐT là số MÔ PHỎNG, không phải số liên lạc thật.
const NAMES = [
  'Nguyễn Văn Hải', 'Trần Thị Lob', 'Lê Văn Sóng', 'Phạm Thị Châu', 'Hồ Văn Lưới',
  'Võ Thị Bè', 'Đặng Văn Khơi', 'Bùi Thị San Hô', 'Đỗ Văn Ghềnh', 'Ngô Thị Rạn',
  'Dương Văn Hải Lý', 'Mai Thị Cồn', 'Trương Văn Nhọn', 'Lý Thị Bãi Ngang', 'Đinh Văn Hòn Khô',
  'Phan Thị Đầm', 'Nguyễn Văn Vịnh', 'Trần Văn Én', 'Lê Thị Mùng', 'Phạm Văn Neo',
  'Hồ Thị Giềng', 'Võ Văn Phao', 'Đặng Thị Chài', 'Bùi Văn Xuồng', 'Đỗ Thị Đăng',
  'Ngô Văn Đáy', 'Dương Thị Lờ', 'Mai Văn Rớ', 'Trương Thị Vó', 'Lý Văn Chồ'
];

const PRICE_BY_TYPE = {
  'tom-hum-xanh': 950000,
  'tom-hum-bong': 1900000,
  'cua': 320000,
  'ghe': 220000,
  'so': 45000,
  'hau': 35000,
  'muc': 180000
};
const YIELD_BY_TYPE = {
  'tom-hum-xanh': 120,
  'tom-hum-bong': 80,
  'cua': 200,
  'ghe': 250,
  'so': 900,
  'hau': 1200,
  'muc': 150
};
// Phân bổ: 10 tôm hùm xanh, 6 tôm hùm bông, 4 cua, 4 ghẹ, 3 sò, 2 hàu, 1 mực = 30
const TYPE_ORDER = [
  ...Array(10).fill('tom-hum-xanh'),
  ...Array(6).fill('tom-hum-bong'),
  ...Array(4).fill('cua'),
  ...Array(4).fill('ghe'),
  ...Array(3).fill('so'),
  ...Array(2).fill('hau'),
  'muc'
];
const AREAS = ['Thôn Hải Đông', 'Thôn Hải Minh', 'Thôn Hải Giang', 'Khu vực Hòn Khô', 'Khu vực Đầm Đề Gi gần bờ'];
const NOTES = [
  'Lồng bè hư hại nhẹ sau bão số 9, cần xuất bán sớm để sửa bè',
  'Hải sản đạt size thương phẩm, gia đình đang khôi phục lồng sau bão',
  'Bị thương lái ép giá còn 60% sau bão 2026, mong kết nối trực tiếp',
  'Cần bán gấp trước đợt gió mùa Đông Bắc tháng 11/2026',
  'Ưu tiên người mua đến tận bè Nhơn Hải, giá thương lượng thiện chí'
];

const FARMS = NAMES.map((ten, i) => {
  const slug = TYPE_ORDER[i];
  const type = TYPES.find((t) => t.slug === slug);
  return {
    id: i + 1,
    ten,
    loai: type.ten,
    loaiSlug: slug,
    sanLuongKg: YIELD_BY_TYPE[slug] + (i % 5) * 10,
    giaMongMuon: PRICE_BY_TYPE[slug] + (i % 4) * 10000,
    sdt: '09' + String(12000000 + i * 13571).slice(0, 8),
    khuVuc: AREAS[i % AREAS.length] + ', xã Nhơn Hải, TP Quy Nhơn',
    tinhTrang: NOTES[i % NOTES.length]
  };
});

// Nhu cầu thu mua (lưu trong bộ nhớ tiến trình — demo, kèm localStorage phía client)
const PURCHASES = [];

app.get('/api/farms', (req, res) => {
  const { type, q } = req.query;
  let list = FARMS;
  if (type) {
    const t = String(type).toLowerCase();
    list = list.filter((f) => f.loaiSlug === t || f.loai.toLowerCase() === t);
  }
  if (q) {
    const kw = String(q).toLowerCase();
    list = list.filter((f) => f.ten.toLowerCase().includes(kw) || f.khuVuc.toLowerCase().includes(kw));
  }
  res.json({ ok: true, label: MOCK_LABEL, total: list.length, totalAll: FARMS.length, farms: list });
});

app.get('/api/farms/:id', (req, res) => {
  const farm = FARMS.find((f) => f.id === Number(req.params.id));
  if (!farm) return res.status(404).json({ ok: false, error: 'Không tìm thấy hộ nuôi' });
  res.json({ ok: true, label: MOCK_LABEL, farm });
});

app.get('/api/types', (req, res) => {
  res.json({
    ok: true,
    label: MOCK_LABEL,
    types: TYPES.map((t) => ({ ...t, soHo: FARMS.filter((f) => f.loaiSlug === t.slug).length }))
  });
});

app.post('/api/purchases', (req, res) => {
  const { tenNguoiMua, sdt, loai, soLuongKg, ghiChu } = req.body || {};
  if (!tenNguoiMua || !sdt || !loai || !soLuongKg) {
    return res.status(400).json({ ok: false, error: 'Vui lòng điền đủ: họ tên, SĐT, loại hải sản, số lượng (kg).' });
  }
  if (!/^[0-9+\s.()-]{8,15}$/.test(String(sdt))) {
    return res.status(400).json({ ok: false, error: 'Số điện thoại không hợp lệ.' });
  }
  const qty = Number(soLuongKg);
  if (!Number.isFinite(qty) || qty <= 0) {
    return res.status(400).json({ ok: false, error: 'Số lượng phải là số dương (kg).' });
  }
  const entry = {
    id: PURCHASES.length + 1,
    tenNguoiMua: String(tenNguoiMua).slice(0, 120),
    sdt: String(sdt).slice(0, 20),
    loai: String(loai).slice(0, 60),
    soLuongKg: qty,
    ghiChu: String(ghiChu || '').slice(0, 500),
    createdAt: new Date().toISOString()
  };
  PURCHASES.push(entry);
  res.status(201).json({ ok: true, message: 'Đã ghi nhận nhu cầu thu mua. HTK sẽ kết nối với hộ nuôi Nhơn Hải.', purchase: entry });
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true, project: 'binhdinh-seafood-connect', author: 'HTK', hotline: '0396241674', updated: '2026-11-09' });
});

// API 404 (JSON)
app.use('/api', (req, res) => {
  res.status(404).json({ ok: false, error: 'API không tồn tại', hotlineHTK: '0396241674' });
});

// Static React build + SPA fallback (React Router handles /about, 404...)
const distDir = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(distDir));
app.get('*', (req, res) => {
  const indexFile = path.join(distDir, 'index.html');
  if (fs.existsSync(indexFile)) return res.sendFile(indexFile);
  res
    .status(503)
    .send('Chưa build client. Chạy: npm run build — HTK 0396241674');
});

module.exports = app;

// Chạy local: node api/index.js
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Seafood Connect chay tai http://localhost:${port} — HTK 0396241674`));
}