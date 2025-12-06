export {
  formatPrice,
  formatPriceShort,
  formatDate,
  formatTime,
  formatDateTime,
  formatDeliveryTime,
  formatWeight,
  getSpiceLevelText,
  getSpiceLevelEmoji,
  formatPhoneNumber,
  formatOrderNumber,
  pluralize,
  formatItemsCount,
  formatMinutes,
} from './format';

export {
  isTelegramWebApp,
  getTelegramWebApp,
  initTelegramWebApp,
  closeTelegramWebApp,
  openTelegramLink,
  openExternalLink,
  shareUrl,
  showTelegramAlert,
  showTelegramConfirm,
  hapticFeedback,
  getTelegramUser,
  getThemeParams,
  getColorScheme,
  getPlatform,
} from './telegram';

export {
  addressSchema,
  orderCommentSchema,
  promoCodeSchema,
  phoneSchema,
  emailSchema,
  validateAddress,
  validatePromoCodeFormat,
  isWithinWorkingHours,
  validateMinOrderAmount,
  generateCartItemId,
  generateOrderId,
  generateAddressId,
} from './validation';

export type { AddressFormData } from './validation';

export {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
  clearAllStorage,
  getCachedItem,
  setCachedItem,
  clearCache,
  STORAGE_KEYS,
  isFirstVisit,
  hasUsedPromoCode,
  markPromoCodeAsUsed,
} from './storage';
