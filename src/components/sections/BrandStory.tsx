import Artwork from "@/components/Artwork";
import Reveal from "@/components/Reveal";
import Link from "next/link";

export default function BrandStory() {
  return (
    <section className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-10 px-5 py-20 md:grid-cols-2 md:px-10 md:py-28">
      <Reveal y={32}>
        <Artwork tone="from-[#E7E5E1] to-[#A9A29A]" ratio="wide" label="AfterSix" />
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--secondary)]">Brand Story</p>
        <h2 className="mt-3 text-3xl leading-snug tracking-wide md:text-4xl">
          Elegant. Modern. Calm. Natural. Refined.
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--secondary)]">
          AfterSix ra đời cho những người phụ nữ trân trọng sự tối giản — nơi từng đường
          may, từng chất liệu đều được chọn lọc để tôn lên vẻ đẹp tự nhiên và sự tự tin
          nhẹ nhàng mỗi ngày.
        </p>
        <Link
          href="/about"
          className="mt-6 inline-block border-b border-[var(--primary)] pb-1 text-sm tracking-wide hover:opacity-60"
        >
          Đọc câu chuyện thương hiệu
        </Link>
      </Reveal>
    </section>
  );
}
