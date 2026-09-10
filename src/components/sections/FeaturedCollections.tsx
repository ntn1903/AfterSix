import Link from "next/link";
import Artwork from "@/components/Artwork";
import Reveal from "@/components/Reveal";
import { collections } from "@/lib/data";

export default function FeaturedCollections() {
  return (
    <section className="mx-auto max-w-[1320px] px-5 py-20 md:px-10 md:py-28">
      <Reveal className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--secondary)]">
          Curated for you
        </p>
        <h2 className="mt-2 text-3xl tracking-wide md:text-4xl">Bộ sưu tập nổi bật</h2>
      </Reveal>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {collections.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.08}>
            <Link href={`/collections/${c.slug}`} className="group block">
              <Artwork tone={c.tone} label={c.name} ratio="portrait" className="transition-transform duration-500 group-hover:scale-[1.03]" />
              <p className="mt-3 text-sm tracking-wide">{c.name}</p>
              <p className="text-xs text-[var(--secondary)]">{c.tagline}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
