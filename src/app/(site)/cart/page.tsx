"use client";

import Link from "next/link";
import Artwork from "@/components/Artwork";
import Reveal from "@/components/Reveal";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";

const SHIPPING_FEE = 30000;

export default function CartPage() {
  const { lines, removeItem, updateQuantity, subtotal } = useCart();
  const shipping = lines.length > 0 ? SHIPPING_FEE : 0;

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-[1320px] px-5 py-24 text-center md:px-10">
        <Reveal>
          <h1 className="text-3xl tracking-wide">Giỏ hàng của bạn đang trống</h1>
          <p className="mt-3 text-sm text-[var(--secondary)]">
            Hãy khám phá các bộ sưu tập mới nhất của AfterSix.
          </p>
          <Link
            href="/collections/all"
            className="mt-8 inline-block bg-[var(--primary)] px-7 py-3 text-sm font-medium text-white"
          >
            Tiếp tục mua sắm
          </Link>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1320px] px-5 py-12 md:px-10 md:py-16">
      <Reveal>
        <h1 className="mb-8 text-3xl tracking-wide">Giỏ hàng</h1>
      </Reveal>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {lines.map((line, i) => (
              <Reveal
                key={`${line.slug}-${line.color}-${line.size}`}
                delay={i * 0.05}
                className="flex gap-4 py-5"
              >
                <Artwork tone={line.tone} image={line.image} category={line.category} ratio="square" className="w-24 shrink-0" />
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link href={`/products/${line.slug}`} className="text-sm font-medium hover:underline">
                        {line.name}
                      </Link>
                      <p className="mt-1 text-xs text-[var(--secondary)]">
                        Màu: {line.color} · Size: {line.size}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(line.slug, line.color, line.size)}
                      className="text-xs text-[var(--secondary)] hover:text-[var(--primary)]"
                    >
                      Xóa
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(line.slug, line.color, line.size, line.quantity - 1)}
                        className="h-8 w-8 border border-[var(--border)] text-sm hover:border-[var(--primary)]"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm">{line.quantity}</span>
                      <button
                        onClick={() => updateQuantity(line.slug, line.color, line.size, line.quantity + 1)}
                        className="h-8 w-8 border border-[var(--border)] text-sm hover:border-[var(--primary)]"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm">{formatPrice(line.price * line.quantity)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="border border-[var(--border)] p-6">
            <h2 className="mb-4 text-lg tracking-wide">Tổng đơn hàng</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[var(--secondary)]">
                <span>Tạm tính</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[var(--secondary)]">
                <span>Phí vận chuyển</span>
                <span>{formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between border-t border-[var(--border)] pt-3 text-base font-medium">
                <span>Tổng cộng</span>
                <span>{formatPrice(subtotal + shipping)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="mt-6 block w-full bg-[var(--primary)] py-3 text-center text-sm font-medium text-white transition-transform hover:scale-[1.01]"
            >
              Tiến hành thanh toán
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
