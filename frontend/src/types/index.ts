// ── Product ──────────────────────────────────
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  sizes?: string[];
  colors?: ProductColor[];
  featured?: boolean;
  trending?: boolean;
  newArrival?: boolean;
}

export interface ProductColor {
  name: string;
  hex: string;
}

// ── Category ─────────────────────────────────
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  gradient: string; // CSS gradient for visual card
}

// ── Cart ──────────────────────────────────────
export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

// ── User / Auth ──────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// ── Order ────────────────────────────────────
export interface OrderItem {
  product: string; // product ID
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

export interface Order {
  id: string;
  user: string;
  items: OrderItem[];
  totalPrice: number;
  shippingAddress: ShippingAddress;
  paymentStatus: "pending" | "paid" | "failed";
  orderStatus: "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

// ── Collection ───────────────────────────────
export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  gradient: string;
  productIds: string[];
}
