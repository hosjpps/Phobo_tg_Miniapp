import React from 'react';
import { Truck, Tag, Info } from 'lucide-react';
import { formatPriceShort } from '@/utils/format';
import { useCart } from '@/hooks';
import { APP_CONFIG } from '@/constants/config';

interface CartSummaryProps {
  showDeliveryInfo?: boolean;
}

export function CartSummary({ showDeliveryInfo = true }: CartSummaryProps) {
  const { subtotal, deliveryFee, discount, totalPrice, appliedPromo } = useCart();

  const freeDeliveryThreshold = APP_CONFIG.freeDeliveryThreshold;
  const amountToFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const showFreeDeliveryProgress = deliveryFee > 0 && amountToFreeDelivery > 0;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-card">
      {/* Free delivery progress */}
      {showDeliveryInfo && showFreeDeliveryProgress && (
        <div className="mb-4 pb-4 border-b border-border">
          <div className="flex items-center gap-2 text-sm text-text-light mb-2">
            <Truck className="w-4 h-4" />
            <span>
              До бесплатной доставки осталось{' '}
              <span className="font-semibold text-primary">
                {formatPriceShort(amountToFreeDelivery)}
              </span>
            </span>
          </div>
          <div className="h-2 bg-neutral rounded-full overflow-hidden">
            <div
              className="h-full bg-secondary rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Summary lines */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-light">Сумма заказа</span>
          <span className="text-text">{formatPriceShort(subtotal)}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-text-light flex items-center gap-1">
            <Truck className="w-4 h-4" />
            Доставка
          </span>
          <span className={deliveryFee === 0 ? 'text-success font-medium' : 'text-text'}>
            {deliveryFee === 0 ? 'Бесплатно' : formatPriceShort(deliveryFee)}
          </span>
        </div>

        {discount > 0 && appliedPromo && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-success flex items-center gap-1">
              <Tag className="w-4 h-4" />
              Скидка ({appliedPromo.code})
            </span>
            <span className="text-success font-medium">
              -{formatPriceShort(discount)}
            </span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <span className="font-semibold text-text">Итого</span>
        <span className="text-xl font-bold text-text">
          {formatPriceShort(totalPrice)}
        </span>
      </div>

      {/* Info */}
      {showDeliveryInfo && (
        <div className="mt-4 flex items-start gap-2 text-xs text-text-light">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>
            Минимальная сумма заказа — {formatPriceShort(APP_CONFIG.minOrderAmount)}.
            Бесплатная доставка при заказе от{' '}
            {formatPriceShort(freeDeliveryThreshold)}.
          </span>
        </div>
      )}
    </div>
  );
}
