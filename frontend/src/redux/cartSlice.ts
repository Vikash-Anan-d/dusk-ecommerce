import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types";

interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ product: Product; size?: string; color?: string }>) {
      const { product, size, color } = action.payload;
      const existing = state.items.find(
        (item) => item.product.id === product.id && item.size === size && item.color === color
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product, quantity: 1, size, color });
      }
    },

    removeFromCart(state, action: PayloadAction<{ productId: string; size?: string; color?: string }>) {
      const { productId, size, color } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.product.id === productId && item.size === size && item.color === color)
      );
    },

    updateQuantity(
      state,
      action: PayloadAction<{ productId: string; size?: string; color?: string; quantity: number }>
    ) {
      const { productId, size, color, quantity } = action.payload;
      const item = state.items.find(
        (item) => item.product.id === productId && item.size === size && item.color === color
      );
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// ── Selectors ─────────────────────────────────
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
