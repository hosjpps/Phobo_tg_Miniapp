import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '@/types';
import { formatPriceShort, getSpiceLevelEmoji } from '@/utils/format';
import { QuantitySelector } from '@/components/dish/QuantitySelector';
import { useCart } from '@/hooks';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = memo(function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.id, item.dish.name);
  };

  const hasCustomizations =
    (item.customizations.spiceLevel && item.customizations.spiceLevel > 0) ||
    (item.customizations.addons && item.customizations.addons.length > 0);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="bg-white rounded-2xl p-4 shadow-card"
    >
      <div className="flex gap-4">
        {/* Image */}
        <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden">
          <img
            src={item.dish.imageUrl}
            alt={item.dish.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-text text-sm line-clamp-1">
                {item.dish.name}
              </h3>
              <p className="text-xs text-text-light">{item.dish.weight}</p>
            </div>
            <button
              onClick={handleRemove}
              className="p-1.5 text-text-light hover:text-error hover:bg-error/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Customizations */}
          {hasCustomizations && (
            <div className="mt-2 flex flex-wrap gap-1">
              {item.customizations.spiceLevel && item.customizations.spiceLevel > 0 && (
                <span className="text-xs px-2 py-0.5 bg-neutral rounded-full">
                  {getSpiceLevelEmoji(item.customizations.spiceLevel)}
                </span>
              )}
              {item.customizations.addons?.map((addon) => (
                <span
                  key={addon.id}
                  className="text-xs px-2 py-0.5 bg-neutral rounded-full text-text-light"
                >
                  +{addon.name}
                </span>
              ))}
            </div>
          )}

          {/* Price and quantity */}
          <div className="mt-3 flex items-center justify-between">
            <span className="font-bold text-text">
              {formatPriceShort(item.totalPrice)}
            </span>
            <QuantitySelector
              value={item.quantity}
              onChange={handleQuantityChange}
              size="sm"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
});
