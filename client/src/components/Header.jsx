import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <NavLink to="/" className="brand">
          <span className="brand-icon" aria-hidden="true">🦞</span>
          <span>
            Tôm hùm Nhơn Hải
            <small>Kết nối tiêu thụ · Bình Định 2026</small>
          </span>
        </NavLink>
        <nav className="nav">
          <NavLink to="/" end>Trang chủ</NavLink>
          <NavLink to="/directory">Hộ nuôi</NavLink>
          <NavLink to="/purchase">Thu mua</NavLink>
          <NavLink to="/about">Giới thiệu</NavLink>
        </nav>
        <a className="btn-hotline" href="tel:0396241674">📞 Liên hệ HTK</a>
      </div>
    </header>
  );
}