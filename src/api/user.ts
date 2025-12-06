import type { Address, TelegramUser } from '@/types';
import { generateAddressId } from '@/utils/validation';

// Mock user data storage
let mockAddresses: Address[] = [];
let mockFavorites: string[] = [];

export const userApi = {
  // Get user profile from Telegram data
  getProfile: async (): Promise<TelegramUser | null> => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const tgWebApp = window.Telegram?.WebApp;
    const user = tgWebApp?.initDataUnsafe?.user;

    if (user) {
      return {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        username: user.username,
        languageCode: user.language_code,
        isPremium: user.is_premium,
        photoUrl: user.photo_url,
      };
    }

    // Return mock user for development
    return {
      id: 123456789,
      firstName: 'Test',
      lastName: 'User',
      username: 'testuser',
    };
  },

  // Addresses
  getAddresses: async (): Promise<Address[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockAddresses;
  },

  addAddress: async (address: Omit<Address, 'id'>): Promise<Address> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const newAddress: Address = {
      ...address,
      id: generateAddressId(),
    };

    // If first address or marked as default, make it default
    if (mockAddresses.length === 0 || address.isDefault) {
      mockAddresses = mockAddresses.map((a) => ({ ...a, isDefault: false }));
      newAddress.isDefault = true;
    }

    mockAddresses.push(newAddress);
    return newAddress;
  },

  updateAddress: async (id: string, updates: Partial<Address>): Promise<Address | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const index = mockAddresses.findIndex((a) => a.id === id);
    if (index === -1) return null;

    mockAddresses[index] = { ...mockAddresses[index], ...updates };
    return mockAddresses[index];
  },

  deleteAddress: async (id: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const index = mockAddresses.findIndex((a) => a.id === id);
    if (index === -1) return false;

    mockAddresses.splice(index, 1);

    // If deleted address was default, make first remaining address default
    if (mockAddresses.length > 0 && !mockAddresses.some((a) => a.isDefault)) {
      mockAddresses[0].isDefault = true;
    }

    return true;
  },

  // Favorites
  getFavorites: async (): Promise<string[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockFavorites;
  },

  addFavorite: async (dishId: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    if (!mockFavorites.includes(dishId)) {
      mockFavorites.push(dishId);
    }
  },

  removeFavorite: async (dishId: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    mockFavorites = mockFavorites.filter((id) => id !== dishId);
  },

  toggleFavorite: async (dishId: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    if (mockFavorites.includes(dishId)) {
      mockFavorites = mockFavorites.filter((id) => id !== dishId);
      return false;
    } else {
      mockFavorites.push(dishId);
      return true;
    }
  },
};
