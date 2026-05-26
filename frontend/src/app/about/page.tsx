import Link from "next/link";
import {
  ArrowRight,
  Gem,
  Leaf,
  Users,
  Star,
  Globe,
  ShoppingBag,
  Heart,
  Shield,
  Sparkles,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* ── Hero Section ───────────────────────── */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-28 sm:py-36 text-center">
        {/* Background glow orbs */}
        <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[140px]" />
        <div className="pointer-events-none absolute -bottom-32 right-1/4 h-[400px] w-[400px] rounded-full bg-accent/8 blur-[120px]" />

        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--dusk-border)] bg-card px-4 py-1.5 text-xs font-medium text-muted animate-fade-in">
          <Sparkles size={14} className="text-accent" />
          Est. 2024
        </span>

        <h1 className="relative z-10 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl animate-fade-in-up">
          <span className="gradient-text">Our Story</span>
        </h1>
        <p className="relative z-10 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted animate-fade-in-up delay-200">
          DUSK was born from a simple belief — that premium fashion should be
          accessible, sustainable, and unapologetically bold. We design for the
          moments after sunset, when confidence peaks and style speaks volumes.
        </p>
      </section>

      {/* ── Mission Cards ──────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: <Gem size={28} />,
              title: "Quality",
              description:
                "Every piece is crafted from premium materials — from 280gsm cotton to full-grain leather. We obsess over stitching, fit, and finish so you never have to compromise.",
              gradient: "from-violet-500/20 to-purple-600/20",
            },
            {
              icon: <Leaf size={28} />,
              title: "Sustainability",
              description:
                "Ethical factories, recycled packaging, and carbon-neutral shipping. We believe luxury and responsibility aren't mutually exclusive — they're inseparable.",
              gradient: "from-emerald-500/20 to-teal-600/20",
            },
            {
              icon: <Users size={28} />,
              title: "Community",
              description:
                "More than a brand — we're a movement. From local artist collabs to our global DUSK Collective, we build connections that transcend borders.",
              gradient: "from-amber-500/20 to-orange-600/20",
            },
          ].map((card, index) => (
            <div
              key={card.title}
              className={`group relative overflow-hidden rounded-2xl border border-[var(--dusk-border)] bg-card p-8 transition-all duration-500 hover:border-[var(--dusk-border-hover)] hover:shadow-[var(--dusk-glow)] animate-fade-in-up`}
              style={{ animationDelay: `${index * 120}ms` }}
            >
              {/* Subtle gradient glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />
              <div className="relative z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  {card.icon}
                </div>
                <h3 className="mt-5 text-xl font-bold">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats Bar ──────────────────────────── */}
      <section className="border-y border-[var(--dusk-border)] bg-elevated/50">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 py-14 sm:grid-cols-4">
          {[
            { value: "50K+", label: "Customers", icon: <ShoppingBag size={18} /> },
            { value: "500+", label: "Products", icon: <Star size={18} /> },
            { value: "20+", label: "Countries", icon: <Globe size={18} /> },
            { value: "4.8", label: "Rating", icon: <Heart size={18} /> },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center animate-fade-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-2 text-primary">{stat.icon}</div>
              <span className="text-3xl font-extrabold tracking-tight gradient-text sm:text-4xl">
                {stat.value}
              </span>
              <span className="mt-1 text-sm text-muted">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Brand Values ───────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl animate-fade-in">
            What We <span className="gradient-text">Stand For</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted animate-fade-in delay-100">
            Our values guide every decision — from design to delivery.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <Shield size={22} />,
              title: "Authenticity",
              desc: "No knockoffs, no shortcuts. Every product is 100% original.",
            },
            {
              icon: <Sparkles size={22} />,
              title: "Innovation",
              desc: "Tech fabrics, AR try-ons, and drops that push boundaries.",
            },
            {
              icon: <Heart size={22} />,
              title: "Inclusivity",
              desc: "Sizes for all, styles for everyone, designed without limits.",
            },
            {
              icon: <Globe size={22} />,
              title: "Global Vision",
              desc: "Local roots, global reach. Shipping to 20+ countries.",
            },
          ].map((value, index) => (
            <div
              key={value.title}
              className={`group flex flex-col items-center text-center rounded-xl p-6 transition-all hover:bg-card animate-fade-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                {value.icon}
              </div>
              <h3 className="mt-4 font-bold">{value.title}</h3>
              <p className="mt-2 text-sm text-muted">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Section ────────────────────────── */}
      <section className="relative overflow-hidden border-t border-[var(--dusk-border)]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl animate-fade-in">
            Ready to Explore?
          </h2>
          <p className="mt-4 max-w-lg text-muted animate-fade-in delay-100">
            Discover the full DUSK collection — bold pieces designed for those
            who refuse to blend in.
          </p>
          <Link
            href="/shop"
            className="btn-primary mt-8 px-10 py-3.5 text-base animate-fade-in-up delay-200"
            id="about-shop-cta"
          >
            Shop the Collection <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
