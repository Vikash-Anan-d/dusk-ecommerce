"use client";

import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import { ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import StarRating from "@/components/ui/StarRating";
import QuantitySelector from "@/components/ui/QuantitySelector";
import ProductCard from "@/components/ui/ProductCard";
import { useCart } from "@/hooks/useCart";
import { mockProducts, getProductGradient } from "@/data/mockProducts";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { add } = useCart();
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0]?.name || "");
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    setIsAdding(true);
    add(product, selectedSize, selectedColor);
    setTimeout(() => setIsAdding(false), 500);
  };

  const relatedProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: product.name },
        ]}
      />

      <div className="mt-8 flex flex-col gap-12 lg:flex-row lg:items-start">
        {/* Left: Product Image / Gradient */}
        <div className="lg:w-3/5 shrink-0">
          <div
            className="group relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-[var(--dusk-border)] shadow-xl sm:aspect-[4/5] lg:sticky lg:top-28 animate-fade-in"
            style={{ background: getProductGradient(product.id) }}
          >
            {/* Badges */}
            <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
              {product.newArrival && (
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                  New Arrival
                </span>
              )}
              {discount > 0 && (
                <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                  {discount}% OFF
                </span>
              )}
            </div>
            {/* If we had actual images, we'd place next/image here with objectFit="cover" and mix-blend mode over the gradient */}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-1 flex-col animate-fade-in-up delay-100">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {product.category}
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} size={16} />
              <span className="text-sm text-foreground font-medium">{product.rating}</span>
            </div>
            <span className="h-4 w-px bg-[var(--dusk-border)]" />
            <span className="text-sm text-muted">{product.reviewCount} Reviews</span>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <span className="text-3xl font-bold text-foreground">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="mb-1 text-lg font-medium text-dim line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <p className="mt-6 leading-relaxed text-muted">{product.description}</p>

          {/* Divider */}
          <hr className="my-8 border-[var(--dusk-border)]" />

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold uppercase tracking-wider text-foreground">
                  Size
                </span>
                <button className="text-xs font-medium text-muted hover:text-primary underline-offset-4 hover:underline transition-all">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex h-12 min-w-[3rem] items-center justify-center rounded-xl border px-4 text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "border-primary bg-primary text-white shadow-[var(--dusk-glow)]"
                        : "border-[var(--dusk-border)] bg-card text-muted hover:border-muted hover:text-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-8">
              <span className="mb-3 block text-sm font-bold uppercase tracking-wider text-foreground">
                Color <span className="font-normal text-muted ml-1 capitalize">{selectedColor}</span>
              </span>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                      selectedColor === color.name ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110" : "hover:scale-110"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    aria-label={`Select color ${color.name}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <QuantitySelector
              quantity={quantity}
              onChange={setQuantity}
              max={product.stock}
            />
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || isAdding}
              className={`btn-primary flex flex-1 items-center justify-center gap-2 py-4 text-base transition-all ${
                isAdding ? "scale-[0.98] opacity-90" : ""
              }`}
            >
              <ShoppingBag size={18} />
              {isAdding ? "Added!" : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
            <button
              className="flex h-14 w-14 items-center justify-center rounded-xl border border-[var(--dusk-border)] bg-card text-muted transition-colors hover:border-primary hover:text-primary hover:bg-primary/5 shrink-0"
              aria-label="Add to wishlist"
            >
              <Heart size={20} />
            </button>
          </div>

          {/* Stock status */}
          <div className="mb-8 flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${product.stock > 10 ? "bg-green-500" : product.stock > 0 ? "bg-accent" : "bg-red-500"}`} />
            <span className="text-sm font-medium text-muted">
              {product.stock > 10
                ? "In stock and ready to ship"
                : product.stock > 0
                ? `Only ${product.stock} left in stock`
                : "Out of stock"}
            </span>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl border border-[var(--dusk-border)] bg-elevated/50 p-5">
            <div className="flex items-center gap-3">
              <Truck size={18} className="text-primary" />
              <span className="text-sm font-medium">Free Shipping over ₹999</span>
            </div>
            <div className="flex items-center gap-3">
              <RefreshCw size={18} className="text-primary" />
              <span className="text-sm font-medium">14-Day Easy Returns</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck size={18} className="text-primary" />
              <span className="text-sm font-medium">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-32">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight">You Might Also Like</h2>
          </div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p, i) => (
              <div key={p.id} className={`animate-fade-in-up delay-${Math.min((i + 1) * 100, 500)}`}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
