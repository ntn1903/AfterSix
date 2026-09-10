import Reveal from "@/components/Reveal";

export const metadata = { title: "Chính sách đổi trả — AfterSix" };

export default function ReturnsPolicyPage() {
  return (
    <div className="mx-auto max-w-[820px] px-5 py-16 md:px-10 md:py-24">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--secondary)]">Hỗ trợ</p>
        <h1 className="mt-2 text-4xl tracking-wide">Chính sách đổi trả</h1>
      </Reveal>
      <Reveal delay={0.08} className="mt-8 space-y-5 text-sm leading-relaxed text-[var(--secondary)]">
        <p>Chúng tôi mong muốn bạn hoàn toàn hài lòng với mỗi sản phẩm của AfterSix.</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Đổi trả miễn phí trong vòng 7 ngày kể từ ngày nhận hàng.</li>
          <li>Sản phẩm còn nguyên tem mác, chưa qua sử dụng hoặc giặt ủi.</li>
          <li>Không áp dụng đổi trả với sản phẩm giảm giá trên 50%.</li>
          <li>Liên hệ đội ngũ chăm sóc khách hàng để được hướng dẫn quy trình đổi trả.</li>
        </ul>
      </Reveal>
    </div>
  );
}
