import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Order, OrderStatus, CartItem, Address, PaymentMethod } from '@/types';
import { generateOrderId } from '@/utils/validation';
import { APP_CONFIG } from '@/constants/config';
import { useCartStore } from './cartStore';

interface CreateOrderData {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  totalPrice: number;
  deliveryAddress: Address;
  paymentMethod: PaymentMethod;
  comment?: string;
  promoCode?: string;
}

interface OrderStore {
  // State
  orders: Order[];
  currentOrder: Order | null;
  isCreatingOrder: boolean;

  // Actions
  createOrder: (orderData: CreateOrderData) => Promise<string>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  setCurrentOrder: (order: Order | null) => void;
  repeatOrder: (orderId: string) => void;

  // Getters
  getOrderById: (id: string) => Order | undefined;
  getActiveOrders: () => Order[];
  getOrderHistory: () => Order[];
}

const isActiveOrder = (status: OrderStatus): boolean => {
  return ['pending', 'confirmed', 'preparing', 'in_transit'].includes(status);
};

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      currentOrder: null,
      isCreatingOrder: false,

      createOrder: async (orderData) => {
        set({ isCreatingOrder: true });

        try {
          const orderId = generateOrderId();
          const now = new Date();
          const estimatedDelivery = new Date(
            now.getTime() + APP_CONFIG.estimatedDeliveryTime * 60 * 1000
          );

          const newOrder: Order = {
            ...orderData,
            id: orderId,
            userId: 'telegram-user', // Would come from Telegram SDK in real app
            status: 'pending',
            paymentStatus:
              orderData.paymentMethod === 'cash' || orderData.paymentMethod === 'card_courier'
                ? 'pending'
                : 'paid',
            createdAt: now,
            updatedAt: now,
            estimatedDelivery,
          };

          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          set({
            orders: [newOrder, ...get().orders],
            currentOrder: newOrder,
            isCreatingOrder: false,
          });

          // Simulate order confirmation after 2 seconds
          setTimeout(() => {
            get().updateOrderStatus(orderId, 'confirmed');
          }, 2000);

          // Simulate order preparation after 5 seconds
          setTimeout(() => {
            get().updateOrderStatus(orderId, 'preparing');
          }, 5000);

          return orderId;
        } catch (error) {
          set({ isCreatingOrder: false });
          throw error;
        }
      },

      updateOrderStatus: (orderId, status) => {
        set({
          orders: get().orders.map((o) =>
            o.id === orderId
              ? { ...o, status, updatedAt: new Date() }
              : o
          ),
        });

        // Update current order if it's the one being updated
        const currentOrder = get().currentOrder;
        if (currentOrder?.id === orderId) {
          set({
            currentOrder: { ...currentOrder, status, updatedAt: new Date() },
          });
        }
      },

      setCurrentOrder: (order) => {
        set({ currentOrder: order });
      },

      repeatOrder: (orderId) => {
        const order = get().getOrderById(orderId);
        if (!order) return;

        const cartStore = useCartStore.getState();
        cartStore.clearCart();

        order.items.forEach((item) => {
          cartStore.addItem(item.dish, item.quantity, item.customizations);
        });
      },

      getOrderById: (id) => {
        return get().orders.find((o) => o.id === id);
      },

      getActiveOrders: () => {
        return get().orders.filter((o) => isActiveOrder(o.status));
      },

      getOrderHistory: () => {
        return get().orders.filter((o) => !isActiveOrder(o.status));
      },
    }),
    {
      name: 'phobo-orders',
      partialize: (state) => ({
        orders: state.orders.map((order) => ({
          ...order,
          createdAt: order.createdAt.toString(),
          updatedAt: order.updatedAt.toString(),
          estimatedDelivery: order.estimatedDelivery.toString(),
        })),
      }),
      onRehydrateStorage: () => (state) => {
        // Convert date strings back to Date objects
        if (state) {
          state.orders = state.orders.map((order) => ({
            ...order,
            createdAt: new Date(order.createdAt),
            updatedAt: new Date(order.updatedAt),
            estimatedDelivery: new Date(order.estimatedDelivery),
          }));
        }
      },
    }
  )
);

// Selector hooks
export const useOrders = () => useOrderStore((state) => state.orders);
export const useActiveOrders = () => useOrderStore((state) => state.getActiveOrders());
export const useOrderHistory = () => useOrderStore((state) => state.getOrderHistory());
export const useCurrentOrder = () => useOrderStore((state) => state.currentOrder);
export const useIsCreatingOrder = () => useOrderStore((state) => state.isCreatingOrder);
