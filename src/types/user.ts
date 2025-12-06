export type AddressType = 'home' | 'work' | 'other';

export interface Address {
  id: string;
  type: AddressType;
  street: string;
  house: string;
  building?: string;
  apartment?: string;
  entrance?: string;
  floor?: string;
  intercom?: string;
  comment?: string;
  isDefault: boolean;
}

export interface TelegramUser {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  isPremium?: boolean;
  photoUrl?: string;
}

export interface UserState {
  telegramUser: TelegramUser | null;
  addresses: Address[];
  selectedAddress: Address | null;
  favoriteIds: string[];
}
