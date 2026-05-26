"use client";

import Link from "next/link";

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "/shop?filter=new" },
      { label: "Best Sellers", href: "/shop?filter=best" },
      { label: "Collections", href: "/collections" },
      { label: "Sale", href: "/shop?filter=sale" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--dusk-border)] bg-elevated" id="site-footer">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand + newsletter */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight gradient-text">DUSK</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Premium fashion &amp; lifestyle curated for those who dare to stand out after dark.
            </p>

            {/* Newsletter */}
            <div className="mt-2">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-dim">
                Stay in the loop
              </p>
              <form
                className="flex overflow-hidden rounded-lg border border-[var(--dusk-border)] focus-within:border-primary transition-colors"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="flex-1 bg-transparent px-4 py-2.5 text-sm text-foreground placeholder:text-dim outline-none"
                  id="newsletter-email"
                />
                <button
                  type="submit"
                  className="bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                  id="newsletter-submit"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-dim">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors duration-200 hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[var(--dusk-border)] pt-8 sm:flex-row">
          <p className="text-xs text-dim">&copy; {new Date().getFullYear()} DUSK. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-dim">
            <Link href="/privacy" className="hover:text-muted transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-muted transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-muted transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
