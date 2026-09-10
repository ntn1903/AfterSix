import type { ProductCategory } from "./types";

export const categoryLabels: Record<ProductCategory, string> = {
  ao: "Áo",
  vay: "Váy",
  quan: "Quần",
  set: "Set đồ",
};

export const collections = [
  {
    slug: "soft-confidence",
    name: "Soft Confidence",
    tagline: "New Season, Soft Confidence",
    tone: "from-[#EDE6DC] to-[#C8B9A6]",
  },
  {
    slug: "quiet-luxury",
    name: "Quiet Luxury",
    tagline: "Tối giản là một tuyên ngôn",
    tone: "from-[#E7E5E1] to-[#A9A29A]",
  },
  {
    slug: "linen-story",
    name: "Linen Story",
    tagline: "Nhẹ như một hơi thở mùa hè",
    tone: "from-[#F2EFE9] to-[#CBBFA9]",
  },
  {
    slug: "midnight-ease",
    name: "Midnight Ease",
    tagline: "Thanh lịch trong từng chuyển động",
    tone: "from-[#3a3a3a] to-[#111111]",
  },
] as const;

export function getCollectionBySlug(slug: string) {
  return collections.find((c) => c.slug === slug);
}
