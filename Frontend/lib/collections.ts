export interface CollectionMeta {
  /** Display name of the collection */
  name: string;
  /** URL slug used for routing */
  slug: string;
  /** Image URL for the collection thumbnail */
  image: string;
  /** Optional tag (e.g., "EDITOR'S PICK") */
  tag?: string;
  /** Optional flag for sale collections */
  isSale?: boolean;
  /** Optional description for collection page */
  description?: string;
}

/** Centralised registry of all storefront collections */
export const COLLECTIONS_DATA: Record<string, CollectionMeta> = {
  "oversized-drop": {
    name: "OVERSIZED DROP",
    slug: "oversized-drop",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBO0_WVNDt5k5ojfwmbSRZnjYL9GjPCepeqq34IT3nVLNEzqvmH8wvZmG011P4qAOCzYYPKlZvLRg1SKxei7VBOS1wiPmHV32CQ9Z8B6i3OYhryFgkvz-1A7dIJAF7O78YGac8R0U9lQoHN053wcKosLxCofomhwIlYKKAvSsQoW0TXLfgET4EnWo11PvyJgH16164mzmjziLsefmTKZrKffWtDtrdGSPgt8MYfZ6Z-BnENimqgZ8yAekWj2tXXYs1efrgc5EIoB4w",
    tag: "EDITOR'S PICK",
  },

  "oversized-t-shirt": {
    name: "Oversized T-shirt",
    slug: "oversized-t-shirt",
    image: "/products/oversized_tee.png",
  },

  "relaxed-t-shirts": {
    name: "Relaxed T-shirts",
    slug: "relaxed-t-shirts",
    image: "/products/Shoprine Batman2.jpg",
  },

  "joggers": {
    name: "Joggers",
    slug: "joggers",
    image: "/products/cargo_pants.png",
  },

  "jacket": {
    name: "Jacket",
    slug: "jacket",
    image: "/blackjacketman.png",
  },

  "hoodies": {
    name: "Hoodies",
    slug: "hoodies",
    image: "/black_hoodie_1777803598873.png",
  },
};