"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { categoryLabels } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductTable({ products }: { products: Product[] }) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleDelete = async (product: Product) => {
    if (!window.confirm(`Xóa sản phẩm "${product.name}"? Hành động này không thể hoàn tác.`)) {
      return;
    }
    setPendingId(product.id);
    setError("");
    const res = await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" });
    setPendingId(null);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error || "Không thể xóa sản phẩm.");
      return;
    }
    router.refresh();
  };

  if (products.length === 0) {
    return <p className="text-sm text-[var(--secondary)]">Chưa có sản phẩm nào.</p>;
  }

  return (
    <div>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      <div className="overflow-x-auto border border-[var(--border)]">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-[var(--border)] bg-[var(--background)] text-xs uppercase tracking-wide text-[var(--secondary)]">
            <tr>
              <th className="px-4 py-3">Ảnh</th>
              <th className="px-4 py-3">Tên sản phẩm</th>
              <th className="px-4 py-3">Loại</th>
              <th className="px-4 py-3">Giá</th>
              <th className="px-4 py-3">Nổi bật</th>
              <th className="px-4 py-3 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-[var(--border)] last:border-0">
                <td className="px-4 py-3">
                  <div className="relative h-14 w-14 overflow-hidden bg-[var(--background)]">
                    {p.image ? (
                      <Image src={p.image} alt={p.name} fill className="object-cover" />
                    ) : (
                      <div className={`h-full w-full bg-gradient-to-br ${p.tone}`} />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-[var(--secondary)]">{p.slug}</p>
                </td>
                <td className="px-4 py-3">{categoryLabels[p.category]}</td>
                <td className="px-4 py-3">{formatPrice(p.price)}</td>
                <td className="px-4 py-3 text-xs text-[var(--secondary)]">
                  {[p.isNew && "Mới", p.isBestSeller && "Best Seller"].filter(Boolean).join(" · ") || "—"}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/products/${p.id}`} className="mr-4 underline-offset-4 hover:underline">
                    Sửa
                  </Link>
                  <button
                    onClick={() => handleDelete(p)}
                    disabled={pendingId === p.id}
                    className="text-red-600 hover:underline disabled:opacity-50"
                  >
                    {pendingId === p.id ? "Đang xóa..." : "Xóa"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
