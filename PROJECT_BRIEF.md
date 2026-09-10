# PROJECT BRIEF — Website Kinh Doanh Áo Quần Nữ

## 1) Tổng quan dự án
- **Tên dự án**: AfterSix
- **Mục tiêu**: Xây dựng website bán áo quần nữ với trải nghiệm cao cấp, tối giản, tập trung vào hình ảnh sản phẩm và cảm xúc thương hiệu.
- **Đối tượng khách hàng**:
  - Nữ 18–35 tuổi
  - Yêu thích thời trang tối giản, thanh lịch
  - Mua sắm qua mobile là chính

---

## 2) Định hướng thẩm mỹ (theo ảnh mẫu)
Website theo phong cách:
- **Minimal / Editorial / Premium**
- Tông màu trung tính: trắng, kem, be, xám, đen
- Bố cục nhiều khoảng trắng (white space)
- Ảnh lớn, chiếm diện tích chính
- Font chữ hiện đại, mảnh, dễ đọc
- Trình bày giống một lookbook/tạp chí hơn là sàn TMĐT dày đặc thông tin

### Từ khóa thương hiệu
`Elegant` · `Modern` · `Calm` · `Natural` · `Refined`

---

## 3) Cấu trúc website đề xuất

## 3.1 Trang chủ (Home)
- Hero banner toàn màn hình:
  - Ảnh campaign mới
  - Heading ngắn (VD: “New Season, Soft Confidence”)
  - CTA: “Mua ngay”, “Xem bộ sưu tập”
- Khối “Bộ sưu tập nổi bật” (grid 2–4 cột)
- Khối “Sản phẩm mới về”
- Khối “Best Sellers”
- Khối “Brand Story” ngắn + ảnh lifestyle
- Khối feedback / Instagram feed
- Footer đầy đủ

## 3.2 Trang danh mục (Collection / Category)
- Bộ lọc:
  - Loại sản phẩm (áo, váy, quần, set)
  - Màu sắc
  - Size
  - Khoảng giá
- Sắp xếp:
  - Mới nhất
  - Bán chạy
  - Giá tăng/giảm
- Product grid 2 cột (mobile), 3–4 cột (desktop)

## 3.3 Trang chi tiết sản phẩm (PDP)
- Gallery ảnh lớn (zoom được)
- Tên sản phẩm, giá, mô tả ngắn
- Chọn size/màu
- Nút “Thêm vào giỏ”, “Mua ngay”
- Chính sách đổi trả/vận chuyển ngắn gọn
- Gợi ý sản phẩm liên quan

## 3.4 Giỏ hàng / Thanh toán
- Giỏ hàng đơn giản, rõ phí ship/tổng tiền
- Checkout nhanh (ít bước)
- Hỗ trợ mã giảm giá

## 3.5 Trang tĩnh
- Giới thiệu thương hiệu
- Chính sách đổi trả
- Chính sách giao hàng
- Câu hỏi thường gặp (FAQ)
- Liên hệ

---

## 4) UI Style Guide sơ bộ

## 4.1 Màu sắc
- Primary: `#111111`
- Secondary: `#6F6F6F`
- Background: `#F7F6F3`
- Surface: `#FFFFFF`
- Border: `#E8E8E8`
- Accent nhẹ (nếu cần): `#C8B9A6`

## 4.2 Typography
- Heading: font sans-serif hiện đại (VD: Inter / Manrope / Helvetica Neue)
- Body: sans-serif dễ đọc
- Tỉ lệ:
  - H1: 48–64
  - H2: 32–40
  - H3: 24–28
  - Body: 16–18
  - Caption: 12–14

## 4.3 Spacing & Layout
- Grid desktop: 12 cột
- Container max-width: 1200–1320px
- Khoảng cách section: 80–120px (desktop), 40–64px (mobile)
- Border radius: nhỏ hoặc không dùng (giữ cảm giác editorial)

## 4.4 Thành phần UI chính
- Header trong suốt/solid theo scroll
- Mega menu tối giản
- Card sản phẩm ít chi tiết
- Button dạng phẳng, chữ rõ
- Hover effect nhẹ (fade/scale nhỏ)

