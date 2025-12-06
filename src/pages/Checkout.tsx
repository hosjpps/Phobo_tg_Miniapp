import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, MessageSquare, ChevronRight, Plus } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { PageWrapper } from '@/components/layout/Layout';
import { CartSummary } from '@/components/cart';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { BottomSheet } from '@/components/ui/Modal';
import { useOrders, useCart, useCheckoutMainButton, useBackButton } from '@/hooks';
import { useUserStore, useSelectedAddress } from '@/store';
import { PAYMENT_METHODS, ADDRESS_TYPES } from '@/constants/config';
import { ROUTES } from '@/constants/routes';
import type { PaymentMethod, Address } from '@/types';

export default function Checkout() {
  const navigate = useNavigate();
  const { createOrder, isCreatingOrder } = useOrders();
  const { totalPrice, items } = useCart();
  const addresses = useUserStore((state) => state.addresses);
  const selectedAddress = useSelectedAddress();
  const selectAddress = useUserStore((state) => state.selectAddress);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [comment, setComment] = useState('');
  const [showAddressSheet, setShowAddressSheet] = useState(false);
  const [showPaymentSheet, setShowPaymentSheet] = useState(false);

  const isValid = !!selectedAddress && items.length > 0;

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useBackButton(handleBack);

  const handleSubmit = useCallback(async () => {
    if (!isValid) return;
    await createOrder(paymentMethod, comment);
  }, [isValid, createOrder, paymentMethod, comment]);

  useCheckoutMainButton(handleSubmit, isValid, isCreatingOrder, totalPrice);

  const selectedPayment = PAYMENT_METHODS.find((p) => p.id === paymentMethod);

  const getAddressTypeLabel = (type: Address['type']) => {
    return ADDRESS_TYPES.find((t) => t.id === type)?.label || 'Адрес';
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Оформление заказа" showBack showCart={false} />

      <PageWrapper className="space-y-4">
        {/* Delivery Address */}
        <Card onClick={() => setShowAddressSheet(true)}>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-text mb-1">Адрес доставки</p>
              {selectedAddress ? (
                <>
                  <p className="text-sm text-text">
                    {selectedAddress.street}, {selectedAddress.house}
                    {selectedAddress.apartment && `, кв. ${selectedAddress.apartment}`}
                  </p>
                  <p className="text-xs text-text-light mt-0.5">
                    {getAddressTypeLabel(selectedAddress.type)}
                    {selectedAddress.entrance && ` • Подъезд ${selectedAddress.entrance}`}
                    {selectedAddress.floor && ` • Этаж ${selectedAddress.floor}`}
                  </p>
                </>
              ) : (
                <p className="text-sm text-text-light">Выберите адрес доставки</p>
              )}
            </div>
            <ChevronRight className="w-5 h-5 text-text-light flex-shrink-0" />
          </div>
        </Card>

        {/* Payment Method */}
        <Card onClick={() => setShowPaymentSheet(true)}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-text mb-0.5">Способ оплаты</p>
              <p className="text-sm text-text-light">
                {selectedPayment?.label || 'Выберите способ оплаты'}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-text-light" />
          </div>
        </Card>

        {/* Comment */}
        <Card>
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="font-medium text-text">Комментарий к заказу</p>
              <p className="text-xs text-text-light">Пожелания по доставке</p>
            </div>
          </div>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Например: позвоните за 5 минут..."
            rows={3}
          />
        </Card>

        {/* Order Summary */}
        <CartSummary showDeliveryInfo={false} />

        {/* Submit button (fallback) */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleSubmit}
          loading={isCreatingOrder}
          disabled={!isValid || isCreatingOrder}
        >
          {isCreatingOrder ? 'Оформляем заказ...' : `Оплатить ${totalPrice}₽`}
        </Button>
      </PageWrapper>

      {/* Address Selection Sheet */}
      <BottomSheet
        isOpen={showAddressSheet}
        onClose={() => setShowAddressSheet(false)}
        title="Выберите адрес"
      >
        <div className="space-y-3">
          {addresses.map((address) => (
            <Card
              key={address.id}
              onClick={() => {
                selectAddress(address);
                setShowAddressSheet(false);
              }}
              className={`${
                selectedAddress?.id === address.id
                  ? 'border-2 border-primary'
                  : 'border-2 border-transparent'
              }`}
            >
              <p className="font-medium text-text">
                {getAddressTypeLabel(address.type)}
                {address.isDefault && (
                  <span className="ml-2 text-xs text-primary">(по умолчанию)</span>
                )}
              </p>
              <p className="text-sm text-text-light">
                {address.street}, {address.house}
                {address.apartment && `, кв. ${address.apartment}`}
              </p>
            </Card>
          ))}

          <Button
            variant="outline"
            fullWidth
            icon={<Plus className="w-4 h-4" />}
            onClick={() => {
              setShowAddressSheet(false);
              navigate(ROUTES.ADDRESSES);
            }}
          >
            Добавить новый адрес
          </Button>
        </div>
      </BottomSheet>

      {/* Payment Method Sheet */}
      <BottomSheet
        isOpen={showPaymentSheet}
        onClose={() => setShowPaymentSheet(false)}
        title="Способ оплаты"
      >
        <div className="space-y-2">
          {PAYMENT_METHODS.map((method) => (
            <Card
              key={method.id}
              onClick={() => {
                setPaymentMethod(method.id as PaymentMethod);
                setShowPaymentSheet(false);
              }}
              className={`${
                paymentMethod === method.id
                  ? 'border-2 border-primary'
                  : 'border-2 border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neutral rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-text-light" />
                </div>
                <span className="font-medium text-text">{method.label}</span>
              </div>
            </Card>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
}
