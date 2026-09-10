"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/collections/all");
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--secondary)] transition-colors hover:text-[var(--primary)]"
    >
      <span aria-hidden="true">←</span>
      Quay lại
    </button>
  );
}
