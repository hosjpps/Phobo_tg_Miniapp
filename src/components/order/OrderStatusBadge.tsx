import React from 'react';
import {
  Clock,
  CheckCircle,
  ChefHat,
  Bike,
  Package,
  XCircle,
} from 'lucide-react';
import type { OrderStatus } from '@/types';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  size?: 'sm' | 'md';
}

const statusConfig: Record<
  OrderStatus,
  { label: string; color: string; bgColor: string; Icon: React.FC<{ className?: string }> }
> = {
  pending: {
    label: 'Ожидает',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    Icon: Clock,
  },
  confirmed: {
    label: 'Подтвержден',
    color: 'text-success',
    bgColor: 'bg-success/10',
    Icon: CheckCircle,
  },
  preparing: {
    label: 'Готовится',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    Icon: ChefHat,
  },
  in_transit: {
    label: 'В пути',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    Icon: Bike,
  },
  delivered: {
    label: 'Доставлен',
    color: 'text-success',
    bgColor: 'bg-success/10',
    Icon: Package,
  },
  cancelled: {
    label: 'Отменен',
    color: 'text-error',
    bgColor: 'bg-error/10',
    Icon: XCircle,
  },
};

export function OrderStatusBadge({ status, size = 'sm' }: OrderStatusBadgeProps) {
  const config = statusConfig[status];
  const { Icon } = config;

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-medium rounded-full
        ${config.bgColor} ${config.color} ${sizeClasses[size]}
      `}
    >
      <Icon className={iconSizes[size]} />
      {config.label}
    </span>
  );
}
