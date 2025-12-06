import type { Category } from '@/types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'Все блюда', icon: '🍜', color: '#C41E3A' },
  { id: 'pho', name: 'Супы Фо', icon: '🥣', color: '#FF8C42' },
  { id: 'appetizers', name: 'Закуски', icon: '🥟', color: '#D4AF37' },
  { id: 'noodles', name: 'Лапша', icon: '🍜', color: '#4CAF50' },
  { id: 'rice', name: 'Рис', icon: '🍚', color: '#FF9800' },
  { id: 'salads', name: 'Салаты', icon: '🥗', color: '#8BC34A' },
  { id: 'drinks', name: 'Напитки', icon: '🥤', color: '#00BCD4' },
  { id: 'desserts', name: 'Десерты', icon: '🍰', color: '#E91E63' },
];

export const getCategoryById = (id: string): Category | undefined => {
  return CATEGORIES.find((category) => category.id === id);
};

export const getCategoryName = (id: string): string => {
  const category = getCategoryById(id);
  return category ? category.name : 'Неизвестная категория';
};
