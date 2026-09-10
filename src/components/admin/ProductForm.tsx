"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { categoryLabels, collections } from "@/lib/data";
import type { Product, ProductCategory } from "@/lib/types";

const TONE_OPTIONS = [
  { value: "from-[#EDE6DC] to-[#C8B9A6]", label: "Be ấm" },
  { value: "from-[#E7E5E1] to-[#A9A29A]", label: "Xám nhạt" },
  { value: "from-[#F2EFE9] to-[#CBBFA9]", label: "Kem" },
  { value: "from-[#3a3a3a] to-[#111111]", label: "Đen" },
];

export default function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const isEditing = Boolean(product);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(product?.image ?? null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const isNewInput = form.elements.namedItem("isNew") as HTMLInputElement;
    const isBestSellerInput = form.elements.namedItem("isBestSeller") as HTMLInputElement;
    formData.set("isNew", String(isNewInput.checked));
    formData.set("isBestSeller", String(isBestSellerInput.checked));

    const url = isEditing ? `/api/admin/products/${product!.id}` : "/api/admin/products";
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, { method, body: formData });
    setSubmitting(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error || "Có lỗi xảy ra, vui lòng thử lại.");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {error && (
        <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium">Tên sản phẩm</label>
        <input
          name="name"
          required
          defaultValue={product?.name}
          className="w-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm outline-none focus:border-[var(--primary)]"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Slug (URL, để trống sẽ tự tạo)</label>
        <input
          name="slug"
          defaultValue={product?.slug}
          placeholder="vd: ao-so-mi-lua-be"
          className="w-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm outline-none focus:border-[var(--primary)]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Giá (đ)</label>
          <input
            name="price"
            type="number"
            min={0}
            step={1000}
            required
            defaultValue={product?.price}
            className="w-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm outline-none focus:border-[var(--primary)]"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Giá gốc (tùy chọn)</label>
          <input
            name="compareAtPrice"
            type="number"
            min={0}
            step={1000}
            defaultValue={product?.compareAtPrice}
            className="w-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm outline-none focus:border-[var(--primary)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Loại sản phẩm</label>
          <select
            name="category"
            required
            defaultValue={product?.category ?? "ao"}
            className="w-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm outline-none focus:border-[var(--primary)]"
          >
            {(Object.keys(categoryLabels) as ProductCategory[]).map((key) => (
              <option key={key} value={key}>{categoryLabels[key]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Bộ sưu tập</label>
          <select
            name="collection"
            required
            defaultValue={product?.collection ?? collections[0].slug}
            className="w-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm outline-none focus:border-[var(--primary)]"
          >
            {collections.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Màu sắc (mỗi dòng một màu)</label>
          <textarea
            name="colors"
            rows={3}
            required
            defaultValue={product?.colors.join("\n")}
            className="w-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm outline-none focus:border-[var(--primary)]"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Size (mỗi dòng một size)</label>
          <textarea
            name="sizes"
            rows={3}
            required
            defaultValue={product?.sizes.join("\n")}
            className="w-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm outline-none focus:border-[var(--primary)]"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Mô tả</label>
        <textarea
          name="description"
          rows={3}
          required
          defaultValue={product?.description}
          className="w-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm outline-none focus:border-[var(--primary)]"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Chi tiết sản phẩm (mỗi dòng một ý)</label>
        <textarea
          name="details"
          rows={3}
          defaultValue={product?.details.join("\n")}
          className="w-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm outline-none focus:border-[var(--primary)]"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Tông màu nền dự phòng (khi chưa có ảnh)</label>
        <select
          name="tone"
          defaultValue={product?.tone ?? TONE_OPTIONS[0].value}
          className="w-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm outline-none focus:border-[var(--primary)]"
        >
          {TONE_OPTIONS.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-6 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="isNew" defaultChecked={product?.isNew} /> Sản phẩm mới
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="isBestSeller" defaultChecked={product?.isBestSeller} /> Best seller
        </label>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Ảnh sản phẩm (JPG/PNG/WEBP/GIF, tối đa 5MB)</label>
        <input
          type="file"
          name="image"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleImageChange}
          className="w-full text-sm"
        />
        {preview && (
          <div className="relative mt-3 h-40 w-40 overflow-hidden border border-[var(--border)]">
            <Image src={preview} alt="Xem trước" fill className="object-cover" />
          </div>
        )}
        <p className="mt-1 text-xs text-[var(--secondary)]">Ảnh được lưu tại public/products.</p>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-[var(--primary)] px-7 py-3 text-sm font-medium text-white disabled:opacity-60"
      >
        {submitting ? "Đang lưu..." : isEditing ? "Lưu thay đổi" : "Tạo sản phẩm"}
      </button>
    </form>
  );
}
