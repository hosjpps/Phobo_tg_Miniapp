import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  Heart,
  Receipt,
  Bell,
  HelpCircle,
  MessageCircle,
  ChevronRight,
  Star,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { PageWrapper } from '@/components/layout/Layout';
import { Card } from '@/components/ui/Card';
import { useTelegramUser, useAddresses, useFavoriteIds, useOrders } from '@/store';
import { ROUTES } from '@/constants/routes';
import { APP_CONFIG } from '@/constants/config';
import { openTelegramLink } from '@/utils/telegram';

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string | number;
  onClick: () => void;
}

function MenuItem({ icon, label, value, onClick }: MenuItemProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 bg-white rounded-xl hover:bg-neutral/50 transition-colors"
    >
      <div className="w-10 h-10 bg-neutral rounded-full flex items-center justify-center text-text-light">
        {icon}
      </div>
      <span className="flex-1 text-left font-medium text-text">{label}</span>
      {value !== undefined && (
        <span className="text-sm text-text-light mr-2">{value}</span>
      )}
      <ChevronRight className="w-5 h-5 text-text-light" />
    </motion.button>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const telegramUser = useTelegramUser();
  const addresses = useAddresses();
  const favoriteIds = useFavoriteIds();
  const orders = useOrders();

  const handleContactSupport = () => {
    openTelegramLink(APP_CONFIG.telegram);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Профиль" />

      <PageWrapper className="space-y-6">
        {/* User Info */}
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {telegramUser?.firstName?.charAt(0) || 'U'}
            </div>
            <div>
              <h2 className="text-lg font-bold text-text">
                {telegramUser?.firstName || 'Пользователь'}
                {telegramUser?.lastName && ` ${telegramUser.lastName}`}
              </h2>
              {telegramUser?.username && (
                <p className="text-sm text-text-light">@{telegramUser.username}</p>
              )}
              {telegramUser?.isPremium && (
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  <span className="text-xs text-accent font-medium">Premium</span>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card
            onClick={() => navigate(ROUTES.ORDERS)}
            className="text-center"
          >
            <p className="text-2xl font-bold text-primary">{orders.length}</p>
            <p className="text-xs text-text-light">Заказов</p>
          </Card>
          <Card
            onClick={() => navigate(ROUTES.FAVORITES)}
            className="text-center"
          >
            <p className="text-2xl font-bold text-primary">{favoriteIds.length}</p>
            <p className="text-xs text-text-light">Избранное</p>
          </Card>
          <Card
            onClick={() => navigate(ROUTES.ADDRESSES)}
            className="text-center"
          >
            <p className="text-2xl font-bold text-primary">{addresses.length}</p>
            <p className="text-xs text-text-light">Адресов</p>
          </Card>
        </div>

        {/* Menu */}
        <div className="space-y-2">
          <MenuItem
            icon={<MapPin className="w-5 h-5" />}
            label="Мои адреса"
            value={addresses.length}
            onClick={() => navigate(ROUTES.ADDRESSES)}
          />
          <MenuItem
            icon={<Heart className="w-5 h-5" />}
            label="Избранное"
            value={favoriteIds.length}
            onClick={() => navigate(ROUTES.FAVORITES)}
          />
          <MenuItem
            icon={<Receipt className="w-5 h-5" />}
            label="История заказов"
            value={orders.length}
            onClick={() => navigate(ROUTES.ORDERS)}
          />
        </div>

        <div className="space-y-2">
          <MenuItem
            icon={<Bell className="w-5 h-5" />}
            label="Уведомления"
            onClick={() => {}}
          />
          <MenuItem
            icon={<HelpCircle className="w-5 h-5" />}
            label="Помощь"
            onClick={handleContactSupport}
          />
          <MenuItem
            icon={<MessageCircle className="w-5 h-5" />}
            label="Связаться с нами"
            onClick={handleContactSupport}
          />
        </div>

        {/* App Version */}
        <p className="text-center text-xs text-text-light">
          PhoBo Delivery v{APP_CONFIG.version}
        </p>
      </PageWrapper>
    </div>
  );
}
