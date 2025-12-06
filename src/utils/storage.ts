const STORAGE_PREFIX = 'phobo_';

// Generic storage helpers
export const getStorageItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item) as T;
  } catch {
    return defaultValue;
  }
};

export const setStorageItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

export const removeStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
  } catch (error) {
    console.error('Failed to remove from localStorage:', error);
  }
};

export const clearAllStorage = (): void => {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
};

// Cache with TTL
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export const getCachedItem = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(`${STORAGE_PREFIX}cache_${key}`);
    if (!item) {
      return null;
    }

    const cached = JSON.parse(item) as CacheItem<T>;
    const now = Date.now();

    if (now - cached.timestamp > cached.ttl) {
      // Cache expired
      localStorage.removeItem(`${STORAGE_PREFIX}cache_${key}`);
      return null;
    }

    return cached.data;
  } catch {
    return null;
  }
};

export const setCachedItem = <T>(key: string, data: T, ttlMs = 3600000): void => {
  try {
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttlMs,
    };
    localStorage.setItem(`${STORAGE_PREFIX}cache_${key}`, JSON.stringify(cacheItem));
  } catch (error) {
    console.error('Failed to cache item:', error);
  }
};

export const clearCache = (): void => {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(`${STORAGE_PREFIX}cache_`)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Failed to clear cache:', error);
  }
};

// Storage keys constants
export const STORAGE_KEYS = {
  CART: 'cart',
  USER: 'user',
  ORDERS: 'orders',
  FAVORITES: 'favorites',
  ADDRESSES: 'addresses',
  LAST_ADDRESS: 'last_address',
  THEME: 'theme',
  FIRST_VISIT: 'first_visit',
  PROMO_USED: 'promo_used',
} as const;

// Specific storage functions
export const isFirstVisit = (): boolean => {
  const visited = getStorageItem<boolean>(STORAGE_KEYS.FIRST_VISIT, false);
  if (!visited) {
    setStorageItem(STORAGE_KEYS.FIRST_VISIT, true);
    return true;
  }
  return false;
};

export const hasUsedPromoCode = (code: string): boolean => {
  const usedCodes = getStorageItem<string[]>(STORAGE_KEYS.PROMO_USED, []);
  return usedCodes.includes(code.toUpperCase());
};

export const markPromoCodeAsUsed = (code: string): void => {
  const usedCodes = getStorageItem<string[]>(STORAGE_KEYS.PROMO_USED, []);
  if (!usedCodes.includes(code.toUpperCase())) {
    usedCodes.push(code.toUpperCase());
    setStorageItem(STORAGE_KEYS.PROMO_USED, usedCodes);
  }
};
