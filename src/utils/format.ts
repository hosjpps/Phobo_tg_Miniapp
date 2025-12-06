import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatPriceShort = (price: number): string => {
  return `${price}₽`;
};

export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  if (diffMins < 1) return 'только что';
  if (diffMins < 60) return `${diffMins} мин назад`;
  if (diffHours < 24 && isToday(d)) {
    return formatDistanceToNow(d, { addSuffix: true, locale: ru });
  }
  if (isYesterday(d)) return 'вчера';

  return format(d, 'd MMMM, HH:mm', { locale: ru });
};

export const formatTime = (date: Date | string): string => {
  return format(new Date(date), 'HH:mm', { locale: ru });
};

export const formatDateTime = (date: Date | string): string => {
  return format(new Date(date), 'd MMMM yyyy, HH:mm', { locale: ru });
};

export const formatDeliveryTime = (date: Date | string): string => {
  const d = new Date(date);
  if (isToday(d)) {
    return `сегодня к ${format(d, 'HH:mm')}`;
  }
  return format(d, 'd MMMM к HH:mm', { locale: ru });
};

export const formatWeight = (weight: string): string => {
  return weight;
};

export const getSpiceLevelText = (level: number): string => {
  const levels = ['Без остроты', 'Слабо острое', 'Средне острое', 'Очень острое'];
  return levels[level] || levels[0];
};

export const getSpiceLevelEmoji = (level: number): string => {
  if (level === 0) return '';
  return '🌶️'.repeat(level);
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
  }
  return phone;
};

export const formatOrderNumber = (orderId: string): string => {
  // Extract the short part of the order ID
  const parts = orderId.split('-');
  if (parts.length >= 2) {
    return `#${parts[parts.length - 1].slice(0, 6).toUpperCase()}`;
  }
  return `#${orderId.slice(0, 6).toUpperCase()}`;
};

export const pluralize = (count: number, one: string, few: string, many: string): string => {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 19) {
    return many;
  }
  if (mod10 === 1) {
    return one;
  }
  if (mod10 >= 2 && mod10 <= 4) {
    return few;
  }
  return many;
};

export const formatItemsCount = (count: number): string => {
  const word = pluralize(count, 'товар', 'товара', 'товаров');
  return `${count} ${word}`;
};

export const formatMinutes = (minutes: number): string => {
  const word = pluralize(minutes, 'минута', 'минуты', 'минут');
  return `${minutes} ${word}`;
};
