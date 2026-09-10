"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/types";

export default function ProductOptions({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  const handleAdd = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      color,
      size,
      tone: product.tone,
      category: product.category,
      image: product.image,
      quantity,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = () => {
    handleAdd();
    router.push("/cart");
  };

  return (
    <div className="mt-6">
      <div className="mb-5">
        <p className="mb-2 text-sm font-medium">Màu sắc</p>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`border px-3 py-1.5 text-sm transition-colors ${
                color === c
                  ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                  : "border-[var(--border)] hover:border-[var(--primary)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <p className="mb-2 text-sm font-medium">Size</p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`h-10 w-10 border text-sm transition-colors ${
                size === s
                  ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                  : "border-[var(--border)] hover:border-[var(--primary)]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-2 text-sm font-medium">Số lượng</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="h-9 w-9 border border-[var(--border)] hover:border-[var(--primary)]"
          >
            −
          </button>
          <span className="w-6 text-center text-sm">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="h-9 w-9 border border-[var(--border)] hover:border-[var(--primary)]"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleAdd}
          className="flex-1 min-w-[160px] border border-[var(--primary)] px-6 py-3 text-sm font-medium tracking-wide transition-colors hover:bg-[var(--primary)] hover:text-white"
        >
          Thêm vào giỏ
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleBuyNow}
          className="flex-1 min-w-[160px] bg-[var(--primary)] px-6 py-3 text-sm font-medium tracking-wide text-white transition-transform hover:scale-[1.01]"
        >
          Mua ngay
        </motion.button>
      </div>

      <AnimatePresence>
        {added && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-sm text-[var(--primary)]"
          >
            Đã thêm vào giỏ hàng ✓
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
