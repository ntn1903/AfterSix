import Artwork from "@/components/Artwork";
import Reveal from "@/components/Reveal";

export const metadata = { title: "Thương hiệu — AfterSix" };

export default function AboutPage() {
  return (
    <div>
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-10 md:py-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--secondary)]">Về AfterSix</p>
          <h1 className="mt-3 text-4xl leading-snug tracking-wide">
            Thời trang tối giản cho phiên bản tự tin của bạn
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--secondary)]">
            AfterSix được thành lập với niềm tin rằng vẻ đẹp thực sự đến từ sự tối giản.
            Chúng tôi chọn lọc từng chất liệu, từng đường cắt để tạo nên những thiết kế
            vượt thời gian — vừa hiện đại, vừa dịu dàng, phù hợp với nhịp sống của phụ nữ
            Việt hiện đại.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Artwork tone="from-[#3a3a3a] to-[#111111]" ratio="wide" label="AfterSix Studio" />
        </Reveal>
      </div>

      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-8 px-5 pb-20 md:grid-cols-3 md:px-10">
        {[
          { title: "Elegant & Modern", desc: "Thiết kế tinh giản, tôn dáng, không lỗi mốt theo thời gian." },
          { title: "Chất liệu chọn lọc", desc: "Ưu tiên vải tự nhiên, bền đẹp, thân thiện với làn da." },
          { title: "Bền vững & Tận tâm", desc: "Sản xuất có trách nhiệm, đồng hành lâu dài cùng khách hàng." },
        ].map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08} className="border border-[var(--border)] p-6">
            <h3 className="text-lg tracking-wide">{item.title}</h3>
            <p className="mt-2 text-sm text-[var(--secondary)]">{item.desc}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
