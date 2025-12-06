import { create } from 'zustand';

interface AppStore {
  // State
  isInitialized: boolean;
  isLoading: boolean;
  searchQuery: string;
  selectedCategory: string;
  isMenuSearchOpen: boolean;

  // Actions
  setInitialized: (initialized: boolean) => void;
  setLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setMenuSearchOpen: (open: boolean) => void;
  resetFilters: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  isInitialized: false,
  isLoading: false,
  searchQuery: '',
  selectedCategory: 'all',
  isMenuSearchOpen: false,

  setInitialized: (initialized) => set({ isInitialized: initialized }),
  setLoading: (loading) => set({ isLoading: loading }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setMenuSearchOpen: (open) => set({ isMenuSearchOpen: open }),

  resetFilters: () => set({
    searchQuery: '',
    selectedCategory: 'all',
    isMenuSearchOpen: false,
  }),
}));

// Selector hooks
export const useIsInitialized = () => useAppStore((state) => state.isInitialized);
export const useIsLoading = () => useAppStore((state) => state.isLoading);
export const useSearchQuery = () => useAppStore((state) => state.searchQuery);
export const useSelectedCategory = () => useAppStore((state) => state.selectedCategory);
export const useIsMenuSearchOpen = () => useAppStore((state) => state.isMenuSearchOpen);
