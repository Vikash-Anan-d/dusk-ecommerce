"use client";

import Link from "next/link";
import { ShoppingBag, Trash2, ArrowRight, ArrowLeft } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import QuantitySelector from "@/components/ui/QuantitySelector";
import { useCart } from "@/hooks/useCart";
import { getProductGradient } from "@/data/mockProducts";

export default function CartPage() {
  const { items, count, total, update, remove, clear } = useCart();

  const shipping = total >= 999 ? 0 : 99;
  const grandTotal = total + shipping;

  return (
    <main className="min-h-screen">
      {/* ── Breadcrumb ─────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Cart" },
          ]}
        />
      </div>

      {/* ── Title ──────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 pt-8 pb-2 animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Your Cart
          {count > 0 && (
            <span className="ml-3 text-lg font-normal text-muted">
              ({count} {count === 1 ? "item" : "items"})
            </span>
          )}
        </h1>
      </div>

      {/* ── Empty State ────────────────────────── */}
      {items.length === 0 ? (
        <section className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-32 text-center animate-fade-in-up">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-card border border-[var(--dusk-border)]">
            <ShoppingBag size={40} className="text-dim" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 max-w-sm text-muted">
            Looks like you haven&apos;t added anything yet. Browse our collections and find something you love.
          </p>
          <Link
            href="/shop"
            className="btn-primary mt-8 px-8 py-3 text-base"
            id="cart-empty-shop-cta"
          >
            Continue Shopping <ArrowRight size={16} />
          </Link>
        </section>
      ) : (
        /* ── Cart Content ────────────────────── */
        <section className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* ── Left: Items List ──────────── */}
            <div className="flex-1 space-y-4 animate-fade-in-up">
              {items.map((item) => {
                const itemKey = `${item.product.id}-${item.size ?? "nosize"}-${item.color ?? "nocolor"}`;
                return (
                  <div
                    key={itemKey}
                    className="flex gap-4 rounded-xl border border-[var(--dusk-border)] bg-card p-4 transition-colors hover:border-[var(--dusk-border-hover)] sm:gap-6 sm:p-6"
                    id={`cart-item-${itemKey}`}
                  >
                    {/* Gradient swatch */}
                    <div
                      className="h-24 w-24 shrink-0 rounded-lg sm:h-28 sm:w-28"
                      style={{ background: getProductGradient(item.product.id) }}
                    />

                    {/* Info */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="text-sm font-semibold transition-colors hover:text-primary sm:text-base"
                          id={`cart-item-link-${itemKey}`}
                        >
                          {item.product.name}
                        </Link>
                        <div className="mt-1 flex flex-wrap gap-2 text-xs text-dim">
                          {item.size && (
                            <span className="rounded bg-white/5 px-2 py-0.5">
                              Size: {item.size}
                            </span>
                          )}
                          {item.color && (
                            <span className="rounded bg-white/5 px-2 py-0.5">
                              Color: {item.color}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bottom row: price, qty, remove */}
                      <div className="mt-3 flex flex-wrap items-center gap-4">
                        <span className="text-sm font-bold text-foreground sm:text-base">
                          ₹{item.product.price.toLocaleString("en-IN")}
                        </span>

                        <QuantitySelector
                          quantity={item.quantity}
                          onChange={(qty) =>
                            update(item.product.id, qty, item.size, item.color)
                          }
                          min={1}
                          max={item.product.stock}
                        />

                        <button
                          onClick={() =>
                            remove(item.product.id, item.size, item.color)
                          }
                          className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-dim transition-colors hover:bg-red-500/10 hover:text-red-400"
                          aria-label={`Remove ${item.product.name}`}
                          id={`cart-remove-${itemKey}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Clear cart */}
              <button
                onClick={clear}
                className="text-sm text-dim transition-colors hover:text-red-400"
                id="cart-clear-btn"
              >
                Clear Cart
              </button>
            </div>

            {/* ── Right: Order Summary ─────── */}
            <div className="w-full lg:w-96 animate-fade-in-up delay-200">
              <div className="glass sticky top-8 rounded-2xl p-6 sm:p-8">
                <h2 className="text-lg font-bold">Order Summary</h2>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">Subtotal</span>
                    <span className="font-medium">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-400">Free</span>
                      ) : (
                        `₹${shipping}`
                      )}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-dim">
                      Free shipping on orders over ₹999
                    </p>
                  )}
                  <div className="border-t border-[var(--dusk-border)] pt-3">
                    <div className="flex justify-between text-base font-bold">
                      <span>Total</span>
                      <span className="gradient-text">
                        ₹{grandTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  className="btn-primary mt-8 w-full py-3 text-base"
                  id="cart-checkout-btn"
                >
                  Proceed to Checkout
                </button>

                <Link
                  href="/shop"
                  className="mt-4 flex items-center justify-center gap-2 text-sm text-muted transition-colors hover:text-primary"
                  id="cart-continue-shopping"
                >
                  <ArrowLeft size={14} />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
