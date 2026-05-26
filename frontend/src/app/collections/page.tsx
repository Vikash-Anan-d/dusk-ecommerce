import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { mockCollections } from "@/data/mockCategories";

export default function CollectionsPage() {
  return (
    <main className="min-h-screen">
      {/* ── Breadcrumb ─────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Collections" },
          ]}
        />
      </div>

      {/* ── Header ─────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pt-10 pb-6 text-center animate-fade-in">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          <span className="gradient-text">Curated Collections</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          Handpicked edits that tell a story. Explore our thoughtfully assembled
          collections — from streetwear staples to luxury gifting sets.
        </p>
      </section>

      {/* ── Collections Grid ───────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-8">
        <div className="grid gap-8 sm:grid-cols-2">
          {mockCollections.map((collection, index) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-[var(--dusk-border)] transition-all duration-500 hover:border-[var(--dusk-border-hover)] hover:shadow-[var(--dusk-glow)] animate-fade-in-up`}
              style={{
                animationDelay: `${index * 100}ms`,
                aspectRatio: "16 / 9",
              }}
              id={`collection-card-${collection.id}`}
            >
              {/* Gradient background */}
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{ background: collection.gradient }}
              />

              {/* Dark overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Content */}
              <div className="relative z-10 p-6 sm:p-8">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-white">
                  {collection.name}
                </h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/80">
                  {collection.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-light transition-all group-hover:gap-3">
                  Explore
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>

              {/* Product count badge */}
              <div className="absolute top-4 right-4 z-10 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm border border-white/10">
                {collection.productIds.length} Products
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
