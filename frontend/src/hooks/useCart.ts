"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectCartCount,
  selectCartTotal,
} from "@/redux/cartSlice";
import { Product } from "@/types";

export function useCart() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => selectCartItems(state));
  const count = useSelector((state: RootState) => selectCartCount(state));
  const total = useSelector((state: RootState) => selectCartTotal(state));

  return {
    items,
    count,
    total,

    add: (product: Product, size?: string, color?: string) =>
      dispatch(addToCart({ product, size, color })),

    remove: (productId: string, size?: string, color?: string) =>
      dispatch(removeFromCart({ productId, size, color })),

    update: (productId: string, quantity: number, size?: string, color?: string) =>
      dispatch(updateQuantity({ productId, size, color, quantity })),

    clear: () => dispatch(clearCart()),
  };
}
