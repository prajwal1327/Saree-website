export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  description?: string;
  display_order: number;
  active: boolean;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category_id: number;
  category?: string;
  category_slug?: string;
  price: number;
  sale_price?: number;
  description: string;
  fabric: string;
  colors: ProductColor[];
  stock: number;
  images: string[];
  featured: boolean;
  new_arrival: boolean;
  active: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
}

export interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: OrderItem[];
  subtotal: number;
  coupon_code?: string;
  discount: number;
  total: number;
  payment_method: 'online' | 'whatsapp' | 'cod';
  payment_status: 'pending' | 'paid' | 'failed';
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  created_at: string;
}

export interface OrderItem {
  product_id: number;
  product_name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Banner {
  id: number;
  image: string;
  heading: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  active: boolean;
  display_order: number;
}

export interface Offer {
  id: number;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  min_order: number;
  start_date: string;
  end_date: string;
  usage_limit: number;
  used_count: number;
  active: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  created_at: string;
}
