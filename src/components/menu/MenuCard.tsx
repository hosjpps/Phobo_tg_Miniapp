import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Heart } from 'lucide-react';
import type { Dish } from '@/types';
import { formatPriceShort } from '@/utils/format';
import { BestsellerBadge, NewBadge, SpicyBadge, VegetarianBadge } from '@/components/ui/Badge';
import { useUserStore } from '@/store';
import { useHapticFeedback } from '@/hooks';
import { getDishRoute } from '@/constants/routes';

interface MenuCardProps {
  dish: Dish;
  onQuickAdd?: () => void;
}

export const MenuCard = memo(function MenuCard({ dish, onQuickAdd }: MenuCardProps) {
  const navigate = useNavigate();
  const { impact } = useHapticFeedback();
  const { isFavorite, toggleFavorite } = useUserStore();

  const isLiked = isFavorite(dish.id);

  const handleClick = () => {
    navigate(getDishRoute(dish.id));
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(dish.id);
    impact('light');
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickAdd) {
      onQuickAdd();
    } else {
      navigate(getDishRoute(dish.id));
    }
    impact('medium');
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="bg-white rounded-2xl overflow-hidden shadow-card cursor-pointer hover:shadow-card-hover transition-shadow"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={dish.imageUrl}
          alt={dish.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {dish.tags.isBestseller && <BestsellerBadge />}
          {dish.tags.isNew && <NewBadge />}
          {dish.tags.isSpicy && <SpicyBadge />}
          {dish.tags.isVegetarian && <VegetarianBadge />}
        </div>

        {/* Favorite button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
        >
          <Heart
            className={`w-4 h-4 ${
              isLiked ? 'text-primary fill-primary' : 'text-text-light'
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-semibold text-text text-sm line-clamp-1 mb-0.5">
          {dish.name}
        </h3>
        <p className="text-xs text-text-light mb-2">{dish.weight}</p>

        <div className="flex items-center justify-between">
          <span className="font-bold text-text">
            {formatPriceShort(dish.price)}
          </span>

          <button
            onClick={handleQuickAdd}
            className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white hover:bg-secondary-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
});
