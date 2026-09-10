import { notFound } from "next/navigation";
import { Suspense } from "react";
import CollectionBrowser from "@/components/collection/CollectionBrowser";
import { getCollectionBySlug } from "@/lib/data";
import { getAllProducts } from "@/lib/products-store";

export const dynamic = "force-dynamic";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getAllProducts();

  if (slug === "all") {
    return (
      <Suspense>
        <CollectionBrowser title="Tất cả sản phẩm" products={products} />
      </Suspense>
    );
  }

  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const collectionProducts = products.filter((p) => p.collection === slug);

  return (
    <Suspense>
      <CollectionBrowser
        title={collection.name}
        subtitle={collection.tagline}
        products={collectionProducts}
      />
    </Suspense>
  );
}
