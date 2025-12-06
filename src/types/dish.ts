export interface Addon {
  id: string;
  name: string;
  price: number;
}

export interface DishTags {
  isBestseller: boolean;
  isSpicy: boolean;
  isVegetarian: boolean;
  isNew: boolean;
}

export interface DishNutrition {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface DishCustomizations {
  spiceLevel: boolean;
  addons: Addon[];
}

export interface Dish {
  id: string;
  name: string;
  nameVietnamese: string;
  category: DishCategory;
  description: string;
  price: number;
  weight: string;
  imageUrl: string;
  tags: DishTags;
  ingredients: string[];
  nutrition: DishNutrition;
  customizations: DishCustomizations;
}

export type DishCategory =
  | 'pho'
  | 'appetizers'
  | 'noodles'
  | 'rice'
  | 'salads'
  | 'drinks'
  | 'desserts';

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}
