"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative flex h-[92vh] min-h-[560px] w-full items-end overflow-hidden bg-gradient-to-br from-[#3a3a3a] to-[#111111]">
      <div className="absolute inset-0 bg-black/10" />
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto w-full max-w-[1320px] px-5 pb-16 text-white md:px-10 md:pb-24"
      >
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/70">
          New Season
        </p>
        <h1 className="max-w-xl text-4xl leading-tight tracking-wide md:text-6xl">
          Soft Confidence
        </h1>
        <p className="mt-4 max-w-md text-sm text-white/80 md:text-base">
          Bộ sưu tập mới cho phiên bản tự tin, dịu dàng của bạn.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/collections/all"
            className="bg-white px-7 py-3 text-sm font-medium tracking-wide text-[var(--primary)] transition-transform hover:scale-[1.03]"
          >
            Mua ngay
          </Link>
          <Link
            href="/collections/soft-confidence"
            className="border border-white/70 px-7 py-3 text-sm font-medium tracking-wide text-white transition-transform hover:scale-[1.03]"
          >
            Xem bộ sưu tập
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
