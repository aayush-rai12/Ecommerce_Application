# Joy‑Clothes Storefront

**A cinematic, premium‑style ecommerce storefront built with Next.js (App Router) and TypeScript.**

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Folder Structure](#folder-structure)
4. [Data Flow – Centralised Registry](#data-flow--centralised-registry)
5. [Running the Project Locally](#running-the-project-locally)
6. [Building for Production](#building-for-production)
7. [Integrating Real APIs](#integrating-real-apis)
8. [Adding / Updating Collections](#adding---updating-collections)
9. [Extending / Re‑using Components](#extending---re‑using-components)
10. [Testing & Linting](#testing---linting)
11. [Contribution Guide](#contribution-guide)
12. [FAQ & Troubleshooting](#faq---troubleshooting)

---

## Project Overview

Joy‑Clothes is a **fashion storefront** that showcases collections, product cards, reels, and rich UI sections (hero, character, reels). The UI is **data‑driven** – all collection metadata lives in a single source (`lib/collections.ts`) and the rest of the app reads it through the **API shim** (`lib/api.ts`).

Key routes:

| Route | Description |
|------|--------------|
| `/` | Home page – hero, featured collection, reels, character section |
| `/collections/[slug]` | Dynamic collection detail page – pulls data from `COLLECTIONS_DATA` (or a backend API) |
| `/products` | Product list (uses mock data from `lib/products.ts`) |
| `/collections` | Gallery of all collections |
| `/blog` *(future)* | Planned blog route |

The app uses **Next.js App Router** (`useParams` from `next/navigation`) and **client‑side components** (`"use client"`).

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js (App Router) – see `node_modules/next/dist/docs/` for the custom version used |
| **Language** | TypeScript (strict) |
| **Styling** | Vanilla CSS with Tailwind‑like utility classes (no Tailwind dependency) |
| **Images** | `next/image` for optimisation (static images in `public/`) |
| **State** | React hooks (`useState`, `useEffect`) |
| **Icons** | Custom `components/Icon.tsx` (SVG sprite) |
| **Testing** | (not yet added – can plug in Jest/React Testing Library) |
| **Package Manager** | npm (scripts in `package.json`) |

---

## Folder Structure

```
joy-clothes/
├─ app/
│   └─ collections/
│        └─ [slug]/page.tsx          # Dynamic collection detail page
├─ components/
│   ├─ home/
│   │   ├─ CategoryCircles.tsx      # Category carousel (uses COLLECTIONS_DATA)
│   │   ├─ CharacterSection.tsx    # Hero‑style character showcase
│   │   ├─ ReelsSection.tsx         # Instagram‑style reels with play/pause logic
│   │   └─ …
│   ├─ product/
│   │   └─ ProductImageGallery.tsx  # Image carousel for a product
│   └─ Icon.tsx                    # SVG icon component
├─ lib/
│   ├─ api.ts                      # “only place that knows where data comes from”
│   ├─ collections.ts               # Centralised collection registry (CollectionMeta)
│   └─ products.ts                  # Mock product / collection data (used by api.ts)
├─ public/
│   └─ (static images, videos, etc.)
├─ styles/
│   └─ globals.css                 # Global CSS (reset, fonts, etc.)
├─ .gitignore
├─ next.config.js                  # Next.js config (image domains, etc.)
├─ package.json
└─ README.md                       # <‑‑ you are reading this file
```

> **Why the split?**
> *`api.ts`* abstracts data fetching – UI components never import `products.ts` directly. When a real backend exists you replace the mock functions in `api.ts` with real `fetch` calls.
> *`collections.ts`* is the **single source of truth** for every collection used throughout the UI (carousel, collection pages, related collections).

---

## Data Flow – Centralised Registry

1. **`CollectionMeta`** (defined in `lib/collections.ts`) describes the shape of a collection:
   ```ts
   export interface CollectionMeta {
     name: string;          // Display name
     slug: string;          // URL slug – used for routing
     image: string;         // Thumbnail / hero image
     tag?: string;          // Optional UI tag (e.g., "EDITOR'S PICK")
     isSale?: boolean;      // Optional flag for sale collections
     description?: string; // Optional long‑form description (used on detail page)
   }
   ```
2. **`COLLECTIONS_DATA`** is a `Record<string, CollectionMeta>` mapping the slug → metadata. Add / edit collections here *once* – the UI automatically reflects changes (CategoryCircles, collection pages, related collections).
3. **`api.ts`** (the “adapter”) currently returns **mock** data:
   ```ts
   export async function getHomepageData(): Promise<HomepageData> { … }
   export async function getCollectionByHandle(handle: string) { … }
   ```
   Replace the body of these functions with real `fetch` calls when a backend is ready (see **Integrating Real APIs**).
4. **Pages / Components** import only the *adapter* functions, e.g.:
   ```tsx
   import { getHomepageData } from "../../../lib/api";
   ```
   They never touch `collections.ts` directly (except the `CategoryCircles` carousel, which imports `COLLECTIONS_DATA` explicitly because it needs the full list for rendering).

---

## Running the Project Locally

> **Prerequisites**
> * Node ≥ 18 (the repo uses ES2022 syntax)
> * npm (comes with Node)

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your‑org>/joy-clothes.git
   cd joy-clothes
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the dev server**
   ```bash
   npm run dev
   ```
   The app is served at `http://localhost:3000`. Hot‑module replacement works – changes in any component are reflected instantly.
4. **Verify the project builds successfully (optional)**
   ```bash
   npm run build
   ```

---

## Building for Production

```bash
npm run build   # generates a fully optimised static site (or SSR) in .next/
npm start       # runs the production build locally (useful for testing)
```

Deploy to Vercel / Netlify / any Node‑compatible host by pushing the `Development` (or `main`) branch (the repo already contains a `vercel.json`‑compatible build script).

---

## Integrating Real APIs

When you have a backend (REST, GraphQL, Shopify, etc.) replace the mock functions in **`lib/api.ts`**. Below is a **template** you can copy‑paste and adapt:

```ts
// lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.myshop.com";

export async function getHomepageData(): Promise<HomepageData> {
  const res = await fetch(`${API_BASE}/homepage`);
  if (!res.ok) throw new Error("Failed to fetch homepage data");
  return res.json(); // must match HomepageData shape
}

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const res = await fetch(`${API_BASE}/products/${handle}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function getCollectionByHandle(handle: string): Promise<Collection | null> {
  const res = await fetch(`${API_BASE}/collections/${handle}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch collection");
  return res.json();
}
```

### Environment variables
Create a **`.env.local`** file at the repository root (ignored by git) with:
```
NEXT_PUBLIC_API_BASE_URL=https://api.myshop.com
```
> **Note:** `NEXT_PUBLIC_` prefix makes the variable available to the client bundle (required because many API calls are client‑side).

### Updating Types
If the backend returns additional fields (e.g., `description` for a collection), extend the interfaces in `lib/products.ts` or create new ones and keep the TypeScript definitions in sync. The `description` field has already been added to `CollectionMeta` (optional).

---

## Adding / Updating Collections

1. Open **`lib/collections.ts`**.
2. Add a new entry in `COLLECTIONS_DATA` using the same shape:
   ```ts
   "new-collection-slug": {
     name: "New Collection",
     slug: "new-collection-slug",
     image: "/products/new_collection.png",
     tag: "NEW ARRIVAL",
     isSale: true,               // optional
     description: "Long description …", // optional
   },
   ```
3. Save – the **CategoryCircles** carousel, the **related collections** section, and any routes that reference `slug` will instantly include the new collection. No additional UI changes are required.

---

## Extending / Re‑using Components

| Component | Purpose | Key Props | How to use |
|-----------|---------|-----------|------------|
| `CategoryCircles` | Horizontal scroll of collection badges | none (reads `COLLECTIONS_DATA` directly) | Import and place anywhere on a page |
| `ReelsSection` | Instagram‑style reels with play/pause logic | none (uses `SAMPLE_REELS` mock) | Add a real API call in the `useEffect` to fetch reels and replace `SAMPLE_REELS` |
| `ProductCard` | Card UI for a product | `handle`, `images`, `name`, `color`, `price`, `mrp`, `discount`, `rating`, `reviews`, `inStock` | Used in collection detail page and product list |
| `Icon` | SVG sprite wrapper – **`name`** matches the exported symbol in `public/icons.svg` | `name`, `className` | `<Icon name="play" className="h-5 w-5" />` |
| `ProductImageGallery` | Image carousel for a single product page (future) | `images: string[]` | Render inside a product detail route |

When creating new UI pieces, **keep the “data‑first” rule**: fetch data via `lib/api.ts` (or direct reading from `COLLECTIONS_DATA`) and pass the resulting objects to components via props.

---

## Testing & Linting

The repo ships with **ESLint** (run `npm run lint`). Add the following scripts to `package.json` if they are missing:
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "type-check": "tsc --noEmit"
}
```
Run type‑checking before opening a PR:
```bash
npm run type-check
```
---

## Contribution Guide

1. **Branching** – work on a feature branch off `Development`.
2. **Commit style** – use conventional commits (`feat:`, `fix:`, `chore:` etc.).
3. **Pull Request** – target `Development`. Include a short description of the change and any relevant screenshots.
4. **Resolve conflicts** – if `ReelsSection.tsx` appears as “deleted by us”, run `git add components/home/ReelsSection.tsx` before committing.
5. **Testing** – ensure `npm run build` succeeds and the dev server renders the changed pages.

---

## FAQ & Troubleshooting

| Problem | Likely Cause | Fix |
|--------|--------------|-----|
| `Property 'description' does not exist on type 'CollectionMeta'` | `description` not added to the interface. | It has been added (lines 10‑13 of `lib/collections.ts`). Re‑run `npm run type-check`. |
| `ReelsSection.tsx` shows “deleted by us” after a merge | One branch removed the file while another edited it. | `git add components/home/ReelsSection.tsx` then `git commit -m "Resolve merge conflict – keep ReelsSection with play/pause logic"`. |
| Images don’t load in production | `next.config.js` missing domain whitelist. | Add the domain(s) used for external images to `images.domains` array in `next.config.js`. |
| API calls return 404 | `NEXT_PUBLIC_API_BASE_URL` missing or incorrect. | Create/verify `.env.local` with the correct base URL, restart `npm run dev`. |
| Tailwind‑like utility classes have no effect | The repo uses vanilla CSS; those utilities are custom utility classes defined in `globals.css`. | Ensure `globals.css` is imported in `app/layout.tsx`. Do **not** install Tailwind unless you deliberately want to rewrite the styling system. |

---

## Dev Commands & Config

- Start dev server: `npm run dev`
- Build for production: `npm run build`
- Start production: `npm run start`
- Linting: `npm run lint`

### Key files
- `lib/api.ts` — data adapter (single place to change when switching to a real backend)
- `lib/collections.ts` — collection types + demo data
- `context/*` — local state (cart, wishlist, auth)
- `app/*` — routes and pages

---

## QA Handoff Checklist (final)

- [ ] Backend implements endpoints or `lib/api.ts` maps backend fields correctly.
- [ ] `app/products` renders list and pagination (if required).
- [ ] Product detail images, sizes, and add‑to‑cart work.
- [ ] Cart persisted to backend; localStorage fallback maintained.
- [ ] Auth integration tested (cookies or JWT).
- [ ] Remote image domains configured in `next.config.ts`.
- [ ] TypeScript and ESLint pass on CI.

---

*Happy coding!*

This repo is a Next.js (App Router) TypeScript frontend for the Joy Clothes storefront. I reviewed the codebase and generated this README to match the actual implementation.

Highlights from the code:
- Data layer: `lib/api.ts` is the single entry point for data access. It currently returns mock data (imports from `lib/products.ts`).
- Mock data: `lib/products.ts` defines `Product` and `Collection` interfaces and the demo `allProducts` / `collections` arrays.
- Contexts: `context/CartContext.tsx`, `context/WishlistContext.tsx`, and `context/AuthContext.tsx` persist to `localStorage` and do not call external APIs.
- Pages: `app/products/page.tsx` uses `getAllProducts()` server-side; product detail `app/products/[handle]/page.tsx` fetches data client-side via `useEffect` and `lib/api` helpers.

---

## Project quick facts

- Next version: 16.x (see `package.json`) — App Router used.
- Scripts: `dev`, `build`, `start`, `lint`.
- Image remote hosts authorized: `lh3.googleusercontent.com`, `wallpapercave.com`, `images.unsplash.com` (`next.config.ts`).

---

## Data layer — exact behavior (what I found)

- `lib/api.ts` exports:
  - `getHomepageData()` — returns `HomepageData` (mock)
  - `getAllProducts()` — returns `allProducts` (mock)
  - `getProductByHandle(handle)` — finds product in `allProducts`
  - `getCollectionByHandle(handle)` — finds collection in `collections`

- The file header explicitly documents how to switch to Shopify or any real backend by replacing the MOCK section with a real API adapter.

Implication: to connect a real backend you only need to update `lib/api.ts` (recommended).

---

## Data shapes (from `lib/products.ts`)

Product interface (fields used by UI):
- `id`, `handle`, `name`, `description`, `price`, `mrp`, `discount`, `images[]`, `color`, `sizes[]`, `inStock`, `category`, `rating`, `reviews`.

Collection interface:
- `id`, `title`, `handle`, `description?`, `products: Product[]`.

Include these exact fields in backend responses or map backend fields to these names in `lib/api.ts`.

---

## Contexts & auth (exact behavior)

- `CartContext`:
  - Persists cart to `localStorage` key `shoprine-cart`.
  - Exposes `items`, `addItem`, `removeItem`, `updateQuantity`, `clearCart`, `totalItems`, `totalPrice`.
  - No network sync currently; local-only.

- `WishlistContext`:
  - Persists to `localStorage` key `shoprine-wishlist`.
  - Exposes `items`, `add`, `remove`, `toggle`, `has`, `clear`.

- `AuthContext`:
  - Mock auth: `signIn`, `signUp` write a simple user object to `localStorage` key `jc_user` and set `user` in context.
  - Exposes `user`, `loading`, `signIn`, `signUp`, `signOut`.

If you want server-backed auth, update these contexts to call your auth endpoints and handle tokens/cookies.

---

## Pages & where they fetch data (important for migration)

- `app/products/page.tsx` — Server Component; calls `getAllProducts()` (no client JS required for initial render).
- `app/products/[handle]/page.tsx` — Client Component (`"use client"`) that uses `useEffect` to call `getProductByHandle()` and `getAllProducts()` for related products.
- Other components (Navbar, Wishlist, etc.) call `getAllProducts()` client-side for search/filter in Navbar and Wishlist pages.

Migration note: server-rendered pages are simpler to migrate (update `lib/api.ts` to fetch real data). Client pages already rely on `lib/api` and will pick up changes immediately.

---

## How to switch from mock → real backend (exact steps)

1) Choose your backend endpoints and decide on base URL. Set in `.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=https://api.your-backend.com
```

2) Update `lib/api.ts`:
  - Replace mock implementations with real fetch calls to your backend (or Shopify mapping). Keep the same exported function names (`getAllProducts`, `getProductByHandle`, etc.) so the rest of the code is unchanged.
  - Map backend fields to the `Product`/`Collection` shapes shown above.

Example adapter (replace inside `lib/api.ts`):

```ts
const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE}/api/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  const json = await res.json();
  // map json.data -> Product[] if needed
  return json.data;
}
```

3) Auth & cookies:
  - If backend uses sessions/cookies, include `credentials: 'include'` in fetch calls and configure CORS on the backend.
  - If using JWT, update `AuthContext` to store tokens and attach `Authorization` headers in `lib/api` helper.

4) Cart/wishlist sync:
  - Update `CartContext` methods to POST/GET to `/api/cart` and reconcile responses; keep localStorage as fallback for offline.

5) Images:
  - If backend returns external image hosts, add them to `next.config.ts` `images.remotePatterns` or `images.domains`.

6) Test locally with a mock server (optional):
  - Create `mocks/db.json` and run `json-server --watch mocks/db.json --port 4000`.
  - Set `NEXT_PUBLIC_API_BASE_URL=http://localhost:4000` and verify pages load.

---

## Recommended migration checklist (step-by-step)

1. Add `NEXT_PUBLIC_API_BASE_URL` in `.env.local` and commit env example to docs.
2. Implement network adapter in `lib/api.ts` that forwards to `BASE`.
3. Map backend response to `Product`/`Collection` types in `lib/api.ts`.
4. Test `app/products/page.tsx` (server) first.
5. Test `app/products/[handle]/page.tsx` (client) and related product logic.
6. Update `CartContext` to sync with `/api/cart` but keep localStorage fallback and optimistic UI.
7. Validate images, CORS, and auth flows.

---

## Dev commands & config

- Start dev server: `npm run dev`
- Build for production: `npm run build`
- Start production: `npm run start`
- Linting: `npm run lint`

- Key files:
  - `lib/api.ts` — data adapter (single place to change)
  - `lib/products.ts` — product types + demo data
  - `context/*` — local state
  - `app/*` — routes and pages

---

## QA handoff checklist (final)

- [ ] Backend implements endpoints or `lib/api.ts` maps backend fields correctly.
- [ ] `app/products` renders list and pagination (if required).
- [ ] Product detail images, sizes, and add-to-cart work.
- [ ] Cart persisted to backend; localStorage fallback maintained.
- [ ] Auth integration tested (cookies or JWT).
- [ ] Remote image domains configured in `next.config.ts`.
- [ ] TypeScript and ESLint pass on CI.

---

