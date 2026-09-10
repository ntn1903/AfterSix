"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-[720px] px-5 py-16 md:px-10 md:py-24">
      <Reveal className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--secondary)]">Liên hệ</p>
        <h1 className="mt-2 text-4xl tracking-wide">Chúng tôi luôn lắng nghe bạn</h1>
        <p className="mt-3 text-sm text-[var(--secondary)]">
          Có câu hỏi về sản phẩm hoặc đơn hàng? Gửi tin nhắn cho AfterSix nhé.
        </p>
      </Reveal>

      {sent ? (
        <Reveal className="border border-[var(--border)] p-8 text-center">
          <p className="text-sm">
            Cảm ơn bạn đã liên hệ! AfterSix sẽ phản hồi trong vòng 24 giờ làm việc.
          </p>
        </Reveal>
      ) : (
        <Reveal>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <input required placeholder="Họ và tên" className="w-full border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm outline-none focus:border-[var(--primary)]" />
            <input required type="email" placeholder="Email" className="w-full border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm outline-none focus:border-[var(--primary)]" />
            <textarea required rows={5} placeholder="Nội dung" className="w-full border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm outline-none focus:border-[var(--primary)]" />
            <button type="submit" className="bg-[var(--primary)] px-7 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02]">
              Gửi liên hệ
            </button>
          </form>
        </Reveal>
      )}
    </div>
  );
}
