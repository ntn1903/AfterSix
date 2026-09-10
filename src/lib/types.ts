export type ProductCategory = "ao" | "vay" | "quan" | "set";

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  collection: string;
  colors: string[];
  sizes: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  tone: string; // gradient tone key used as fallback artwork when no image is set
  image?: string; // public path under /products, e.g. "/products/ao-so-mi-lua-be.jpg"
  description: string;
  details: string[];
};

export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  color: string;
  size: string;
  tone: string;
  category: ProductCategory;
  image?: string;
  quantity: number;
};
