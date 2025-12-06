import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { APP_CONFIG } from '@/constants/config';
import { useHapticFeedback } from '@/hooks';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = APP_CONFIG.maxItemQuantity,
  size = 'md',
}: QuantitySelectorProps) {
  const { impact } = useHapticFeedback();

  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
      impact('light');
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
      impact('light');
    }
  };

  const sizeClasses = {
    sm: {
      button: 'w-7 h-7',
      icon: 'w-4 h-4',
      text: 'text-sm w-6',
      gap: 'gap-1',
    },
    md: {
      button: 'w-9 h-9',
      icon: 'w-5 h-5',
      text: 'text-base w-8',
      gap: 'gap-2',
    },
    lg: {
      button: 'w-11 h-11',
      icon: 'w-6 h-6',
      text: 'text-lg w-10',
      gap: 'gap-3',
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className={`flex items-center ${classes.gap}`}>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleDecrease}
        disabled={value <= min}
        className={`
          ${classes.button} rounded-full flex items-center justify-center
          transition-colors
          ${value <= min
            ? 'bg-neutral text-text-light cursor-not-allowed'
            : 'bg-neutral hover:bg-neutral-200 text-text'
          }
        `}
      >
        <Minus className={classes.icon} />
      </motion.button>

      <span className={`${classes.text} text-center font-semibold text-text`}>
        {value}
      </span>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleIncrease}
        disabled={value >= max}
        className={`
          ${classes.button} rounded-full flex items-center justify-center
          transition-colors
          ${value >= max
            ? 'bg-neutral text-text-light cursor-not-allowed'
            : 'bg-secondary hover:bg-secondary-600 text-white'
          }
        `}
      >
        <Plus className={classes.icon} />
      </motion.button>
    </div>
  );
}
