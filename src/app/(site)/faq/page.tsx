"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

const faqs = [
  {
    q: "Làm sao để chọn size phù hợp?",
    a: "Bạn có thể tham khảo bảng size chi tiết ở từng sản phẩm, hoặc liên hệ đội ngũ tư vấn của AfterSix qua trang Liên hệ để được hỗ trợ chọn size chính xác nhất.",
  },
  {
    q: "Thời gian giao hàng là bao lâu?",
    a: "Đơn hàng nội thành thường giao trong 1–2 ngày, các tỉnh thành khác từ 2–4 ngày làm việc kể từ khi xác nhận đơn.",
  },
  {
    q: "Chính sách đổi trả như thế nào?",
    a: "AfterSix hỗ trợ đổi trả miễn phí trong vòng 7 ngày kể từ khi nhận hàng, với điều kiện sản phẩm còn nguyên tem mác, chưa qua sử dụng.",
  },
  {
    q: "Tôi có thể thanh toán bằng hình thức nào?",
    a: "Chúng tôi hỗ trợ thanh toán khi nhận hàng (COD) và chuyển khoản ngân hàng.",
  },
  {
    q: "Làm sao để theo dõi đơn hàng của tôi?",
    a: "Sau khi đặt hàng thành công, bạn sẽ nhận được email/SMS xác nhận kèm thông tin theo dõi đơn hàng.",
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-[820px] px-5 py-16 md:px-10 md:py-24">
      <Reveal className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--secondary)]">Hỗ trợ</p>
        <h1 className="mt-2 text-4xl tracking-wide">Câu hỏi thường gặp</h1>
      </Reveal>

      <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {faqs.map((item, i) => (
          <Reveal key={item.q} delay={i * 0.05}>
            <button
              className="flex w-full items-center justify-between py-5 text-left"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="text-sm font-medium md:text-base">{item.q}</span>
              <span className="text-lg">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <p className="pb-5 text-sm leading-relaxed text-[var(--secondary)]">{item.a}</p>
            )}
          </Reveal>
        ))}
      </div>
    </div>
  );
}
