import Link from "next/link";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl p-5 transition-transform duration-300 hover:scale-[1.02]"
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-90"
        style={{ background: category.gradient }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-lg font-bold text-white">{category.name}</h3>
        <p className="mt-0.5 text-sm text-white/70">{category.description}</p>
        <p className="mt-2 text-xs font-medium text-white/50">{category.productCount} products</p>
      </div>
    </Link>
  );
}
