import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Phone, MessageCircle, RefreshCw, AlertCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { PageWrapper } from '@/components/layout/Layout';
import { OrderTimeline, OrderStatusBadge } from '@/components/order';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useOrderById, useOrders, useBackButton } from '@/hooks';
import { formatPriceShort, formatDateTime, formatOrderNumber } from '@/utils/format';
import { openTelegramLink } from '@/utils/telegram';
import { APP_CONFIG } from '@/constants/config';

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const order = useOrderById(id || '');
  const { repeatOrder } = useOrders();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useBackButton(handleBack);

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Заказ" showBack />
        <div className="flex items-center justify-center h-64">
          <p className="text-text-light">Заказ не найден</p>
        </div>
      </div>
    );
  }

  const handleRepeatOrder = () => {
    repeatOrder(order.id);
  };

  const handleContactSupport = () => {
    openTelegramLink(APP_CONFIG.telegram);
  };

  const handleCallSupport = () => {
    window.location.href = `tel:${APP_CONFIG.phone.replace(/\D/g, '')}`;
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title={`Заказ ${formatOrderNumber(order.id)}`} showBack />

      <PageWrapper className="space-y-4">
        {/* Status and Timeline */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-text-light">Статус заказа</p>
              <p className="font-medium text-text">{formatDateTime(order.createdAt)}</p>
            </div>
            <OrderStatusBadge status={order.status} size="md" />
          </div>

          <OrderTimeline
            currentStatus={order.status}
            estimatedDelivery={order.estimatedDelivery}
          />
        </Card>

        {/* Order Items */}
        <Card>
          <h3 className="font-semibold text-text mb-3">Состав заказа</h3>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.dish.imageUrl}
                    alt={item.dish.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text text-sm line-clamp-1">
                    {item.dish.name}
                  </p>
                  <p className="text-xs text-text-light">
                    {item.quantity} x {formatPriceShort(item.dish.price)}
                  </p>
                </div>
                <p className="font-medium text-text">
                  {formatPriceShort(item.totalPrice)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-light">Сумма заказа</span>
              <span className="text-text">{formatPriceShort(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-light">Доставка</span>
              <span className={order.deliveryFee === 0 ? 'text-success' : 'text-text'}>
                {order.deliveryFee === 0 ? 'Бесплатно' : formatPriceShort(order.deliveryFee)}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-success">Скидка</span>
                <span className="text-success">-{formatPriceShort(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold pt-2">
              <span className="text-text">Итого</span>
              <span className="text-text text-lg">{formatPriceShort(order.totalPrice)}</span>
            </div>
          </div>
        </Card>

        {/* Delivery Address */}
        <Card>
          <h3 className="font-semibold text-text mb-2">Адрес доставки</h3>
          <p className="text-text">
            {order.deliveryAddress.street}, {order.deliveryAddress.house}
            {order.deliveryAddress.apartment && `, кв. ${order.deliveryAddress.apartment}`}
          </p>
          {order.deliveryAddress.entrance && (
            <p className="text-sm text-text-light mt-1">
              Подъезд {order.deliveryAddress.entrance}
              {order.deliveryAddress.floor && `, этаж ${order.deliveryAddress.floor}`}
              {order.deliveryAddress.intercom && `, домофон ${order.deliveryAddress.intercom}`}
            </p>
          )}
        </Card>

        {/* Comment */}
        {order.comment && (
          <Card>
            <h3 className="font-semibold text-text mb-2">Комментарий</h3>
            <p className="text-text-light">{order.comment}</p>
          </Card>
        )}

        {/* Actions */}
        <div className="space-y-3">
          {order.status === 'delivered' && (
            <Button
              variant="secondary"
              size="lg"
              fullWidth
              icon={<RefreshCw className="w-5 h-5" />}
              onClick={handleRepeatOrder}
            >
              Повторить заказ
            </Button>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="md"
              fullWidth
              icon={<MessageCircle className="w-4 h-4" />}
              onClick={handleContactSupport}
            >
              Написать
            </Button>
            <Button
              variant="outline"
              size="md"
              fullWidth
              icon={<Phone className="w-4 h-4" />}
              onClick={handleCallSupport}
            >
              Позвонить
            </Button>
          </div>

          {order.status !== 'delivered' && order.status !== 'cancelled' && (
            <button className="w-full flex items-center justify-center gap-2 py-3 text-sm text-error">
              <AlertCircle className="w-4 h-4" />
              Сообщить о проблеме
            </button>
          )}
        </div>
      </PageWrapper>
    </div>
  );
}
