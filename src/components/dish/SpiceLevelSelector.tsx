import React from 'react';
import { motion } from 'framer-motion';
import { SPICE_LEVELS } from '@/constants/config';
import { useHapticFeedback } from '@/hooks';

interface SpiceLevelSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export function SpiceLevelSelector({ value, onChange }: SpiceLevelSelectorProps) {
  const { selectionChanged } = useHapticFeedback();

  const handleChange = (level: number) => {
    onChange(level);
    selectionChanged();
  };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-text">Уровень остроты</h3>
      <div className="flex gap-2">
        {SPICE_LEVELS.map((spice) => {
          const isSelected = value === spice.level;

          return (
            <motion.button
              key={spice.level}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleChange(spice.level)}
              className={`
                flex-1 py-3 px-2 rounded-xl text-center transition-colors
                ${isSelected
                  ? 'bg-primary text-white'
                  : 'bg-neutral hover:bg-neutral-200 text-text'
                }
              `}
            >
              <div className="text-lg mb-1">
                {spice.emoji || '🍜'}
              </div>
              <div className="text-xs font-medium line-clamp-1">
                {spice.label}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
