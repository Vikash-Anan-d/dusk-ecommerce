"use client";

import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (qty: number) => void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  return (
    <div className="inline-flex items-center gap-0 rounded-lg border border-[var(--dusk-border)] overflow-hidden">
      <button
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        className="flex h-9 w-9 items-center justify-center text-muted transition-colors hover:bg-white/5 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </button>
      <span className="flex h-9 w-10 items-center justify-center text-sm font-semibold text-foreground bg-white/[0.02]">
        {quantity}
      </span>
      <button
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        className="flex h-9 w-9 items-center justify-center text-muted transition-colors hover:bg-white/5 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
