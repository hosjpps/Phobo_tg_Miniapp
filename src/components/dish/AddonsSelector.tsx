import React from 'react';
import { motion } from 'framer-motion';
import { Check, Plus } from 'lucide-react';
import type { Addon } from '@/types';
import { formatPriceShort } from '@/utils/format';
import { useHapticFeedback } from '@/hooks';

interface AddonsSelectorProps {
  addons: Addon[];
  selected: Addon[];
  onChange: (selected: Addon[]) => void;
}

export function AddonsSelector({ addons, selected, onChange }: AddonsSelectorProps) {
  const { impact } = useHapticFeedback();

  if (!addons.length) return null;

  const handleToggle = (addon: Addon) => {
    const isSelected = selected.some((a) => a.id === addon.id);

    if (isSelected) {
      onChange(selected.filter((a) => a.id !== addon.id));
    } else {
      onChange([...selected, addon]);
    }

    impact('light');
  };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-text">Добавить к заказу</h3>
      <div className="space-y-2">
        {addons.map((addon) => {
          const isSelected = selected.some((a) => a.id === addon.id);

          return (
            <motion.button
              key={addon.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleToggle(addon)}
              className={`
                w-full flex items-center justify-between
                p-3 rounded-xl transition-colors
                ${isSelected
                  ? 'bg-secondary/10 border-2 border-secondary'
                  : 'bg-neutral border-2 border-transparent'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                    w-6 h-6 rounded-full flex items-center justify-center
                    ${isSelected ? 'bg-secondary text-white' : 'bg-neutral-200'}
                  `}
                >
                  {isSelected ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4 text-text-light" />
                  )}
                </div>
                <span className="text-sm font-medium text-text">{addon.name}</span>
              </div>
              <span className="text-sm font-semibold text-secondary">
                +{formatPriceShort(addon.price)}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
