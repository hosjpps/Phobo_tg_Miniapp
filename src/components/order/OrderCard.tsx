import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { Order } from '@/types';
import { formatPriceShort, formatDate, formatItemsCount } from '@/utils/format';
import { OrderStatusBadge } from './OrderStatusBadge';
import { Button } from '@/components/ui/Button';

interface OrderCardProps {
  order: Order;
  onClick: () => void;
  onRepeat?: () => void;
}

export const OrderCard = memo(function OrderCard({
  order,
  onClick,
  onRepeat,
}: OrderCardProps) {
  const itemsCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white rounded-2xl p-4 shadow-card cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-semibold text-text text-sm">
            Заказ #{order.id.split('-').pop()?.slice(0, 6)}
          </p>
          <p className="text-xs text-text-light">{formatDate(order.createdAt)}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {/* Items preview */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex -space-x-2">
          {order.items.slice(0, 3).map((item, index) => (
            <div
              key={item.id}
              className="w-10 h-10 rounded-lg overflow-hidden border-2 border-white"
              style={{ zIndex: 3 - index }}
            >
              <img
                src={item.dish.imageUrl}
                alt={item.dish.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {order.items.length > 3 && (
            <div className="w-10 h-10 rounded-lg bg-neutral border-2 border-white flex items-center justify-center text-xs font-medium text-text-light">
              +{order.items.length - 3}
            </div>
          )}
        </div>
        <span className="text-sm text-text-light">{formatItemsCount(itemsCount)}</span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="font-bold text-text">
          {formatPriceShort(order.totalPrice)}
        </span>
        <div className="flex items-center gap-2">
          {onRepeat && order.status === 'delivered' && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onRepeat();
              }}
            >
              Повторить
            </Button>
          )}
          <ChevronRight className="w-5 h-5 text-text-light" />
        </div>
      </div>
    </motion.div>
  );
});
