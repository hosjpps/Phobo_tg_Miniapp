import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '@/data/categories';
import { useAppStore } from '@/store';
import { useHapticFeedback } from '@/hooks';

export function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useAppStore();
  const { selectionChanged } = useHapticFeedback();
  const scrollRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Scroll selected category into view
  useEffect(() => {
    const button = buttonRefs.current.get(selectedCategory);
    if (button && scrollRef.current) {
      const container = scrollRef.current;
      const buttonLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;
      const containerWidth = container.offsetWidth;
      const scrollLeft = buttonLeft - (containerWidth - buttonWidth) / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  }, [selectedCategory]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    selectionChanged();
  };

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto scrollbar-hide py-2 px-4 -mx-4"
    >
      {CATEGORIES.map((category) => {
        const isSelected = selectedCategory === category.id;

        return (
          <motion.button
            key={category.id}
            ref={(el) => {
              if (el) buttonRefs.current.set(category.id, el);
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategoryClick(category.id)}
            className={`
              flex-shrink-0 flex items-center gap-2
              px-4 py-2.5 rounded-xl font-medium text-sm
              transition-colors duration-200
              ${isSelected
                ? 'bg-primary text-white'
                : 'bg-white text-text border border-border'
              }
            `}
          >
            <span className="text-base">{category.icon}</span>
            <span>{category.name}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
