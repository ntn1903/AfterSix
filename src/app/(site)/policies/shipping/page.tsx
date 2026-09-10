import Reveal from "@/components/Reveal";

export const metadata = { title: "Chính sách giao hàng — AfterSix" };

export default function ShippingPolicyPage() {
  return (
    <div className="mx-auto max-w-[820px] px-5 py-16 md:px-10 md:py-24">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--secondary)]">Hỗ trợ</p>
        <h1 className="mt-2 text-4xl tracking-wide">Chính sách giao hàng</h1>
      </Reveal>
      <Reveal delay={0.08} className="mt-8 space-y-5 text-sm leading-relaxed text-[var(--secondary)]">
        <p>AfterSix giao hàng toàn quốc thông qua các đối tác vận chuyển uy tín.</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Nội thành TP.HCM/Hà Nội: 1–2 ngày làm việc.</li>
          <li>Các tỉnh thành khác: 2–4 ngày làm việc.</li>
          <li>Phí vận chuyển đồng giá 30.000đ, miễn phí cho đơn từ 1.000.000đ.</li>
          <li>Khách hàng có thể kiểm tra hàng trước khi thanh toán (COD).</li>
        </ul>
      </Reveal>
    </div>
  );
}
