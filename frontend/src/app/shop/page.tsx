"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown, Package } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductCard from "@/components/ui/ProductCard";
import { mockProducts } from "@/data/mockProducts";
import { mockCategories } from "@/data/mockCategories";

type SortOption = "featured" | "price-low" | "price-high" | "newest" | "rating";

const PRICE_RANGES = [
  { label: "Under ₹1,000", min: 0, max: 999 },
  { label: "₹1,000 – ₹3,000", min: 1000, max: 3000 },
  { label: "₹3,000 – ₹5,000", min: 3000, max: 5000 },
  { label: "₹5,000+", min: 5000, max: Infinity },
] as const;

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low → High" },
  { value: "price-high", label: "Price: High → Low" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Rating" },
];

export default function ShopPage() {
  const searchParams = useSearchParams();
  const preCategory = searchParams.get("category") ?? "";

  /* ── filter state ─────────────────────────────── */
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    preCategory ? [preCategory] : []
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [sort, setSort] = useState<SortOption>("featured");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sync URL ?category= on mount / change
  useEffect(() => {
    if (preCategory && !selectedCategories.includes(preCategory)) {
      setSelectedCategories([preCategory]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preCategory]);

  /* ── category helpers ─────────────────────────── */
  // Extract unique category slugs that actually appear in products
  const categoryOptions = useMemo(() => {
    return mockCategories.filter((c) =>
      c.slug !== "new-arrivals" // handled separately
    );
  }, []);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  /* ── filtered & sorted products ───────────────── */
  const filteredProducts = useMemo(() => {
    let products = [...mockProducts];

    // category
    if (selectedCategories.length > 0) {
      products = products.filter((p) => selectedCategories.includes(p.category));
    }

    // price range
    if (selectedPriceRange !== null) {
      const range = PRICE_RANGES[selectedPriceRange];
      products = products.filter((p) => p.price >= range.min && p.price <= range.max);
    }

    // sort
    switch (sort) {
      case "price-low":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        products.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        products.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
        break;
      case "rating":
        products.sort((a, b) => b.rating - a.rating);
        break;
      default: // featured
        products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return products;
  }, [selectedCategories, selectedPriceRange, sort]);

  const activeFilterCount =
    selectedCategories.length + (selectedPriceRange !== null ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRange(null);
    setSort("featured");
  };

  /* ── sidebar content (shared mobile / desktop) ── */
  const FilterSidebar = (
    <aside className="flex flex-col gap-8">
      {/* ── Category Filter ──────────────────────── */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
          Category
        </h3>
        <div className="flex flex-col gap-2">
          {categoryOptions.map((cat) => (
            <label
              key={cat.id}
              id={`filter-cat-${cat.slug}`}
              className="group flex cursor-pointer items-center gap-2.5 text-sm transition-colors hover:text-foreground"
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all duration-200 ${
                  selectedCategories.includes(cat.slug)
                    ? "border-primary bg-primary text-white"
                    : "border-[var(--dusk-border)] bg-transparent text-transparent group-hover:border-[var(--dusk-border-hover)]"
                }`}
              >
                {selectedCategories.includes(cat.slug) && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span
                className={
                  selectedCategories.includes(cat.slug)
                    ? "text-foreground font-medium"
                    : "text-muted"
                }
              >
                {cat.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* ── Price Range ──────────────────────────── */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
          Price Range
        </h3>
        <div className="flex flex-col gap-2">
          {PRICE_RANGES.map((range, idx) => (
            <label
              key={idx}
              id={`filter-price-${idx}`}
              className="group flex cursor-pointer items-center gap-2.5 text-sm transition-colors hover:text-foreground"
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                  selectedPriceRange === idx
                    ? "border-primary bg-primary"
                    : "border-[var(--dusk-border)] group-hover:border-[var(--dusk-border-hover)]"
                }`}
              >
                {selectedPriceRange === idx && (
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </span>
              <span
                className={
                  selectedPriceRange === idx
                    ? "text-foreground font-medium"
                    : "text-muted"
                }
              >
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* ── Sort ─────────────────────────────────── */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
          Sort By
        </h3>
        <div className="relative">
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="w-full appearance-none rounded-lg border border-[var(--dusk-border)] bg-elevated px-3 py-2.5 pr-9 text-sm text-foreground outline-none transition-colors focus:border-[var(--dusk-border-hover)] hover:border-[var(--dusk-border-hover)]"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-dim"
          />
        </div>
      </div>

      {/* ── Clear ────────────────────────────────── */}
      {activeFilterCount > 0 && (
        <button
          id="clear-filters-btn"
          onClick={clearAllFilters}
          className="mt-auto text-xs font-medium text-primary transition-colors hover:text-primary-light"
        >
          Clear all filters
        </button>
      )}
    </aside>
  );

  /* ── render ───────────────────────────────────── */
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="animate-fade-in mb-6">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
        </div>

        {/* Header */}
        <div className="animate-fade-in-up mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="gradient-text text-4xl font-extrabold tracking-tight sm:text-5xl">
              Shop All
            </h1>
            <p className="mt-2 text-sm text-muted">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"} found
            </p>
          </div>

          {/* Mobile filter toggle */}
          <button
            id="mobile-filter-toggle"
            onClick={() => setMobileOpen(true)}
            className="btn-outline lg:hidden"
          >
            <SlidersHorizontal size={16} />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Two-column layout */}
        <div className="flex gap-10">
          {/* Desktop sidebar */}
          <div className="hidden w-56 shrink-0 lg:block animate-fade-in">
            <div className="sticky top-24">{FilterSidebar}</div>
          </div>

          {/* Product grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="animate-fade-in-up flex flex-col items-center justify-center rounded-2xl border border-[var(--dusk-border)] bg-card py-20 text-center">
                <Package size={48} className="mb-4 text-dim" />
                <p className="text-lg font-semibold text-foreground">
                  No products found
                </p>
                <p className="mt-1 text-sm text-muted">
                  Try adjusting your filters to see more results.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="btn-primary mt-6"
                  id="empty-clear-filters"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product, i) => (
                  <div
                    key={product.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${Math.min(i * 60, 600)}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile filter drawer ───────────────── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
      />
      {/* Panel */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto bg-elevated p-6 shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Filters</h2>
          <button
            id="close-mobile-filters"
            onClick={() => setMobileOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>
        {FilterSidebar}
      </div>
    </main>
  );
}