## 4.5 Định hướng giao diện & Animation
- Giao diện thân thiện, tối giản nhưng **catchy**, phù hợp gu thẩm mỹ của giới trẻ (Gen Z/Millennials)
- Mọi section trên trang đều có **animation khi scroll** (scroll-triggered animation):
  - Fade-in + slide-up nhẹ khi section xuất hiện trong viewport
  - Ảnh/hình khối có hiệu ứng reveal (mask/scale nhẹ) khi cuộn tới
  - Số liệu/text nổi bật có thể có hiệu ứng đếm số hoặc typing nhẹ
  - Micro-interaction khi hover/tap (scale nhỏ, đổi màu mượt)
- Animation cần **tinh tế, mượt (easing tự nhiên), thời lượng ngắn (200–500ms)**, tránh gây rối mắt hoặc làm chậm trải nghiệm
- Ưu tiên dùng thư viện animation nhẹ, tối ưu hiệu năng (VD: Framer Motion, GSAP + ScrollTrigger, AOS)
- Tôn trọng `prefers-reduced-motion` để đảm bảo accessibility

---

## 5) Trải nghiệm người dùng (UX)
- Ưu tiên tốc độ tải trang (ảnh WebP, lazy load)
- Tối ưu mobile-first
- Điều hướng đơn giản, ít phân tâm
- CTA rõ ràng ở mọi trang chính
- Search dễ dùng, có gợi ý

---

## 6) Tính năng cần có (MVP)
- Quản lý sản phẩm, danh mục, tồn kho
- Bộ lọc + tìm kiếm sản phẩm
- Giỏ hàng + checkout
- Đăng nhập/đăng ký
- Mã giảm giá cơ bản
- Quản lý đơn hàng
- Form liên hệ
- Tích hợp pixel/analytics

---

## 7) Tech gợi ý
- **Frontend**: Next.js + Tailwind CSS
- **Backend**: Node.js (hoặc headless commerce)
- **Database**: PostgreSQL / MySQL
- **CMS quản trị**: Strapi / Shopify headless (tùy mô hình)
- **Deploy**: Vercel

---

## 8) SEO & Marketing
- URL thân thiện SEO
- Metadata cho từng sản phẩm
- Schema Product
- Blog chia sẻ phối đồ / xu hướng
- Tích hợp Facebook Pixel + GA4
- Thu thập email (popup/section đăng ký nhận tin)

---

## 9) Nội dung & Hình ảnh
- Chụp ảnh theo tone:
  - Ánh sáng mềm
  - Nền trung tính
  - Khung hình rộng, thoáng
- Bố cục ảnh ưu tiên:
  - 70% lifestyle
  - 30% cận chi tiết sản phẩm
- Copywriting ngắn, tinh tế, giàu cảm xúc

---

## 10) Kế hoạch triển khai
- **Phase 1 (1–2 tuần)**: Wireframe + UI concept
- **Phase 2 (2–3 tuần)**: Code frontend + backend cơ bản
- **Phase 3 (1 tuần)**: QA + tối ưu tốc độ + SEO on-page
- **Phase 4**: Go-live + theo dõi chuyển đổi

---

## 11) KPI đề xuất
- Tỉ lệ chuyển đổi (CR)
- Add-to-cart rate
- Tỉ lệ bỏ giỏ
- AOV (giá trị đơn hàng trung bình)
- Tốc độ tải trang (Core Web Vitals)

---

## 12) Ghi chú cho team design/dev
- Giữ tinh thần **“ít nhưng chất”**, tối giản nhưng vẫn catchy, gần gũi với giới trẻ
- Animation dùng để tăng cảm xúc và sự thu hút (mọi section có scroll animation), nhưng cần tinh tế, tránh màu sắc/animation quá mạnh gây rối mắt
- Ưu tiên trải nghiệm hình ảnh như lookbook, kết hợp chuyển động mượt khi cuộn trang
- Luôn test trên mobile trước desktop

---
**Tài liệu này là bản định hướng ban đầu, có thể cập nhật theo chiến lược thương hiệu và sản phẩm thực tế.**