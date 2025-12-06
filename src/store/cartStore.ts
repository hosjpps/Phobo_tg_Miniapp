import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Dish, Addon, CartItem, CartItemCustomizations, PromoCode } from '@/types';
import { PROMO_CODES, validatePromoCode, calculateDiscount } from '@/data/promoCodes';
import { generateCartItemId } from '@/utils/validation';
import { APP_CONFIG } from '@/constants/config';

interface CartStore {
  // State
  items: CartItem[];
  promoCode: string | null;
  appliedPromo: PromoCode | null;

  // Actions
  addItem: (dish: Dish, quantity: number, customizations: CartItemCustomizations) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => { success: boolean; error?: string };
  removePromoCode: () => void;

  // Computed getters
  getItemsCount: () => number;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getDiscount: () => number;
  getTotalPrice: () => number;
  getItemById: (itemId: string) => CartItem | undefined;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      appliedPromo: null,

      addItem: (dish, quantity, customizations) => {
        const itemId = generateCartItemId(dish.id, customizations);
        const items = get().items;
        const existingItem = items.find((i) => i.id === itemId);

        const addonsPrice = customizations.addons?.reduce(
          (sum: number, addon: Addon) => sum + addon.price,
          0
        ) || 0;
        const itemPrice = (dish.price + addonsPrice) * quantity;

        if (existingItem) {
          const newQuantity = Math.min(
            existingItem.quantity + quantity,
            APP_CONFIG.maxItemQuantity
          );
          const newItemPrice = (dish.price + addonsPrice) * newQuantity;

          set({
            items: items.map((i) =>
              i.id === itemId
                ? { ...i, quantity: newQuantity, totalPrice: newItemPrice }
                : i
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                id: itemId,
                dish,
                quantity,
                customizations,
                totalPrice: itemPrice,
              },
            ],
          });
        }
      },

      removeItem: (itemId) => {
        set({ items: get().items.filter((i) => i.id !== itemId) });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        const clampedQuantity = Math.min(quantity, APP_CONFIG.maxItemQuantity);

        set({
          items: get().items.map((i) => {
            if (i.id === itemId) {
              const addonsPrice = i.customizations.addons?.reduce(
                (sum, addon) => sum + addon.price,
                0
              ) || 0;
              const itemPrice = (i.dish.price + addonsPrice) * clampedQuantity;
              return { ...i, quantity: clampedQuantity, totalPrice: itemPrice };
            }
            return i;
          }),
        });
      },

      clearCart: () => {
        set({ items: [], promoCode: null, appliedPromo: null });
      },

      applyPromoCode: (code) => {
        const subtotal = get().getSubtotal();
        const result = validatePromoCode(code, subtotal);

        if (!result.valid || !result.promo) {
          return { success: false, error: result.error };
        }

        set({
          promoCode: code.toUpperCase(),
          appliedPromo: result.promo,
        });

        return { success: true };
      },

      removePromoCode: () => {
        set({ promoCode: null, appliedPromo: null });
      },

      getItemsCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.totalPrice, 0);
      },

      getDeliveryFee: () => {
        const subtotal = get().getSubtotal();
        const promo = get().appliedPromo;

        if (promo?.type === 'free_delivery') {
          return 0;
        }

        return subtotal >= APP_CONFIG.freeDeliveryThreshold
          ? 0
          : APP_CONFIG.deliveryFee;
      },

      getDiscount: () => {
        const subtotal = get().getSubtotal();
        const promo = get().appliedPromo;

        if (!promo) return 0;

        return calculateDiscount(promo, subtotal);
      },

      getTotalPrice: () => {
        const subtotal = get().getSubtotal();
        const deliveryFee = get().getDeliveryFee();
        const discount = get().getDiscount();
        return subtotal + deliveryFee - discount;
      },

      getItemById: (itemId) => {
        return get().items.find((i) => i.id === itemId);
      },
    }),
    {
      name: 'phobo-cart',
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
        appliedPromo: state.appliedPromo,
      }),
    }
  )
);

// Selector hooks for better performance
export const useCartItems = () => useCartStore((state) => state.items);
export const useCartItemsCount = () => useCartStore((state) => state.getItemsCount());
export const useCartSubtotal = () => useCartStore((state) => state.getSubtotal());
export const useCartTotal = () => useCartStore((state) => state.getTotalPrice());
export const useCartPromo = () => useCartStore((state) => ({
  promoCode: state.promoCode,
  appliedPromo: state.appliedPromo,
}));
