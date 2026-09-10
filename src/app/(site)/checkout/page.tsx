"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";

const SHIPPING_FEE = 30000;

export default function CheckoutPage() {
  const { lines, subtotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);

  const shipping = lines.length > 0 ? SHIPPING_FEE : 0;
  const total = subtotal + shipping - discount;

  const applyPromo = () => {
    if (promo.trim().toUpperCase() === "AFTERSIX10") {
      setDiscount(Math.round(subtotal * 0.1));
    } else {
      setDiscount(0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-[720px] px-5 py-24 text-center md:px-10">
        <Reveal>
          <h1 className="text-3xl tracking-wide">Cảm ơn bạn đã đặt hàng! 🎉</h1>
          <p className="mt-3 text-sm text-[var(--secondary)]">
            Đơn hàng của bạn đã được ghi nhận. AfterSix sẽ liên hệ xác nhận trong thời gian sớm nhất.
          </p>
          <Link href="/collections/all" className="mt-8 inline-block bg-[var(--primary)] px-7 py-3 text-sm font-medium text-white">
            Tiếp tục mua sắm
          </Link>
        </Reveal>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-[720px] px-5 py-24 text-center md:px-10">
        <h1 className="text-2xl tracking-wide">Giỏ hàng trống</h1>
        <Link href="/collections/all" className="mt-6 inline-block underline">
          Quay lại mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1320px] px-5 py-12 md:px-10 md:py-16">
      <Reveal>
        <h1 className="mb-8 text-3xl tracking-wide">Thanh toán</h1>
      </Reveal>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="mb-3 text-lg tracking-wide">Thông tin giao hàng</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input required placeholder="Họ và tên" className="border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm outline-none focus:border-[var(--primary)]" />
                <input required type="tel" placeholder="Số điện thoại" className="border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm outline-none focus:border-[var(--primary)]" />
                <input required type="email" placeholder="Email" className="sm:col-span-2 border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm outline-none focus:border-[var(--primary)]" />
                <input required placeholder="Địa chỉ" className="sm:col-span-2 border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm outline-none focus:border-[var(--primary)]" />
                <input placeholder="Ghi chú (tuỳ chọn)" className="sm:col-span-2 border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm outline-none focus:border-[var(--primary)]" />
              </div>
            </div>

            <div>
              <h2 className="mb-3 text-lg tracking-wide">Phương thức thanh toán</h2>
              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2 border border-[var(--border)] px-4 py-3">
                  <input type="radio" name="payment" defaultChecked /> Thanh toán khi nhận hàng (COD)
                </label>
                <label className="flex items-center gap-2 border border-[var(--border)] px-4 py-3">
                  <input type="radio" name="payment" /> Chuyển khoản ngân hàng
                </label>
              </div>
            </div>
          </form>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border border-[var(--border)] p-6">
            <h2 className="mb-4 text-lg tracking-wide">Đơn hàng ({lines.length})</h2>
            <div className="mb-4 space-y-2 text-sm">
              {lines.map((l) => (
                <div key={`${l.slug}-${l.color}-${l.size}`} className="flex justify-between text-[var(--secondary)]">
                  <span>{l.name} × {l.quantity}</span>
                  <span>{formatPrice(l.price * l.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="mb-4 flex gap-2">
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Mã giảm giá"
                className="flex-1 border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
              />
              <button type="button" onClick={applyPromo} className="border border-[var(--primary)] px-4 py-2 text-sm hover:bg-[var(--primary)] hover:text-white">
                Áp dụng
              </button>
            </div>

            <div className="space-y-2 border-t border-[var(--border)] pt-3 text-sm">
              <div className="flex justify-between text-[var(--secondary)]">
                <span>Tạm tính</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[var(--secondary)]">
                <span>Phí vận chuyển</span>
                <span>{formatPrice(shipping)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[var(--secondary)]">
                  <span>Giảm giá</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-[var(--border)] pt-3 text-base font-medium">
                <span>Tổng cộng</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              className="mt-6 w-full bg-[var(--primary)] py-3 text-sm font-medium text-white transition-transform hover:scale-[1.01]"
            >
              Đặt hàng
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
