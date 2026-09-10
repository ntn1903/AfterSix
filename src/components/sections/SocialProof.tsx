import Artwork from "@/components/Artwork";
import Reveal from "@/components/Reveal";

const feedback = [
  { name: "Minh Anh", quote: "Chất vải mềm mịn, form áo chuẩn, giao hàng siêu nhanh!" },
  { name: "Thuỳ Linh", quote: "Thiết kế tối giản mà vẫn rất sang, mặc đi làm hay đi chơi đều hợp." },
  { name: "Bảo Trân", quote: "Mình mê nhất phần đóng gói, cảm giác như mở một món quà nhỏ." },
];

const feedTones = [
  "from-[#EDE6DC] to-[#C8B9A6]",
  "from-[#E7E5E1] to-[#A9A29A]",
  "from-[#F2EFE9] to-[#CBBFA9]",
  "from-[#3a3a3a] to-[#111111]",
  "from-[#EDE6DC] to-[#C8B9A6]",
  "from-[#E7E5E1] to-[#A9A29A]",
];

export default function SocialProof() {
  return (
    <section className="bg-[var(--background)] py-20 md:py-28">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <Reveal className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--secondary)]">
            Khách hàng nói gì
          </p>
          <h2 className="mt-2 text-3xl tracking-wide md:text-4xl">Feedback từ cộng đồng</h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {feedback.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.08} className="border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="text-sm leading-relaxed text-[var(--secondary)]">“{f.quote}”</p>
              <p className="mt-4 text-sm font-medium">{f.name}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 text-center" delay={0.1}>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--secondary)]">@aftersix.vn</p>
          <h3 className="mt-2 text-2xl tracking-wide">Theo dõi trên Instagram</h3>
        </Reveal>
        <div className="mt-8 grid grid-cols-3 gap-3 md:grid-cols-6 md:gap-4">
          {feedTones.map((tone, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <Artwork tone={tone} ratio="square" className="transition-transform duration-500 hover:scale-[1.04]" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
