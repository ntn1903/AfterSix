import Link from "next/link";
import { getAllProducts } from "@/lib/products-store";
import ProductTable from "@/components/admin/ProductTable";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl tracking-wide">Quản lý sản phẩm ({products.length})</h1>
        <Link
          href="/admin/products/new"
          className="bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white"
        >
          + Thêm sản phẩm
        </Link>
      </div>
      <ProductTable products={products} />
    </div>
  );
}
