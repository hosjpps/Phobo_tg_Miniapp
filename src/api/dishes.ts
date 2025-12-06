import type { Dish } from '@/types';
import { PHOBO_MENU, getDishById, getDishesByCategory, searchDishes } from '@/data/menu';

// Mock API responses for development
// In production, these would call the actual API

export const dishesApi = {
  // Get all dishes
  getAll: async (): Promise<Dish[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return PHOBO_MENU;
  },

  // Get dish by ID
  getById: async (id: string): Promise<Dish | null> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return getDishById(id) || null;
  },

  // Get dishes by category
  getByCategory: async (category: string): Promise<Dish[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return getDishesByCategory(category);
  },

  // Search dishes
  search: async (query: string): Promise<Dish[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return searchDishes(query);
  },

  // Get bestsellers
  getBestsellers: async (): Promise<Dish[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return PHOBO_MENU.filter((dish) => dish.tags.isBestseller);
  },

  // Get new dishes
  getNew: async (): Promise<Dish[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return PHOBO_MENU.filter((dish) => dish.tags.isNew);
  },
};
