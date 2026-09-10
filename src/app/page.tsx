import Hero from "@/components/sections/Hero";
import FeaturedCollections from "@/components/sections/FeaturedCollections";
import ProductRow from "@/components/sections/ProductRow";
import BrandStory from "@/components/sections/BrandStory";
import SocialProof from "@/components/sections/SocialProof";
import { getAllProducts } from "@/lib/products-store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getAllProducts();
  const newArrivals = products.filter((p) => p.isNew);
  const bestSellers = products.filter((p) => p.isBestSeller);

  return (
    <div>
      <Hero />
      <FeaturedCollections />
      <ProductRow
        title="Sản phẩm mới về"
        subtitle="New Arrivals"
        products={newArrivals}
        href="/collections/all?sort=newest"
      />
      <ProductRow
        title="Best Sellers"
        subtitle="Được yêu thích nhất"
        products={bestSellers}
        href="/collections/all?sort=bestseller"
      />
      <BrandStory />
      <SocialProof />
    </div>
  );
}
