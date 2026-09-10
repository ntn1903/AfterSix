import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import { slugify } from "./slugify";
import type { Product } from "./types";

const DATA_FILE = path.join(process.cwd(), "data", "products.json");
const PRODUCTS_DIR = path.join(process.cwd(), "public", "products");

const ALLOWED_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export async function getAllProducts(): Promise<Product[]> {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as Product[];
}

async function saveAllProducts(products: Product[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2), "utf-8");
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find((p) => p.id === id);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const products = await getAllProducts();
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

/** Validates and writes an uploaded image into public/products, returning its public URL path. */
export async function saveProductImage(file: File, baseName: string): Promise<string> {
  const ext = ALLOWED_IMAGE_TYPES[file.type];
  if (!ext) {
    throw new Error("Định dạng ảnh không được hỗ trợ (chỉ nhận JPG, PNG, WEBP, GIF).");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Ảnh vượt quá dung lượng cho phép (tối đa 5MB).");
  }

  await fs.mkdir(PRODUCTS_DIR, { recursive: true });

  const filename = `${slugify(baseName)}-${Date.now()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(PRODUCTS_DIR, filename), buffer);

  return `/products/${filename}`;
}

/** Best-effort removal of a product image file; ignores missing files. */
export async function deleteProductImage(imagePath: string | undefined): Promise<void> {
  if (!imagePath || !imagePath.startsWith("/products/")) return;
  const filePath = path.join(process.cwd(), "public", imagePath);
  try {
    await fs.unlink(filePath);
  } catch {
    // ignore if the file was already removed
  }
}

export type ProductInput = Omit<Product, "id" | "slug"> & { slug?: string };

export async function createProduct(input: ProductInput): Promise<Product> {
  const products = await getAllProducts();
  const slug = input.slug?.trim() ? slugify(input.slug) : slugify(input.name);

  if (products.some((p) => p.slug === slug)) {
    throw new Error("Đã tồn tại sản phẩm với slug này.");
  }

  const product: Product = {
    ...input,
    id: `p_${Date.now().toString(36)}`,
    slug,
  };

  await saveAllProducts([...products, product]);
  return product;
}

export async function updateProduct(
  id: string,
  input: Partial<ProductInput>
): Promise<Product> {
  const products = await getAllProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) throw new Error("Không tìm thấy sản phẩm.");

  const current = products[index];
  const nextSlug = input.slug?.trim() ? slugify(input.slug) : current.slug;
  if (nextSlug !== current.slug && products.some((p) => p.slug === nextSlug && p.id !== id)) {
    throw new Error("Đã tồn tại sản phẩm với slug này.");
  }

  const updated: Product = { ...current, ...input, id: current.id, slug: nextSlug };
  products[index] = updated;
  await saveAllProducts(products);
  return updated;
}

export async function deleteProduct(id: string): Promise<void> {
  const products = await getAllProducts();
  const target = products.find((p) => p.id === id);
  if (!target) throw new Error("Không tìm thấy sản phẩm.");

  await saveAllProducts(products.filter((p) => p.id !== id));
  await deleteProductImage(target.image);
}
