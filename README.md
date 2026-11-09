# 🦞 binhdinh-seafood-connect — Kết nối tôm hùm Nhơn Hải

Kết nối trực tiếp người mua với các hộ nuôi tôm hùm tại xã Nhơn Hải (TP Quy Nhơn, Bình Định), giúp người nuôi **không bị ép giá sau bão 2026**.

## Vấn đề (mùa mưa lũ 2026)

Tháng 10–11/2026, bão số 9 và số 10 đổ bộ Quy Nhơn – Phù Cát – Hoài Nhơn, lũ sông Kôn dâng cao, mất điện diện rộng 3–7 ngày, biển động cấp 7–8. Lồng bè tôm hùm Nhơn Hải hư hại, người nuôi phải bán tháo và bị thương lái ép giá xuống chỉ còn 50–60% giá thị trường. Dự án minh bạch hóa sản lượng – giá mong muốn của 30 hộ nuôi và mở kênh thu mua trực tiếp trong mùa mưa lũ 2026.

> **Dữ liệu mô phỏng – cập nhật 09/11/2026.** Toàn bộ tên hộ nuôi và số điện thoại trong danh bạ là dữ liệu giả lập phục vụ demo.

## Tính năng

- **Trang chủ**: bối cảnh Bình Định 2026, số liệu tổng quan, kêu gọi thu mua.
- **Danh bạ hộ nuôi** (`/directory`): 30 hộ, bộ lọc theo loại hải sản (tôm hùm xanh, tôm hùm bông, cua, ghẹ, sò, hàu, mực) + tìm kiếm theo tên/khu vực.
- **Form thu mua** (`/purchase`): gửi nhu cầu → `POST /api/purchases`, lưu dự phòng localStorage khi API ngoại tuyến.
- **Giới thiệu** (`/about`): bối cảnh mùa lũ 2026 + block liên hệ HTK.
- **Trang 404** SPA có hotline HTK.
- Responsive 375px (mobile) và 1440px (desktop), UI tiếng Việt.

## Công nghệ

- Backend: **Node.js + Express** — JSON API (`GET /api/farms?type=&q=`, `GET /api/farms/:id`, `GET /api/types`, `POST /api/purchases`, `GET /api/health`).
- Frontend: **React 18 + Vite + react-router-dom** (thư mục `client/`), được Express serve tĩnh + SPA fallback.
- Deploy: **Vercel** (`@vercel/node`, rewrite `/(.*)` → `/api/index?__path=$1`, `includeFiles: client/dist/**`).

## Cách chạy local

```bash
npm install          # cài Express (root)
npm run build        # cài deps client + build React vào client/dist
npm start            # http://localhost:3000
```

Dev frontend (tùy chọn, proxy /api về cổng 3000):

```bash
npm start                          # terminal 1: Express
npm run dev --prefix client        # terminal 2: Vite http://localhost:5173
```

## Deploy

- Vercel production: xem `deploy_url.txt` — https://binhdinh-seafood-connect.vercel.app
- GitHub: https://github.com/shirmtry/binhdinh-seafood-connect

## 📞 Liên hệ HTK – 0396241674 – 09/11/2026

- © 2026 HTK · Hotline/Zalo: [0396241674](tel:0396241674) · Zalo: https://zalo.me/0396241674
- Email: [htk.contact@gmail.com](mailto:htk.contact@gmail.com)
- Cập nhật: 09/11/2026