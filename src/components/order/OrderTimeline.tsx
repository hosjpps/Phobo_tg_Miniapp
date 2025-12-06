import React from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  CheckCircle,
  ChefHat,
  Bike,
  Package,
  XCircle,
} from 'lucide-react';
import type { OrderStatus } from '@/types';

interface OrderTimelineProps {
  currentStatus: OrderStatus;
  estimatedDelivery?: Date;
}

const steps = [
  { status: 'pending' as const, label: 'Заказ принят', Icon: Clock },
  { status: 'confirmed' as const, label: 'Подтвержден', Icon: CheckCircle },
  { status: 'preparing' as const, label: 'Готовится', Icon: ChefHat },
  { status: 'in_transit' as const, label: 'В пути', Icon: Bike },
  { status: 'delivered' as const, label: 'Доставлен', Icon: Package },
];

const statusOrder: Record<OrderStatus, number> = {
  pending: 0,
  confirmed: 1,
  preparing: 2,
  in_transit: 3,
  delivered: 4,
  cancelled: -1,
};

export function OrderTimeline({ currentStatus, estimatedDelivery }: OrderTimelineProps) {
  if (currentStatus === 'cancelled') {
    return (
      <div className="flex items-center gap-3 p-4 bg-error/10 rounded-xl">
        <div className="w-10 h-10 bg-error/20 rounded-full flex items-center justify-center">
          <XCircle className="w-5 h-5 text-error" />
        </div>
        <div>
          <p className="font-medium text-error">Заказ отменен</p>
          <p className="text-sm text-text-light">Свяжитесь с поддержкой для уточнения</p>
        </div>
      </div>
    );
  }

  const currentIndex = statusOrder[currentStatus];

  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isPending = index > currentIndex;

        const { Icon } = step;

        return (
          <div key={step.status} className="flex gap-4">
            {/* Icon and line */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isCompleted || isCurrent ? '#4CAF50' : '#E0E0E0',
                }}
                transition={{ duration: 0.3 }}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${isCompleted || isCurrent ? 'bg-success' : 'bg-neutral-200'}
                `}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isCompleted || isCurrent ? 'text-white' : 'text-text-light'
                  }`}
                />
              </motion.div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="w-0.5 h-8 mt-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: isCompleted ? '100%' : '0%' }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="w-full bg-success"
                  />
                  <div
                    className={`w-full ${isCompleted ? '' : 'bg-neutral-200'}`}
                    style={{ height: isCompleted ? '0%' : '100%' }}
                  />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-4">
              <p
                className={`font-medium ${
                  isCompleted || isCurrent ? 'text-text' : 'text-text-light'
                }`}
              >
                {step.label}
              </p>
              {isCurrent && step.status === 'in_transit' && estimatedDelivery && (
                <p className="text-sm text-text-light">
                  Ожидаемое время доставки:{' '}
                  {estimatedDelivery.toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
