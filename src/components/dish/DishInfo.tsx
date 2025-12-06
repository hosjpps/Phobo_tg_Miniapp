import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Flame, Leaf } from 'lucide-react';
import type { Dish } from '@/types';
import { formatPriceShort } from '@/utils/format';
import { BestsellerBadge, NewBadge, SpicyBadge, VegetarianBadge } from '@/components/ui/Badge';

interface DishInfoProps {
  dish: Dish;
}

export function DishInfo({ dish }: DishInfoProps) {
  const [showNutrition, setShowNutrition] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);

  return (
    <div className="space-y-4">
      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {dish.tags.isBestseller && <BestsellerBadge />}
        {dish.tags.isNew && <NewBadge />}
        {dish.tags.isSpicy && <SpicyBadge />}
        {dish.tags.isVegetarian && <VegetarianBadge />}
      </div>

      {/* Name and price */}
      <div>
        <h1 className="text-2xl font-bold text-text">{dish.name}</h1>
        <p className="text-sm text-text-light">{dish.nameVietnamese}</p>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-2xl font-bold text-primary">
          {formatPriceShort(dish.price)}
        </span>
        <span className="text-sm text-text-light">{dish.weight}</span>
      </div>

      {/* Description */}
      <p className="text-text-light">{dish.description}</p>

      {/* Ingredients */}
      <div className="bg-neutral rounded-xl overflow-hidden">
        <button
          onClick={() => setShowIngredients(!showIngredients)}
          className="w-full flex items-center justify-between p-4"
        >
          <span className="font-medium text-text">Состав</span>
          {showIngredients ? (
            <ChevronUp className="w-5 h-5 text-text-light" />
          ) : (
            <ChevronDown className="w-5 h-5 text-text-light" />
          )}
        </button>
        <AnimatePresence>
          {showIngredients && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4 pb-4">
                <div className="flex flex-wrap gap-2">
                  {dish.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white rounded-full text-sm text-text"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nutrition */}
      <div className="bg-neutral rounded-xl overflow-hidden">
        <button
          onClick={() => setShowNutrition(!showNutrition)}
          className="w-full flex items-center justify-between p-4"
        >
          <span className="font-medium text-text">Пищевая ценность</span>
          {showNutrition ? (
            <ChevronUp className="w-5 h-5 text-text-light" />
          ) : (
            <ChevronDown className="w-5 h-5 text-text-light" />
          )}
        </button>
        <AnimatePresence>
          {showNutrition && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4 pb-4 grid grid-cols-4 gap-2">
                <div className="text-center p-2 bg-white rounded-lg">
                  <p className="text-lg font-bold text-primary">
                    {dish.nutrition.calories}
                  </p>
                  <p className="text-xs text-text-light">ккал</p>
                </div>
                <div className="text-center p-2 bg-white rounded-lg">
                  <p className="text-lg font-bold text-text">
                    {dish.nutrition.protein}
                  </p>
                  <p className="text-xs text-text-light">белки</p>
                </div>
                <div className="text-center p-2 bg-white rounded-lg">
                  <p className="text-lg font-bold text-text">
                    {dish.nutrition.fat}
                  </p>
                  <p className="text-xs text-text-light">жиры</p>
                </div>
                <div className="text-center p-2 bg-white rounded-lg">
                  <p className="text-lg font-bold text-text">
                    {dish.nutrition.carbs}
                  </p>
                  <p className="text-xs text-text-light">углеводы</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
