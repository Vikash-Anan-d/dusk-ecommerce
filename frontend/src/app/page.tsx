"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Truck, ChevronRight, Star, Zap } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import CategoryCard from "@/components/ui/CategoryCard";
import { mockProducts } from "@/data/mockProducts";
import { mockCategories } from "@/data/mockCategories";

const featuredProducts = mockProducts.filter((p) => p.featured);
const trendingProducts = mockProducts.filter((p) => p.trending);

const testimonials = [
  {
    name: "Arjun M.",
    text: "The quality of DUSK pieces is unmatched. The Velvet Bomber is now my go-to jacket for every night out.",
    rating: 5,
  },
  {
    name: "Priya S.",
    text: "Finally found a brand that understands premium streetwear. The fit, the fabric — everything is perfect.",
    rating: 5,
  },
  {
    name: "Rahul K.",
    text: "Ordered the Chelsea Boots and they arrived beautifully packaged. The attention to detail is incredible.",
    rating: 4,
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero Section ────────────────────────── */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6" id="hero">
        {/* Animated background glow orbs */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-primary/8 blur-[140px] animate-float" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-accent/8 blur-[120px] animate-float delay-200" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[100px] animate-pulse-glow" />

        {/* Grid pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(167,139,250,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
          {/* Announcement tag */}
          <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--dusk-border)] bg-card/80 backdrop-blur-sm px-5 py-2 text-xs font-medium text-muted animate-fade-in hover:border-[var(--dusk-border-hover)] transition-colors cursor-default">
            <Sparkles size={14} className="text-accent animate-pulse-glow" />
            New Collection 2026 — Just Dropped
          </span>

          {/* Title */}
          <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-8xl animate-fade-in-up">
            Elevate Your Style
            <br />
            <span className="gradient-text">After Dark</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl animate-fade-in-up delay-200">
            Premium fashion &amp; lifestyle curated for those who dare to stand out.
            Discover bold designs, elevated essentials, and exclusive drops.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row animate-fade-in-up delay-300">
            <Link href="/shop" className="btn-primary text-base px-10 py-3.5 text-base" id="hero-shop-cta">
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link href="/collections" className="btn-outline text-base px-10 py-3.5" id="hero-collections-cta">
              View Collections
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex items-center gap-6 text-sm text-dim animate-fade-in delay-400">
            <div className="flex -space-x-2">
              {["#7c3aed", "#f59e0b", "#06b6d4", "#ef4444"].map((color, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-background"
                  style={{ background: color }}
                />
              ))}
            </div>
            <span>
              <strong className="text-foreground">50,000+</strong> happy customers
            </span>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ───────────────────────────── */}
      <section className="border-y border-[var(--dusk-border)] bg-elevated/50" id="trust-bar">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[var(--dusk-border)] px-6 py-0 sm:grid-cols-3">
          {[
            { icon: <Truck size={22} />, title: "Free Shipping", desc: "On orders over ₹999" },
            { icon: <Zap size={22} />, title: "Fast Delivery", desc: "2-4 business days" },
            { icon: <Sparkles size={22} />, title: "Premium Quality", desc: "Handpicked essentials" },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-center gap-4 py-6 px-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-xs text-dim">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Products ───────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-20" id="featured-products">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Curated for you</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Featured Products
            </h2>
          </div>
          <Link
            href="/shop?filter=featured"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-muted hover:text-primary transition-colors"
          >
            View All <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.slice(0, 4).map((product, i) => (
            <div key={product.id} className={`animate-fade-in-up delay-${(i + 1) * 100}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center sm:hidden">
          <Link href="/shop" className="btn-outline px-8 py-2.5 text-sm">
            View All Products <ChevronRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── Categories ──────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-16" id="categories">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Browse</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Shop by Category</h2>
        </div>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
          {mockCategories.map((category, i) => (
            <div key={category.id} className={`animate-fade-in-up delay-${(i + 1) * 100}`}>
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Trending Products ───────────────────── */}
      <section className="bg-elevated/30 border-y border-[var(--dusk-border)]" id="trending">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
                <TrendingUp size={12} className="inline mr-1" />
                Hot right now
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Trending
              </h2>
            </div>
            <Link
              href="/shop?filter=trending"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-muted hover:text-primary transition-colors"
            >
              See More <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {trendingProducts.slice(0, 4).map((product, i) => (
              <div key={product.id} className={`animate-fade-in-up delay-${(i + 1) * 100}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-20" id="testimonials">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">What people say</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Loved by Thousands</h2>
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`glass rounded-2xl p-6 animate-fade-in-up delay-${(i + 1) * 100}`}
            >
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: t.rating }, (_, j) => (
                  <Star key={j} size={14} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-muted mb-4">&ldquo;{t.text}&rdquo;</p>
              <p className="text-sm font-semibold text-foreground">{t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pb-20" id="cta-banner">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-dark via-primary to-accent/40 p-12 sm:p-16 text-center">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/5 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/5 blur-2xl" />

          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold text-white sm:text-5xl">
              Ready to Stand Out?
            </h2>
            <p className="mt-4 max-w-lg mx-auto text-base text-white/80">
              Join 50,000+ people who chose DUSK to redefine their style. Free shipping on your first order.
            </p>
            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black transition-transform hover:scale-105"
              id="cta-shop"
            >
              Start Shopping <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
