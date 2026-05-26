"use client";

import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";
import { Product } from "@/types";
import { getProductGradient } from "@/data/mockProducts";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { add } = useCart();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--dusk-border)] bg-card transition-all duration-300 hover:border-[var(--dusk-border-hover)] hover:shadow-[var(--dusk-glow)]">
      {/* Image / Gradient area */}
      <Link href={`/shop/${product.id}`} className="relative aspect-[3/4] overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
          style={{ background: getProductGradient(product.id) }}
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.newArrival && (
            <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
              New
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-red-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
              -{discount}%
            </span>
          )}
        </div>

        {/* Quick-add overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 z-10 p-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              add(product, product.sizes?.[0], product.colors?.[0]?.name);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            <ShoppingBag size={15} /> Add to Cart
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-[11px] font-medium uppercase tracking-widest text-dim">
          {product.category}
        </p>
        <Link href={`/shop/${product.id}`} className="text-sm font-semibold leading-snug text-foreground hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-0.5">
          <Star size={12} className="fill-accent text-accent" />
          <span className="text-xs text-muted">{product.rating}</span>
          <span className="text-xs text-dim">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="mt-auto flex items-center gap-2 pt-2">
          <span className="text-base font-bold text-foreground">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-sm text-dim line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  );
}
