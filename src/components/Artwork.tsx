import clsx from "clsx";
import Image from "next/image";
import { DressIcon, PantsIcon, SetIcon, ShirtIcon } from "@/components/garments/GarmentIcons";
import type { ProductCategory } from "@/lib/types";

type ArtworkProps = {
  tone: string;
  image?: string;
  label?: string;
  className?: string;
  ratio?: "portrait" | "square" | "wide";
  category?: ProductCategory;
};

const ratioClass: Record<NonNullable<ArtworkProps["ratio"]>, string> = {
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
};

const categoryIcon: Record<ProductCategory, typeof ShirtIcon> = {
  ao: ShirtIcon,
  vay: DressIcon,
  quan: PantsIcon,
  set: SetIcon,
};

/** Renders a real product photo when available, otherwise a gradient + garment line-icon placeholder. */
export default function Artwork({ tone, image, label, className, ratio = "portrait", category }: ArtworkProps) {
  const Icon = category ? categoryIcon[category] : null;

  return (
    <div
      className={clsx(
        "relative overflow-hidden",
        !image && "bg-gradient-to-br",
        !image && tone,
        ratioClass[ratio],
        className
      )}
    >
      {image ? (
        <Image
          src={image}
          alt={label ?? "Sản phẩm AfterSix"}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />
      ) : (
        <>
          {Icon && <Icon className="absolute inset-0 m-auto h-1/2 w-1/2 text-white/70" />}
          {label && (
            <span className="absolute bottom-3 left-3 text-[11px] tracking-[0.2em] uppercase text-white/80 mix-blend-overlay">
              {label}
            </span>
          )}
        </>
      )}
    </div>
  );
}
