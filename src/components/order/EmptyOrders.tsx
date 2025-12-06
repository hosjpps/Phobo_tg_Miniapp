import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Receipt } from 'lucide-react';
import { EmptyState } from '@/components/ui';
import { ROUTES } from '@/constants/routes';

export function EmptyOrders() {
  const navigate = useNavigate();

  return (
    <EmptyState
      icon={Receipt}
      title="У вас пока нет заказов"
      description="Самое время что-нибудь заказать из нашего меню вьетнамской кухни!"
      actionLabel="Перейти в меню"
      onAction={() => navigate(ROUTES.HOME)}
    />
  );
}
