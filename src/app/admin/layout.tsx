import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--primary)]">
      <header className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4">
          <Link href="/admin" className="text-sm font-semibold tracking-[0.18em]">
            AFTERSIX · ADMIN
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/admin" className="hover:opacity-60">Sản phẩm</Link>
            <Link href="/admin/products/new" className="hover:opacity-60">+ Thêm sản phẩm</Link>
            <Link href="/" className="hover:opacity-60" target="_blank">Xem website</Link>
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-[1200px] px-5 py-10">{children}</main>
    </div>
  );
}
