import React, { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, MapPin, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useOrderById, useBackButton, useHapticFeedback } from '@/hooks';
import { formatDeliveryTime, formatOrderNumber, formatPriceShort } from '@/utils/format';
import { ROUTES, getOrderRoute } from '@/constants/routes';

export default function OrderSuccess() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { notification } = useHapticFeedback();
  const order = useOrderById(id || '');

  useEffect(() => {
    notification('success');
  }, [notification]);

  const handleBackToMenu = useCallback(() => {
    navigate(ROUTES.HOME);
  }, [navigate]);

  const handleTrackOrder = useCallback(() => {
    if (id) {
      navigate(getOrderRoute(id));
    }
  }, [id, navigate]);

  // Disable back button on success page
  useBackButton(handleBackToMenu);

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-text-light">Заказ не найден</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="flex flex-col items-center text-center mb-8"
      >
        <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
          >
            <CheckCircle className="w-12 h-12 text-success" />
          </motion.div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-text mb-2"
        >
          Заказ оформлен!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-text-light"
        >
          {formatOrderNumber(order.id)}
        </motion.p>
      </motion.div>

      {/* Order Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        {/* Delivery time */}
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
            <Clock className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <p className="font-medium text-text">Ожидаемое время доставки</p>
            <p className="text-lg font-bold text-secondary">
              {formatDeliveryTime(order.estimatedDelivery)}
            </p>
          </div>
        </Card>

        {/* Delivery address */}
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="font-medium text-text">Адрес доставки</p>
            <p className="text-sm text-text-light">
              {order.deliveryAddress.street}, {order.deliveryAddress.house}
              {order.deliveryAddress.apartment && `, кв. ${order.deliveryAddress.apartment}`}
            </p>
          </div>
        </Card>

        {/* Order total */}
        <Card>
          <div className="flex items-center justify-between">
            <span className="font-medium text-text">Сумма заказа</span>
            <span className="text-xl font-bold text-text">
              {formatPriceShort(order.totalPrice)}
            </span>
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-3 pt-4">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleTrackOrder}
          >
            Отследить заказ
          </Button>

          <Button
            variant="outline"
            size="lg"
            fullWidth
            icon={<Home className="w-5 h-5" />}
            onClick={handleBackToMenu}
          >
            Вернуться в меню
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
