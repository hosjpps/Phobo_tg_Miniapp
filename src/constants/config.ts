// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'https://api.phobo.cafe';
export const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '';

// App Configuration
export const APP_CONFIG = {
  name: 'PhoBo Delivery',
  description: 'Доставка вьетнамской еды',
  version: '1.0.0',

  // Delivery settings
  deliveryFee: 200,
  freeDeliveryThreshold: 1500,

  // Order settings
  minOrderAmount: 500,
  maxItemQuantity: 10,
  estimatedDeliveryTime: 45, // minutes

  // Working hours
  workingHours: {
    start: 10, // 10:00
    end: 22,   // 22:00
  },

  // Contact info
  phone: '+7 (999) 123-45-67',
  email: 'info@phobo.cafe',

  // Social links
  telegram: 'https://t.me/phobo_cafe',
  instagram: 'https://instagram.com/phobo_cafe',
};

// Theme colors (matching Tailwind config)
export const COLORS = {
  primary: '#C41E3A',
  secondary: '#FF8C42',
  accent: '#D4AF37',
  background: '#FFF8F0',
  text: '#3E2723',
  textLight: '#8D6E63',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  neutral: '#F5F5F5',
  border: '#E0E0E0',
};

// Spice levels configuration
export const SPICE_LEVELS = [
  { level: 0, label: 'Без остроты', emoji: '', color: '#9E9E9E' },
  { level: 1, label: 'Слабо острое', emoji: '🌶️', color: '#FF9800' },
  { level: 2, label: 'Средне острое', emoji: '🌶️🌶️', color: '#FF5722' },
  { level: 3, label: 'Очень острое', emoji: '🌶️🌶️🌶️', color: '#F44336' },
];

// Payment methods
export const PAYMENT_METHODS = [
  { id: 'cash', label: 'Наличными курьеру', icon: 'Banknote' },
  { id: 'card_courier', label: 'Картой курьеру', icon: 'CreditCard' },
  { id: 'card', label: 'Онлайн картой', icon: 'Smartphone' },
  { id: 'telegram_stars', label: 'Telegram Stars', icon: 'Star' },
] as const;

// Address types
export const ADDRESS_TYPES = [
  { id: 'home', label: 'Дом', icon: 'Home' },
  { id: 'work', label: 'Работа', icon: 'Building2' },
  { id: 'other', label: 'Другое', icon: 'MapPin' },
] as const;
