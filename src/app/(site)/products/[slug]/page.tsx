import { notFound } from "next/navigation";
import Artwork from "@/components/Artwork";
import Reveal from "@/components/Reveal";
import ProductRow from "@/components/sections/ProductRow";
import ProductOptions from "@/components/pdp/ProductOptions";
import BackButton from "@/components/pdp/BackButton";
import { getProductBySlug, getRelatedProducts } from "@/lib/products-store";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product);

  return (
    <div>
      <div className="mx-auto max-w-[1320px] px-5 pt-8 md:px-10 md:pt-10">
        <BackButton />
      </div>
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-10 px-5 py-12 md:grid-cols-2 md:px-10 md:py-16">
        <Reveal>
          <div className="grid grid-cols-2 gap-3">
            <Artwork tone={product.tone} image={product.image} label={product.name} category={product.category} className="col-span-2" ratio="wide" />
            <Artwork tone={product.tone} image={product.image} category={product.category} ratio="square" />
            <Artwork tone={product.tone} image={product.image} category={product.category} ratio="square" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--secondary)]">
            {product.collection.replace("-", " ")}
          </p>
          <h1 className="mt-2 text-3xl tracking-wide">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-xl">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-[var(--secondary)] line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--secondary)]">
            {product.description}
          </p>

          <ProductOptions product={product} />

          <div className="mt-10 border-t border-[var(--border)] pt-6 text-sm text-[var(--secondary)]">
            <ul className="mb-4 list-disc space-y-1 pl-5">
              {product.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <p>Miễn phí đổi trả trong 7 ngày · Giao hàng toàn quốc 2–4 ngày làm việc.</p>
          </div>
        </Reveal>
      </div>

      {related.length > 0 && (
        <ProductRow
          title="Có thể bạn cũng thích"
          subtitle="Gợi ý cho bạn"
          products={related}
          href={`/collections/all`}
        />
      )}
    </div>
  );
}
