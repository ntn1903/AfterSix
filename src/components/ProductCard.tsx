import Link from "next/link";
import Artwork from "./Artwork";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative overflow-hidden">
        <Artwork
          tone={product.tone}
          image={product.image}
          label={product.name}
          category={product.category}
          className="transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {(product.isNew || product.isBestSeller) && (
          <span className="absolute left-3 top-3 bg-[var(--surface)]/90 px-2 py-1 text-[10px] uppercase tracking-[0.15em]">
            {product.isNew ? "Mới" : "Best Seller"}
          </span>
        )}
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-sm">{product.name}</p>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-[var(--primary)]">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-[var(--secondary)] line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
