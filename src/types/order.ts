import type { CartItem } from './cart';
import type { Address } from './user';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'in_transit'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod =
  | 'telegram_stars'
  | 'card'
  | 'cash'
  | 'card_courier';

export type PaymentStatus =
  | 'pending'
  | 'paid'
  | 'failed';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  totalPrice: number;
  deliveryAddress: Address;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  comment?: string;
  promoCode?: string;
  createdAt: Date;
  updatedAt: Date;
  estimatedDelivery: Date;
}

export interface OrderStatusInfo {
  status: OrderStatus;
  label: string;
  description: string;
  icon: string;
  color: string;
}

export const ORDER_STATUSES: Record<OrderStatus, OrderStatusInfo> = {
  pending: {
    status: 'pending',
    label: 'Ожидает подтверждения',
    description: 'Заказ принят и ожидает подтверждения',
    icon: 'Clock',
    color: 'warning',
  },
  confirmed: {
    status: 'confirmed',
    label: 'Подтвержден',
    description: 'Заказ подтвержден рестораном',
    icon: 'CheckCircle',
    color: 'success',
  },
  preparing: {
    status: 'preparing',
    label: 'Готовится',
    description: 'Повара готовят ваш заказ',
    icon: 'ChefHat',
    color: 'secondary',
  },
  in_transit: {
    status: 'in_transit',
    label: 'В пути',
    description: 'Курьер везет ваш заказ',
    icon: 'Bike',
    color: 'primary',
  },
  delivered: {
    status: 'delivered',
    label: 'Доставлен',
    description: 'Заказ успешно доставлен',
    icon: 'Package',
    color: 'success',
  },
  cancelled: {
    status: 'cancelled',
    label: 'Отменен',
    description: 'Заказ был отменен',
    icon: 'XCircle',
    color: 'error',
  },
};
