import { useEffect, useState } from 'react';

const LS_KEY = 'seafood-connect-purchases';

export default function Purchase() {
  const [types, setTypes] = useState([]);
  const [form, setForm] = useState({ tenNguoiMua: '', sdt: '', loai: '', soLuongKg: '', ghiChu: '' });
  const [status, setStatus] = useState({ kind: '', msg: '' });
  const [sending, setSending] = useState(false);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    fetch('/api/types')
      .then((r) => r.json())
      .then((d) => setTypes(d.types || []))
      .catch(() => {});
    try {
      setSaved(JSON.parse(localStorage.getItem(LS_KEY) || '[]'));
    } catch {
      setSaved([]);
    }
  }, []);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const saveLocal = (entry) => {
    const next = [entry, ...saved].slice(0, 20);
    setSaved(next);
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(next));
    } catch {
      /* localStorage đầy hoặc bị chặn — bỏ qua */
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ kind: '', msg: '' });
    if (!form.tenNguoiMua.trim() || !form.sdt.trim() || !form.loai || !(Number(form.soLuongKg) > 0)) {
      setStatus({ kind: 'error', msg: 'Vui lòng điền đủ họ tên, SĐT, loại hải sản và số lượng (kg) lớn hơn 0.' });
      return;
    }
    setSending(true);
    const entry = { ...form, soLuongKg: Number(form.soLuongKg), createdAt: new Date().toISOString() };
    try {
      const res = await fetch('/api/purchases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'HTTP ' + res.status);
      saveLocal(entry);
      setStatus({ kind: 'success', msg: '✅ ' + data.message + ' Cần gấp: gọi/Zalo HTK 0396241674.' });
      setForm({ tenNguoiMua: '', sdt: '', loai: '', soLuongKg: '', ghiChu: '' });
    } catch (err) {
      // API không khả dụng → lưu localStorage làm phương án dự phòng
      saveLocal(entry);
      setStatus({
        kind: 'success',
        msg: 'Đã lưu nhu cầu trên trình duyệt của bạn (chế độ ngoại tuyến). Vui lòng gọi/Zalo HTK 0396241674 để được kết nối ngay.'
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container narrow">
      <h1>Gửi nhu cầu thu mua</h1>
      <p>
        Dành cho nhà hàng, thương lái, cá nhân muốn mua hải sản trực tiếp từ hộ nuôi Nhơn Hải
        với giá công bằng sau bão 2026. HTK sẽ xác minh và kết nối trong 24 giờ.
      </p>
      <p className="mock-label">Dữ liệu mô phỏng – cập nhật 09/11/2026</p>

      <form className="card form" onSubmit={submit}>
        <label>
          Họ và tên người mua *
          <input value={form.tenNguoiMua} onChange={update('tenNguoiMua')} placeholder="VD: Nhà hàng Hải Sản Quy Nhơn" required />
        </label>
        <label>
          Số điện thoại liên hệ *
          <input value={form.sdt} onChange={update('sdt')} placeholder="VD: 09xxxxxxxx" required />
        </label>
        <label>
          Loại hải sản muốn mua *
          <select value={form.loai} onChange={update('loai')} required>
            <option value="">-- Chọn loại hải sản --</option>
            {types.map((t) => (
              <option key={t.slug} value={t.ten}>{t.ten}</option>
            ))}
            <option value="Khác">Khác (ghi rõ ở ghi chú)</option>
          </select>
        </label>
        <label>
          Số lượng dự kiến (kg) *
          <input type="number" min="1" step="1" value={form.soLuongKg} onChange={update('soLuongKg')} placeholder="VD: 50" required />
        </label>
        <label>
          Ghi chú (thời gian nhận, địa điểm, yêu cầu size...)
          <textarea rows="3" value={form.ghiChu} onChange={update('ghiChu')} placeholder="VD: nhận hàng tại cầu Nhơn Hải sáng 12/11/2026, tôm size 0.8–1 kg/con" />
        </label>
        <button className="btn" type="submit" disabled={sending}>
          {sending ? 'Đang gửi...' : 'Gửi nhu cầu thu mua'}
        </button>
        {status.msg && <p className={status.kind === 'error' ? 'error' : 'success'}>{status.msg}</p>}
      </form>

      {saved.length > 0 && (
        <section className="card">
          <h2>Nhu cầu đã lưu trên trình duyệt ({saved.length})</h2>
          <ul className="saved-list">
            {saved.map((s, i) => (
              <li key={i}>
                <strong>{s.loai}</strong> — {s.soLuongKg} kg · {s.tenNguoiMua} · {s.sdt}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}