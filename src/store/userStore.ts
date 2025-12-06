import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Address, TelegramUser } from '@/types';
import { generateAddressId } from '@/utils/validation';

interface UserStore {
  // State
  telegramUser: TelegramUser | null;
  addresses: Address[];
  selectedAddress: Address | null;
  favoriteIds: string[];

  // Actions
  setTelegramUser: (user: TelegramUser | null) => void;
  addAddress: (address: Omit<Address, 'id'>) => Address;
  updateAddress: (id: string, updates: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  selectAddress: (address: Address | null) => void;
  toggleFavorite: (dishId: string) => void;
  isFavorite: (dishId: string) => boolean;
  getFavoriteIds: () => string[];

  // Helpers
  getDefaultAddress: () => Address | undefined;
  getAddressById: (id: string) => Address | undefined;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      telegramUser: null,
      addresses: [],
      selectedAddress: null,
      favoriteIds: [],

      setTelegramUser: (user) => {
        set({ telegramUser: user });
      },

      addAddress: (addressData) => {
        const id = generateAddressId();
        const addresses = get().addresses;

        // If this is the first address or marked as default, make it default
        const isFirstOrDefault = addresses.length === 0 || addressData.isDefault;

        const newAddress: Address = {
          ...addressData,
          id,
          isDefault: isFirstOrDefault,
        };

        if (isFirstOrDefault) {
          // Remove default from other addresses
          set({
            addresses: [
              ...addresses.map((a) => ({ ...a, isDefault: false })),
              newAddress,
            ],
            selectedAddress: newAddress,
          });
        } else {
          set({ addresses: [...addresses, newAddress] });
        }

        return newAddress;
      },

      updateAddress: (id, updates) => {
        set({
          addresses: get().addresses.map((a) =>
            a.id === id ? { ...a, ...updates } : a
          ),
        });

        // Update selected address if it's the one being updated
        const selectedAddress = get().selectedAddress;
        if (selectedAddress?.id === id) {
          set({
            selectedAddress: { ...selectedAddress, ...updates },
          });
        }
      },

      deleteAddress: (id) => {
        const addresses = get().addresses.filter((a) => a.id !== id);
        const deletedWasDefault = get().addresses.find((a) => a.id === id)?.isDefault;

        // If deleted address was default, make first remaining address default
        if (deletedWasDefault && addresses.length > 0) {
          addresses[0].isDefault = true;
        }

        set({ addresses });

        // Clear selected address if it was deleted
        if (get().selectedAddress?.id === id) {
          set({ selectedAddress: addresses[0] || null });
        }
      },

      setDefaultAddress: (id) => {
        set({
          addresses: get().addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        });
      },

      selectAddress: (address) => {
        set({ selectedAddress: address });
      },

      toggleFavorite: (dishId) => {
        const favorites = get().favoriteIds;
        if (favorites.includes(dishId)) {
          set({ favoriteIds: favorites.filter((id) => id !== dishId) });
        } else {
          set({ favoriteIds: [...favorites, dishId] });
        }
      },

      isFavorite: (dishId) => {
        return get().favoriteIds.includes(dishId);
      },

      getFavoriteIds: () => {
        return get().favoriteIds;
      },

      getDefaultAddress: () => {
        return get().addresses.find((a) => a.isDefault);
      },

      getAddressById: (id) => {
        return get().addresses.find((a) => a.id === id);
      },
    }),
    {
      name: 'phobo-user',
      partialize: (state) => ({
        telegramUser: state.telegramUser,
        addresses: state.addresses,
        selectedAddress: state.selectedAddress,
        favoriteIds: state.favoriteIds,
      }),
    }
  )
);

// Selector hooks
export const useTelegramUser = () => useUserStore((state) => state.telegramUser);
export const useAddresses = () => useUserStore((state) => state.addresses);
export const useSelectedAddress = () => useUserStore((state) => state.selectedAddress);
export const useFavoriteIds = () => useUserStore((state) => state.favoriteIds);
