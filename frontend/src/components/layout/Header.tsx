"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, User, Menu, X, Sun, Moon } from "lucide-react";
import { useCart } from "@/hooks/useCart";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const pathname = usePathname();
  const { count } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Check initial theme
    if (document.documentElement.classList.contains("light-mode")) {
      setTheme("light");
    }
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.add("light-mode");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  /* lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass ${
          scrolled ? "shadow-lg py-3" : "py-5 border-b-transparent"
        }`}
        id="site-header"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" id="header-logo">
            <span className="text-2xl font-bold tracking-tight gradient-text transition-transform duration-300 group-hover:scale-105">
              DUSK
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" id="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-200
                  after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:rounded-full
                  after:bg-primary after:transition-all after:duration-300
                  ${
                    isActive(link.href)
                      ? "text-foreground after:w-full"
                      : "text-muted hover:text-foreground after:w-0 hover:after:w-full"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200
                text-muted hover:text-foreground hover:bg-white/5"
              aria-label="Toggle Theme"
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Search */}
            <button
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200
                text-muted hover:text-foreground hover:bg-white/5"
              aria-label="Search"
              onClick={() => setSearchOpen(!searchOpen)}
              id="header-search"
            >
              <Search size={18} />
            </button>

            {/* Account */}
            <Link
              href="/login"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200
                text-muted hover:text-foreground hover:bg-white/5"
              aria-label="Account"
              id="header-account"
            >
              <User size={18} />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200
                text-muted hover:text-foreground hover:bg-white/5"
              aria-label="Cart"
              id="header-cart"
            >
              <ShoppingBag size={18} />
              <span
                className={`absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full
                  text-[10px] font-bold text-white transition-all duration-200 ${
                    count > 0 ? "bg-accent scale-100" : "bg-primary scale-100"
                  }`}
              >
                {count}
              </span>
            </Link>

            {/* Mobile toggle */}
            <button
              className="flex md:hidden h-9 w-9 items-center justify-center rounded-full text-muted hover:text-foreground hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              id="header-mobile-toggle"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search bar dropdown */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            searchOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mx-auto max-w-7xl px-6 pb-4 pt-2">
            <div className="flex items-center gap-3 rounded-xl border border-[var(--dusk-border)] bg-card px-4 py-2.5 focus-within:border-primary transition-colors">
              <Search size={16} className="text-dim" />
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-dim outline-none"
                id="search-input"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-elevated border-l border-[var(--dusk-border)] p-8 pt-20
            transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <nav className="flex flex-col gap-6" id="mobile-nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg font-medium transition-colors ${
                  isActive(link.href) ? "text-primary" : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-[var(--dusk-border)]" />
            <Link
              href="/login"
              className="flex items-center gap-3 text-muted hover:text-foreground transition-colors"
            >
              <User size={18} /> Account
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-3 text-muted hover:text-foreground transition-colors"
            >
              <ShoppingBag size={18} /> Cart {count > 0 && `(${count})`}
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
