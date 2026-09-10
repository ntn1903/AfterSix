import Link from "next/link";
import Artwork from "@/components/Artwork";
import Reveal from "@/components/Reveal";
import { collections } from "@/lib/data";

export const metadata = {
  title: "Bộ sưu tập — AfterSix",
};

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-5 py-16 md:px-10 md:py-24">
      <Reveal className="mb-12 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--secondary)]">Explore</p>
        <h1 className="mt-2 text-4xl tracking-wide">Bộ sưu tập</h1>
      </Reveal>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Reveal>
          <Link href="/collections/all" className="group block">
            <Artwork tone="from-[#111111] to-[#3a3a3a]" ratio="wide" label="Tất cả sản phẩm" className="transition-transform duration-500 group-hover:scale-[1.02]" />
            <p className="mt-3 text-base tracking-wide">Tất cả sản phẩm</p>
          </Link>
        </Reveal>
        {collections.map((c, i) => (
          <Reveal key={c.slug} delay={(i + 1) * 0.06}>
            <Link href={`/collections/${c.slug}`} className="group block">
              <Artwork tone={c.tone} ratio="wide" label={c.name} className="transition-transform duration-500 group-hover:scale-[1.02]" />
              <p className="mt-3 text-base tracking-wide">{c.name}</p>
              <p className="text-sm text-[var(--secondary)]">{c.tagline}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
