import { NextResponse } from "next/server";
import {
  deleteProduct,
  deleteProductImage,
  getProductById,
  saveProductImage,
  updateProduct,
  assertWritableStorage,
} from "@/lib/products-store";
import type { ProductCategory } from "@/lib/types";

const CATEGORIES: ProductCategory[] = ["ao", "vay", "quan", "set"];

function splitLines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(/\r?\n|,/)
    .map((v) => v.trim())
    .filter(Boolean);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    assertWritableStorage();
    const existing = await getProductById(id);
    if (!existing) return NextResponse.json({ error: "Không tìm thấy sản phẩm." }, { status: 404 });

    const form = await request.formData();
    const category = String(form.get("category") ?? existing.category);
    if (!CATEGORIES.includes(category as ProductCategory)) {
      return NextResponse.json({ error: "Loại sản phẩm không hợp lệ." }, { status: 400 });
    }

    const price = Number(form.get("price"));
    if (!Number.isFinite(price) || price <= 0) {
      return NextResponse.json({ error: "Giá không hợp lệ." }, { status: 400 });
    }

    let image = existing.image;
    const imageFile = form.get("image");
    if (imageFile instanceof File && imageFile.size > 0) {
      image = await saveProductImage(imageFile, String(form.get("slug") || existing.slug));
      await deleteProductImage(existing.image);
    }

    const compareAtPriceRaw = form.get("compareAtPrice");
    const updated = await updateProduct(id, {
      name: String(form.get("name") ?? existing.name).trim(),
      slug: String(form.get("slug") ?? existing.slug),
      category: category as ProductCategory,
      price,
      compareAtPrice: compareAtPriceRaw ? Number(compareAtPriceRaw) : undefined,
      collection: String(form.get("collection") ?? existing.collection),
      colors: splitLines(form.get("colors")),
      sizes: splitLines(form.get("sizes")),
      isNew: form.get("isNew") === "true",
      isBestSeller: form.get("isBestSeller") === "true",
      tone: String(form.get("tone") ?? existing.tone),
      image,
      description: String(form.get("description") ?? existing.description),
      details: splitLines(form.get("details")),
    });

    return NextResponse.json({ product: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Có lỗi xảy ra.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    assertWritableStorage();
    await deleteProduct(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Có lỗi xảy ra.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
