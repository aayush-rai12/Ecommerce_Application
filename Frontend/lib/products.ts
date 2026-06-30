// =============================================================================
// DATA LAYER — lib/products.ts
// =============================================================================
// This file is the SINGLE SOURCE OF TRUTH for all product & collection data.
//
// CURRENT MODE: Mock / Demo data
// FUTURE MODE:  Replace `allProducts` and `collections` with data fetched
//               from the Shopify Storefront API (see lib/api.ts for the query).
//
// ⚠️  DATA FORMAT CONTRACT:
//     The shape of Product & Collection interfaces below must match exactly
//     what the Shopify API mapper in lib/api.ts produces.
//     Do NOT change field names here without updating the mapper too.
// =============================================================================

// ---------------------------------------------------------------------------
// Interfaces  (mirrors the shape of a Shopify product node after mapping)
// ---------------------------------------------------------------------------

export interface Product {
  id: string;             // Shopify GID  e.g. "gid://shopify/Product/123"
  handle: string;         // URL slug      e.g. "core-oversized-tee"
  name: string;           // Product title
  description: string;    // Plain-text description (strip HTML from Shopify)
  price: number;          // Numeric price  e.g. 1499
  mrp: number;            // Original MRP
  discount: number;       // Discount percentage
  images: string[];       // Ordered array of image URLs (index 0 = main image)
  color: string;          // First "Color" option value
  sizes: string[];        // All values for the "Size" option
  inStock: boolean;       // true if ANY variant is availableForSale
  category: string;       // Shopify productType field
  rating: number;         // Average rating
  reviews: number;        // Number of reviews
}

export interface Collection {
  id: string;             // Shopify GID
  title: string;          // Display name
  handle: string;         // URL slug  e.g. "latest-drop"
  description?: string;
  products: Product[];
}

// ---------------------------------------------------------------------------
// Demo Products
// ---------------------------------------------------------------------------

export const allProducts: Product[] = [
  {
    id: "prod_01",
    handle: "core-oversized-tee",
    name: "Core Oversized Tee",
    description:
      "Premium heavy-weight 400 GSM cotton. Boxy, oversized fit dropping off the shoulder. Pre-shrunk to minimize shrinkage after washing.",
    price: 1499,
    mrp: 1999,
    discount: 30,
    images: ["/products/oversized_tee.png", "/polo1.png"],
    color: "Bone White",
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    category: "Tops",
    rating: 4.3,
    reviews: 128,
  },
  {
    id: "prod_02",
    handle: "nomad-cargo-pant",
    name: "Nomad Cargo Pant",
    description:
      "Technical nylon-blend cargo pant with articulated knees. Features multiple utility pockets and adjustable ankle toggles for a versatile silhouette.",
    price: 2999,
    mrp: 3999,
    discount: 25,
    images: ["/products/cargo_pants.png", "/polo2.png"],
    color: "Charcoal",
    sizes: ["28", "30", "32", "34", "36"],
    inStock: true,
    category: "Bottoms",
    rating: 4.6,
    reviews: 214,
  },
  {
    id: "prod_03",
    handle: "heavyweight-zip-up",
    name: "Heavyweight Zip-Up",
    description:
      "Double-layered 380 GSM zip-up hoodie with a brushed interior. Designed for extreme comfort and layering in colder weather.",
    price: 3999,
    mrp: 4999,
    discount: 20,
    images: ["/products/Shoprine%20Batman1.jpg", "/polo3.png"],
    color: "Washed Grey",
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    category: "Outerwear",
    rating: 4.5,
    reviews: 98,
  },
  {
    id: "prod_04",
    handle: "core-oversized-hoodie",
    name: "Core Oversized Hoodie",
    description:
      "Engineered for daily utility. Crafted from 450GSM heavy-weight French Terry cotton. Features an architectural oversized fit with dropped shoulders and a double-layered hood.",
    price: 4499,
    mrp: 5999,
    discount: 25,
    images: ["/blackjacketman.png", "/polo1.png"],
    color: "Cream",
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    category: "Outerwear",
    rating: 4.7,
    reviews: 342,
  },
  {
    id: "prod_05",
    handle: "minimalist-sweatshirt",
    name: "Minimalist Sweatshirt",
    description:
      "High-end minimalist sweatshirt in soft olive green. Premium loopback cotton with a refined texture and boxy architectural fit.",
    price: 2499,
    mrp: 2999,
    discount: 17,
    images: ["/products/minimalist_sweatshirt.png"],
    color: "Olive Green",
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    category: "Tops",
    rating: 4.2,
    reviews: 76,
  },
  {
    id: "prod_06",
    handle: "utility-vest",
    name: "Utility Vest",
    description:
      "Technical utility vest with multi-functional pocket system. Crafted from water-resistant technical fabric for urban versatility.",
    price: 3299,
    mrp: 3999,
    discount: 18,
    images: ["/products/utility_vest.png"],
    color: "Charcoal Grey",
    sizes: ["S", "M", "L"],
    inStock: true,
    category: "Outerwear",
    rating: 4.4,
    reviews: 156,
  },
  {
    id: "prod_07",
    handle: "tech-runner-shoes",
    name: "Tech Runner Shoes",
    description:
      "Futuristic tech runner sneakers featuring a sleek aerodynamic design, matte black finish with subtle neon accents. Engineered for performance and style.",
    price: 8999,
    mrp: 10999,
    discount: 18,
    images: ["/tech_runner_shoes.png"],
    color: "Matte Black",
    sizes: ["7", "8", "9", "10", "11"],
    inStock: true,
    category: "Footwear",
    rating: 4.8,
    reviews: 289,
  },
  {
    id: "prod_08",
    handle: "archive-box-hoodie",
    name: "Archive Box Hoodie",
    description:
      "Loopback terry cotton hoodie. Cropped body with elongated sleeves. Double-lined hood and subtle tonal branding.",
    price: 3499,
    mrp: 4999,
    discount: 30,
    images: ["/polo3.png"],
    color: "Carbon Black",
    sizes: ["S", "M", "L"],
    inStock: false,
    category: "Outerwear",
    rating: 4.1,
    reviews: 64,
  },
];

// ---------------------------------------------------------------------------
// Collections
// ---------------------------------------------------------------------------

export const collections: Collection[] = [
  {
    id: "col_latest",
    title: "LATEST DROP",
    handle: "latest-drop",
    description: "Our newest arrivals engineered for the modern landscape.",
    products: allProducts,
  },
  {
    id: "col_essentials",
    title: "ESSENTIALS",
    handle: "essentials",
    description: "Core pieces that form the foundation of your wardrobe.",
    products: [allProducts[0], allProducts[4]],
  },
  {
    id: "col_outerwear",
    title: "OUTERWEAR",
    handle: "outerwear",
    description: "Layers built for the elements.",
    products: [allProducts[2], allProducts[3], allProducts[5], allProducts[7]],
  },
];

// ---------------------------------------------------------------------------
// Helper: format price for display
// ---------------------------------------------------------------------------
export function formatPrice(amount: number): string {
  return amount.toLocaleString("en-IN");
}
