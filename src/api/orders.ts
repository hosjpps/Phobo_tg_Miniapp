import type { Order, OrderStatus, PaymentMethod, CartItem, Address } from '@/types';
import { generateOrderId } from '@/utils/validation';
import { APP_CONFIG } from '@/constants/config';

// Mock order storage (in production, orders would be stored on the server)
let mockOrders: Order[] = [];

interface CreateOrderRequest {
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

export const ordersApi = {
  // Create a new order
  create: async (data: CreateOrderRequest): Promise<Order> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const orderId = generateOrderId();
    const now = new Date();
    const estimatedDelivery = new Date(
      now.getTime() + APP_CONFIG.estimatedDeliveryTime * 60 * 1000
    );

    const order: Order = {
      ...data,
      id: orderId,
      userId: 'telegram-user-id',
      status: 'pending',
      paymentStatus:
        data.paymentMethod === 'cash' || data.paymentMethod === 'card_courier'
          ? 'pending'
          : 'paid',
      createdAt: now,
      updatedAt: now,
      estimatedDelivery,
    };

    mockOrders.unshift(order);

    // Simulate order confirmation after 2 seconds
    setTimeout(() => {
      ordersApi.updateStatus(orderId, 'confirmed');
    }, 2000);

    return order;
  },

  // Get all orders for the current user
  getAll: async (): Promise<Order[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockOrders;
  },

  // Get order by ID
  getById: async (id: string): Promise<Order | null> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockOrders.find((order) => order.id === id) || null;
  },

  // Get active orders
  getActive: async (): Promise<Order[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const activeStatuses: OrderStatus[] = ['pending', 'confirmed', 'preparing', 'in_transit'];
    return mockOrders.filter((order) => activeStatuses.includes(order.status));
  },

  // Get order history
  getHistory: async (): Promise<Order[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const historyStatuses: OrderStatus[] = ['delivered', 'cancelled'];
    return mockOrders.filter((order) => historyStatuses.includes(order.status));
  },

  // Update order status
  updateStatus: async (orderId: string, status: OrderStatus): Promise<Order | null> => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const orderIndex = mockOrders.findIndex((order) => order.id === orderId);
    if (orderIndex === -1) return null;

    mockOrders[orderIndex] = {
      ...mockOrders[orderIndex],
      status,
      updatedAt: new Date(),
    };

    return mockOrders[orderIndex];
  },

  // Cancel order
  cancel: async (orderId: string): Promise<Order | null> => {
    return ordersApi.updateStatus(orderId, 'cancelled');
  },
};
