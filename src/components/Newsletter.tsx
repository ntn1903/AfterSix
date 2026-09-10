"use client";

import { useState } from "react";
import Reveal from "./Reveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="border-b border-[var(--border)] bg-[var(--background)]">
      <Reveal className="mx-auto max-w-[1320px] px-5 py-14 text-center md:px-10">
        <h3 className="text-2xl tracking-wide md:text-3xl">Nhận ưu đãi & xu hướng mới</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-[var(--secondary)]">
          Đăng ký nhận email để cập nhật bộ sưu tập mới và ưu đãi độc quyền từ AfterSix.
        </p>
        {submitted ? (
          <p className="mt-6 text-sm font-medium text-[var(--primary)]">
            Cảm ơn bạn đã đăng ký! Hẹn gặp lại trong hộp thư của bạn ✨
          </p>
        ) : (
          <form
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) setSubmitted(true);
            }}
          >
            <input
              type="email"
              required
              placeholder="Email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full flex-1 border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm outline-none focus:border-[var(--primary)]"
            />
            <button
              type="submit"
              className="whitespace-nowrap bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Đăng ký
            </button>
          </form>
        )}
      </Reveal>
    </div>
  );
}
