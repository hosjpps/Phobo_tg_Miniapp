import React, { useState } from 'react';
import { Tag, X, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks';

export function PromoCode() {
  const { promoCode, appliedPromo, applyPromoCode, removePromoCode } = useCart();
  const [inputValue, setInputValue] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApply = async () => {
    if (!inputValue.trim()) return;

    setIsApplying(true);
    setError(null);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const result = applyPromoCode(inputValue);

    if (!result.success) {
      setError(result.error || 'Ошибка при применении промокода');
    } else {
      setInputValue('');
    }

    setIsApplying(false);
  };

  const handleRemove = () => {
    removePromoCode();
    setInputValue('');
    setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApply();
    }
  };

  if (appliedPromo) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-success/10 rounded-xl p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-success" />
            </div>
            <div>
              <p className="font-semibold text-success text-sm">{promoCode}</p>
              <p className="text-xs text-text-light">{appliedPromo.description}</p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="p-2 hover:bg-neutral rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-text-light" />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow-card">
      <div className="flex items-center gap-2 mb-3">
        <Tag className="w-5 h-5 text-secondary" />
        <span className="font-medium text-text">Промокод</span>
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value.toUpperCase());
              setError(null);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Введите промокод"
            error={error || undefined}
            disabled={isApplying}
          />
        </div>
        <Button
          variant="secondary"
          onClick={handleApply}
          disabled={!inputValue.trim() || isApplying}
          loading={isApplying}
        >
          Применить
        </Button>
      </div>

      {/* Available promo codes hint */}
      <AnimatePresence>
        {!inputValue && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-text-light mt-2"
          >
            Попробуйте: FIRST20, PHOBO15, FREE500
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
