"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { href: "/collections", label: "Bộ sưu tập" },
  { href: "/collections/all", label: "Sản phẩm" },
  { href: "/about", label: "Thương hiệu" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Liên hệ" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(usePathname());
  const pathname = usePathname();
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu when navigating, adjusting state during render instead of an effect.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  const isHome = pathname === "/";
  const solid = scrolled || !isHome || menuOpen;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        solid
          ? "bg-[var(--surface)]/95 backdrop-blur border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 py-4 md:px-10">
        <Link
          href="/"
          className={`text-lg font-semibold tracking-[0.18em] transition-colors ${
            solid ? "text-[var(--primary)]" : "text-white"
          }`}
        >
          AFTERSIX
        </Link>

        <nav
          className={`hidden items-center gap-8 text-sm tracking-wide md:flex ${
            solid ? "text-[var(--primary)]" : "text-white"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-opacity hover:opacity-60"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className={`relative text-sm tracking-wide transition-opacity hover:opacity-60 ${
              solid ? "text-[var(--primary)]" : "text-white"
            }`}
          >
            Giỏ hàng
            {totalItems > 0 && (
              <span className="absolute -right-3 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-medium text-[var(--primary)]">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            aria-label="Mở menu"
            className={`md:hidden ${solid ? "text-[var(--primary)]" : "text-white"}`}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-[var(--border)] bg-[var(--surface)] px-5 py-4 text-[var(--primary)] md:hidden">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="py-2 text-sm">
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
