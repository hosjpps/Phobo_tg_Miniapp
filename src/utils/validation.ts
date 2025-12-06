import { z } from 'zod';

// Address validation schema
export const addressSchema = z.object({
  type: z.enum(['home', 'work', 'other']),
  street: z.string().min(3, 'Укажите улицу').max(100, 'Слишком длинное название'),
  house: z.string().min(1, 'Укажите номер дома').max(10, 'Некорректный номер'),
  building: z.string().max(10, 'Некорректный номер корпуса').optional(),
  apartment: z.string().max(10, 'Некорректный номер квартиры').optional(),
  entrance: z.string().max(5, 'Некорректный номер подъезда').optional(),
  floor: z.string().max(5, 'Некорректный номер этажа').optional(),
  intercom: z.string().max(10, 'Некорректный код домофона').optional(),
  comment: z.string().max(200, 'Комментарий слишком длинный').optional(),
  isDefault: z.boolean().optional(),
});

export type AddressFormData = z.infer<typeof addressSchema>;

// Order comment validation
export const orderCommentSchema = z.string().max(500, 'Комментарий слишком длинный').optional();

// Promo code validation
export const promoCodeSchema = z.string().min(1, 'Введите промокод').max(20, 'Некорректный промокод');

// Phone validation
export const phoneSchema = z
  .string()
  .min(10, 'Некорректный номер телефона')
  .max(20, 'Некорректный номер телефона')
  .regex(/^[\d\s\+\-\(\)]+$/, 'Некорректный номер телефона');

// Email validation
export const emailSchema = z.string().email('Некорректный email');

// Validate address
export const validateAddress = (data: unknown): { success: boolean; data?: AddressFormData; error?: string } => {
  try {
    const result = addressSchema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0]?.message || 'Ошибка валидации' };
    }
    return { success: false, error: 'Неизвестная ошибка' };
  }
};

// Validate promo code format
export const validatePromoCodeFormat = (code: string): { valid: boolean; error?: string } => {
  try {
    promoCodeSchema.parse(code);
    return { valid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, error: error.errors[0]?.message };
    }
    return { valid: false, error: 'Некорректный промокод' };
  }
};

// Check if working hours
export const isWithinWorkingHours = (startHour = 10, endHour = 22): boolean => {
  const now = new Date();
  const hour = now.getHours();
  return hour >= startHour && hour < endHour;
};

// Validate minimum order amount
export const validateMinOrderAmount = (amount: number, minAmount = 500): { valid: boolean; error?: string } => {
  if (amount < minAmount) {
    return { valid: false, error: `Минимальная сумма заказа ${minAmount}₽` };
  }
  return { valid: true };
};

// Generate unique cart item ID
export const generateCartItemId = (dishId: string, customizations: unknown): string => {
  const customizationsString = JSON.stringify(customizations || {});
  return `${dishId}-${hashString(customizationsString)}`;
};

// Simple hash function for strings
const hashString = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
};

// Generate order ID
export const generateOrderId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 11).toUpperCase();
  return `ORD-${timestamp}-${random}`;
};

// Generate address ID
export const generateAddressId = (): string => {
  return `addr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
};
