import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AfterSix — Thời trang nữ tối giản, thanh lịch",
  description:
    "AfterSix - website thời trang nữ với trải nghiệm cao cấp, tối giản, tập trung vào hình ảnh sản phẩm và cảm xúc thương hiệu.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--primary)]">
        {children}
      </body>
    </html>
  );
}
