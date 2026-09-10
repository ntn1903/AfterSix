import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import type { Product } from "@/lib/types";

export default function ProductRow({
  title,
  subtitle,
  products,
  href,
}: {
  title: string;
  subtitle: string;
  products: Product[];
  href: string;
}) {
  return (
    <section className="mx-auto max-w-[1320px] px-5 py-16 md:px-10 md:py-20">
      <Reveal className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--secondary)]">{subtitle}</p>
          <h2 className="mt-2 text-3xl tracking-wide md:text-4xl">{title}</h2>
        </div>
        <Link href={href} className="hidden text-sm underline-offset-4 hover:underline md:block">
          Xem tất cả
        </Link>
      </Reveal>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
        {products.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.06}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
      <div className="mt-8 text-center md:hidden">
        <Link href={href} className="text-sm underline-offset-4 hover:underline">
          Xem tất cả
        </Link>
      </div>
    </section>
  );
}
