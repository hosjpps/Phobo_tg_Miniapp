import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { EmptyState } from '@/components/ui';
import { ROUTES } from '@/constants/routes';

export function EmptyCart() {
  const navigate = useNavigate();

  return (
    <EmptyState
      icon={ShoppingBag}
      title="Корзина пуста"
      description="Добавьте что-нибудь вкусное из нашего меню"
      actionLabel="Перейти в меню"
      onAction={() => navigate(ROUTES.HOME)}
    />
  );
}
