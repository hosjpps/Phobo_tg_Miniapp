import type { PromoCode } from '@/types';

export const PROMO_CODES: Record<string, PromoCode> = {
  FIRST20: {
    code: 'FIRST20',
    type: 'percentage',
    value: 20,
    minOrder: 0,
    description: 'Скидка 20% на первый заказ',
    maxUses: 1,
  },
  PHOBO15: {
    code: 'PHOBO15',
    type: 'percentage',
    value: 15,
    minOrder: 1000,
    description: 'Скидка 15% при заказе от 1000₽',
    maxUses: null,
  },
  FREE500: {
    code: 'FREE500',
    type: 'free_delivery',
    value: 0,
    minOrder: 0,
    description: 'Бесплатная доставка',
    maxUses: null,
  },
  NEWYEAR25: {
    code: 'NEWYEAR25',
    type: 'percentage',
    value: 25,
    minOrder: 1500,
    description: 'Новогодняя скидка 25% при заказе от 1500₽',
    maxUses: null,
  },
};

export const validatePromoCode = (
  code: string,
  subtotal: number
): { valid: boolean; promo?: PromoCode; error?: string } => {
  const normalizedCode = code.toUpperCase().trim();
  const promo = PROMO_CODES[normalizedCode];

  if (!promo) {
    return { valid: false, error: 'Промокод не найден' };
  }

  if (subtotal < promo.minOrder) {
    return {
      valid: false,
      error: `Минимальная сумма заказа ${promo.minOrder}₽`,
    };
  }

  return { valid: true, promo };
};

export const calculateDiscount = (promo: PromoCode, subtotal: number): number => {
  if (promo.type === 'free_delivery') {
    return 0;
  }

  if (promo.type === 'percentage') {
    return Math.floor(subtotal * (promo.value / 100));
  }

  if (promo.type === 'fixed') {
    return Math.min(promo.value, subtotal);
  }

  return 0;
};
