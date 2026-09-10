import Link from "next/link";
// import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      {/* <Newsletter /> */}
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-14 md:grid-cols-4 md:px-10">
        <div>
          <p className="text-lg font-semibold tracking-[0.18em]">AFTERSIX</p>
          <p className="mt-3 max-w-[220px] text-sm text-[var(--secondary)]">
            Thời trang nữ tối giản, thanh lịch, dành cho phiên bản tự tin nhất của bạn.
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-medium">Mua sắm</p>
          <ul className="space-y-2 text-sm text-[var(--secondary)]">
            <li><Link href="/collections/all" className="hover:text-[var(--primary)]">Tất cả sản phẩm</Link></li>
            <li><Link href="/collections" className="hover:text-[var(--primary)]">Bộ sưu tập</Link></li>
            <li><Link href="/cart" className="hover:text-[var(--primary)]">Giỏ hàng</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-medium">Hỗ trợ</p>
          <ul className="space-y-2 text-sm text-[var(--secondary)]">
            <li><Link href="/policies/shipping" className="hover:text-[var(--primary)]">Chính sách giao hàng</Link></li>
            <li><Link href="/policies/returns" className="hover:text-[var(--primary)]">Chính sách đổi trả</Link></li>
            <li><Link href="/faq" className="hover:text-[var(--primary)]">Câu hỏi thường gặp</Link></li>
            <li><Link href="/contact" className="hover:text-[var(--primary)]">Liên hệ</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-medium">Về AfterSix</p>
          <ul className="space-y-2 text-sm text-[var(--secondary)]">
            <li><Link href="/about" className="hover:text-[var(--primary)]">Câu chuyện thương hiệu</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--border)] px-5 py-6 text-center text-xs text-[var(--secondary)] md:px-10">
        © {new Date().getFullYear()} AfterSix. All rights reserved.
        <p className="mt-1">Phiên bản 0.1.0</p>
      </div>
    </footer>
  );
}
