import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { Address, PaymentMethod } from '@/types';
import { useOrderStore, useCartStore, useUserStore } from '@/store';
import { useHapticFeedback } from './useTelegram';
import { getOrderSuccessRoute, getOrderRoute } from '@/constants/routes';
import { markPromoCodeAsUsed } from '@/utils/storage';

export function useOrders() {
  const navigate = useNavigate();
  const { notification } = useHapticFeedback();

  const {
    orders,
    currentOrder,
    isCreatingOrder,
    createOrder,
    updateOrderStatus,
    setCurrentOrder,
    repeatOrder,
    getOrderById,
    getActiveOrders,
    getOrderHistory,
  } = useOrderStore();

  const cartStore = useCartStore();
  const selectedAddress = useUserStore((state) => state.selectedAddress);

  const handleCreateOrder = useCallback(
    async (paymentMethod: PaymentMethod, comment?: string) => {
      if (!selectedAddress) {
        toast.error('Выберите адрес доставки');
        return null;
      }

      try {
        const orderId = await createOrder({
          items: cartStore.items,
          subtotal: cartStore.getSubtotal(),
          deliveryFee: cartStore.getDeliveryFee(),
          discount: cartStore.getDiscount(),
          totalPrice: cartStore.getTotalPrice(),
          deliveryAddress: selectedAddress,
          paymentMethod,
          comment,
          promoCode: cartStore.promoCode || undefined,
        });

        // Mark promo code as used
        if (cartStore.promoCode) {
          markPromoCodeAsUsed(cartStore.promoCode);
        }

        // Clear cart after successful order
        cartStore.clearCart();

        notification('success');
        navigate(getOrderSuccessRoute(orderId));

        return orderId;
      } catch (error) {
        notification('error');
        toast.error('Не удалось создать заказ. Попробуйте еще раз.');
        return null;
      }
    },
    [
      selectedAddress,
      createOrder,
      cartStore,
      notification,
      navigate,
    ]
  );

  const handleRepeatOrder = useCallback(
    (orderId: string) => {
      repeatOrder(orderId);
      notification('success');
      toast.success('Товары добавлены в корзину');
      navigate('/cart');
    },
    [repeatOrder, notification, navigate]
  );

  const goToOrderDetail = useCallback(
    (orderId: string) => {
      const order = getOrderById(orderId);
      if (order) {
        setCurrentOrder(order);
        navigate(getOrderRoute(orderId));
      }
    },
    [getOrderById, setCurrentOrder, navigate]
  );

  return {
    orders,
    currentOrder,
    isCreatingOrder,
    activeOrders: getActiveOrders(),
    orderHistory: getOrderHistory(),

    createOrder: handleCreateOrder,
    updateOrderStatus,
    setCurrentOrder,
    repeatOrder: handleRepeatOrder,
    getOrderById,
    goToOrderDetail,
  };
}

export function useOrderById(orderId: string) {
  const getOrderById = useOrderStore((state) => state.getOrderById);
  return getOrderById(orderId);
}
