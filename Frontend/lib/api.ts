// =============================================================================
// API ADAPTER — lib/api.ts
// =============================================================================
// This file is the ONLY place that knows WHERE data comes from.
// UI components only call functions from this file — they never care whether

// =============================================================================

import { Product, Collection, allProducts, collections } from "./products";

export interface HomepageData {
  hero: {
    imageSrc: string;
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaLink: string;
  };
  featuredCollection: Collection;
  archive: {
    imageSrc: string;
    headline: string;
    ctaText: string;
    ctaLink: string;
  };
}

// ---------------------------------------------------------------------------
// MOCK data
// ---------------------------------------------------------------------------

const mockHomepageData: HomepageData = {
  hero: {
    imageSrc: "/hero_model.png",
    headline: "BUILT FOR THE FEARLESS",
    subheadline:
      "Architectural essentials for the modern nomad. Precision engineered silhouettes designed for the urban landscape.",
    ctaText: "SHOP COLLECTION",
    ctaLink: "/products",
  },
  featuredCollection:
    collections.find((c) => c.handle === "latest-drop") || collections[0],
  archive: {
    imageSrc: "/products/oversized_tee.png",
    headline: "UNFOLD THE ARCHIVE",
    ctaText: "EXPLORE COLLECTION",
    ctaLink: "/collections/latest-drop",
  },
};

export async function getHomepageData(): Promise<HomepageData> {
  return mockHomepageData;
}

export async function getAllProducts(): Promise<Product[]> {
  return allProducts;
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  return allProducts.find((p) => p.handle === handle) ?? null;
}

export async function getCollectionByHandle(handle: string): Promise<Collection | null> {
  return collections.find((c) => c.handle === handle) ?? null;
}
