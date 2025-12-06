import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { Dish, CartItemCustomizations } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useHapticFeedback } from './useTelegram';
import { ROUTES } from '@/constants/routes';

export function useCart() {
  const navigate = useNavigate();
  const { impact } = useHapticFeedback();

  const {
    items,
    promoCode,
    appliedPromo,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyPromoCode,
    removePromoCode,
    getItemsCount,
    getSubtotal,
    getDeliveryFee,
    getDiscount,
    getTotalPrice,
  } = useCartStore();

  const handleAddToCart = useCallback(
    (dish: Dish, quantity: number, customizations: CartItemCustomizations) => {
      addItem(dish, quantity, customizations);
      impact('medium');
      toast.success(`${dish.name} добавлен в корзину`);
    },
    [addItem, impact]
  );

  const handleRemoveFromCart = useCallback(
    (itemId: string, dishName: string) => {
      removeItem(itemId);
      impact('light');
      toast.success(`${dishName} удален из корзины`);
    },
    [removeItem, impact]
  );

  const handleUpdateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      updateQuantity(itemId, quantity);
      impact('light');
    },
    [updateQuantity, impact]
  );

  const handleClearCart = useCallback(() => {
    clearCart();
    impact('medium');
    toast.success('Корзина очищена');
  }, [clearCart, impact]);

  const handleApplyPromoCode = useCallback(
    (code: string) => {
      const result = applyPromoCode(code);
      if (result.success) {
        impact('medium');
        toast.success('Промокод применен');
      } else {
        toast.error(result.error || 'Ошибка при применении промокода');
      }
      return result;
    },
    [applyPromoCode, impact]
  );

  const handleRemovePromoCode = useCallback(() => {
    removePromoCode();
    toast.success('Промокод удален');
  }, [removePromoCode]);

  const goToCart = useCallback(() => {
    navigate(ROUTES.CART);
  }, [navigate]);

  const goToCheckout = useCallback(() => {
    navigate(ROUTES.CHECKOUT);
  }, [navigate]);

  return {
    items,
    promoCode,
    appliedPromo,
    itemsCount: getItemsCount(),
    subtotal: getSubtotal(),
    deliveryFee: getDeliveryFee(),
    discount: getDiscount(),
    totalPrice: getTotalPrice(),
    isEmpty: items.length === 0,

    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    updateQuantity: handleUpdateQuantity,
    clearCart: handleClearCart,
    applyPromoCode: handleApplyPromoCode,
    removePromoCode: handleRemovePromoCode,

    goToCart,
    goToCheckout,
  };
}

export function useCartBadge() {
  const itemsCount = useCartStore((state) => state.getItemsCount());
  return itemsCount > 0 ? itemsCount : null;
}
