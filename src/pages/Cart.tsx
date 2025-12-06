import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { PageWrapper } from '@/components/layout/Layout';
import { CartItem, CartSummary, PromoCode, EmptyCart } from '@/components/cart';
import { Button } from '@/components/ui/Button';
import { useCart, useCartMainButton, useHapticFeedback } from '@/hooks';
import { ROUTES } from '@/constants/routes';
import { APP_CONFIG } from '@/constants/config';

export default function Cart() {
  const navigate = useNavigate();
  const { impact } = useHapticFeedback();
  const {
    items,
    itemsCount,
    subtotal,
    totalPrice,
    isEmpty,
    clearCart,
  } = useCart();

  const canCheckout = subtotal >= APP_CONFIG.minOrderAmount;

  const handleCheckout = useCallback(() => {
    if (canCheckout) {
      navigate(ROUTES.CHECKOUT);
    }
  }, [canCheckout, navigate]);

  useCartMainButton(handleCheckout, totalPrice, itemsCount);

  const handleClearCart = () => {
    impact('medium');
    clearCart();
  };

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Корзина" showBack />
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Корзина" showBack showCart={false} />

      <PageWrapper className="space-y-4">
        {/* Clear cart button */}
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            icon={<Trash2 className="w-4 h-4" />}
            onClick={handleClearCart}
          >
            Очистить
          </Button>
        </div>

        {/* Cart items */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </div>

        {/* Promo code */}
        <PromoCode />

        {/* Summary */}
        <CartSummary />

        {/* Checkout button (for non-Telegram environment) */}
        {!canCheckout && (
          <div className="bg-warning/10 rounded-xl p-4 text-center">
            <p className="text-sm text-text">
              Минимальная сумма заказа — {APP_CONFIG.minOrderAmount}₽
            </p>
            <p className="text-sm text-text-light mt-1">
              Добавьте ещё на{' '}
              <span className="font-semibold">
                {APP_CONFIG.minOrderAmount - subtotal}₽
              </span>
            </p>
          </div>
        )}

        <Button
          variant="secondary"
          size="lg"
          fullWidth
          onClick={handleCheckout}
          disabled={!canCheckout}
        >
          Оформить заказ — {totalPrice}₽
        </Button>
      </PageWrapper>
    </div>
  );
}
