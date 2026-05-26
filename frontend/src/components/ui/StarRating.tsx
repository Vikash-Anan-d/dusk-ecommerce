import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
}

export default function StarRating({ rating, size = 14 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i + 1 <= Math.floor(rating);
        const half = !filled && i < rating;
        return (
          <Star
            key={i}
            size={size}
            className={
              filled
                ? "fill-accent text-accent"
                : half
                ? "fill-accent/50 text-accent"
                : "fill-none text-dim"
            }
          />
        );
      })}
    </div>
  );
}
