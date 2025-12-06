import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed } from 'lucide-react';
import type { Dish } from '@/types';
import { MenuCard } from './MenuCard';
import { SkeletonMenuCard, EmptyState } from '@/components/ui';
import { getDishesByCategory, searchDishes } from '@/data/menu';
import { useAppStore } from '@/store';

interface MenuGridProps {
  isLoading?: boolean;
}

export function MenuGrid({ isLoading = false }: MenuGridProps) {
  const { selectedCategory, searchQuery } = useAppStore();

  const dishes = useMemo(() => {
    let result: Dish[];

    if (searchQuery.trim()) {
      result = searchDishes(searchQuery);
      // If searching, also filter by category if not 'all'
      if (selectedCategory !== 'all') {
        result = result.filter((dish) => dish.category === selectedCategory);
      }
    } else {
      result = getDishesByCategory(selectedCategory);
    }

    return result;
  }, [selectedCategory, searchQuery]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonMenuCard key={i} />
        ))}
      </div>
    );
  }

  if (dishes.length === 0) {
    return (
      <EmptyState
        icon={UtensilsCrossed}
        title="Ничего не найдено"
        description={
          searchQuery
            ? `По запросу "${searchQuery}" ничего не найдено. Попробуйте изменить запрос.`
            : 'В этой категории пока нет блюд.'
        }
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-2 gap-4"
    >
      {dishes.map((dish, index) => (
        <motion.div
          key={dish.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <MenuCard dish={dish} />
        </motion.div>
      ))}
    </motion.div>
  );
}
