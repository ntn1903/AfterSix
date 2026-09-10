"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { categoryLabels } from "@/lib/data";
import type { Product, ProductCategory } from "@/lib/types";

type SortKey = "newest" | "bestseller" | "price-asc" | "price-desc";

const allColors = (products: Product[]) =>
  Array.from(new Set(products.flatMap((p) => p.colors)));

const allSizes = (products: Product[]) =>
  Array.from(new Set(products.flatMap((p) => p.sizes))).sort();

export default function CollectionBrowser({
  title,
  subtitle,
  products,
}: {
  title: string;
  subtitle?: string;
  products: Product[];
}) {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [color, setColor] = useState<string | "all">("all");
  const [size, setSize] = useState<string | "all">("all");
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [sort, setSort] = useState<SortKey>(
    (searchParams.get("sort") as SortKey) || "newest"
  );

  const colors = useMemo(() => allColors(products), [products]);
  const sizes = useMemo(() => allSizes(products), [products]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price <= maxPrice);
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (color !== "all") list = list.filter((p) => p.colors.includes(color));
    if (size !== "all") list = list.filter((p) => p.sizes.includes(size));

    switch (sort) {
      case "bestseller":
        list = [...list].sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller));
        break;
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      default:
        list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew));
    }
    return list;
  }, [products, category, color, size, maxPrice, sort]);

  return (
    <div className="mx-auto max-w-[1320px] px-5 py-12 md:px-10 md:py-16">
      <Reveal className="mb-10">
        <h1 className="text-3xl tracking-wide md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-[var(--secondary)]">{subtitle}</p>}
      </Reveal>

      <div className="mb-8 flex flex-col gap-4 border-y border-[var(--border)] py-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ProductCategory | "all")}
            className="border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
          >
            <option value="all">Tất cả loại</option>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
          >
            <option value="all">Tất cả màu</option>
            {colors.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
          >
            <option value="all">Tất cả size</option>
            {sizes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-sm text-[var(--secondary)]">
            Giá tối đa
            <input
              type="range"
              min={300000}
              max={2000000}
              step={50000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </label>
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
        >
          <option value="newest">Mới nhất</option>
          <option value="bestseller">Bán chạy</option>
          <option value="price-asc">Giá tăng dần</option>
          <option value="price-desc">Giá giảm dần</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-[var(--secondary)]">
          Không tìm thấy sản phẩm phù hợp bộ lọc.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.06}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
