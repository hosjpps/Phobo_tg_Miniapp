import type { Dish, Addon } from './dish';

export interface CartItemCustomizations {
  spiceLevel?: number; // 0-3
  addons?: Addon[];
  specialInstructions?: string;
}

export interface CartItem {
  id: string; // Unique ID: dish.id + JSON.stringify(customizations)
  dish: Dish;
  quantity: number;
  customizations: CartItemCustomizations;
  totalPrice: number; // (dish.price + sum(addons)) * quantity
}

export interface PromoCode {
  code: string;
  type: 'percentage' | 'fixed' | 'free_delivery';
  value: number;
  minOrder: number;
  description: string;
  maxUses: number | null;
}

export interface CartState {
  items: CartItem[];
  promoCode: string | null;
  appliedPromo: PromoCode | null;
}

export interface CartComputedValues {
  itemsCount: number;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  totalPrice: number;
}
