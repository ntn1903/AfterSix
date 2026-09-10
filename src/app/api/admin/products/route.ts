import { NextResponse } from "next/server";
import {
  createProduct,
  getAllProducts,
  saveProductImage,
  updateProduct,
  type ProductInput,
} from "@/lib/products-store";
import type { ProductCategory } from "@/lib/types";

const CATEGORIES: ProductCategory[] = ["ao", "vay", "quan", "set"];

function splitLines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(/\r?\n|,/)
    .map((v) => v.trim())
    .filter(Boolean);
}

export async function GET() {
  const products = await getAllProducts();
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();

    const name = String(form.get("name") ?? "").trim();
    const category = String(form.get("category") ?? "");
    const price = Number(form.get("price"));

    if (!name) return NextResponse.json({ error: "Thiếu tên sản phẩm." }, { status: 400 });
    if (!CATEGORIES.includes(category as ProductCategory)) {
      return NextResponse.json({ error: "Loại sản phẩm không hợp lệ." }, { status: 400 });
    }
    if (!Number.isFinite(price) || price <= 0) {
      return NextResponse.json({ error: "Giá không hợp lệ." }, { status: 400 });
    }

    const input: ProductInput = {
      name,
      slug: String(form.get("slug") ?? ""),
      category: category as ProductCategory,
      price,
      compareAtPrice: form.get("compareAtPrice")
        ? Number(form.get("compareAtPrice"))
        : undefined,
      collection: String(form.get("collection") ?? "soft-confidence"),
      colors: splitLines(form.get("colors")),
      sizes: splitLines(form.get("sizes")),
      isNew: form.get("isNew") === "true",
      isBestSeller: form.get("isBestSeller") === "true",
      tone: String(form.get("tone") ?? "from-[#E7E5E1] to-[#A9A29A]"),
      description: String(form.get("description") ?? ""),
      details: splitLines(form.get("details")),
    };

    const product = await createProduct(input);

    const imageFile = form.get("image");
    if (imageFile instanceof File && imageFile.size > 0) {
      const imagePath = await saveProductImage(imageFile, product.slug);
      const updated = await updateProduct(product.id, { image: imagePath });
      return NextResponse.json({ product: updated }, { status: 201 });
    }

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Có lỗi xảy ra.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
