import React, { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store';

export function SearchBar() {
  const { searchQuery, setSearchQuery, isMenuSearchOpen, setMenuSearchOpen } = useAppStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    setSearchQuery(value);
  }, [setSearchQuery]);

  const handleClear = useCallback(() => {
    setLocalQuery('');
    setSearchQuery('');
  }, [setSearchQuery]);

  const handleFocus = useCallback(() => {
    setMenuSearchOpen(true);
  }, [setMenuSearchOpen]);

  const handleBlur = useCallback(() => {
    if (!localQuery) {
      setMenuSearchOpen(false);
    }
  }, [localQuery, setMenuSearchOpen]);

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
        <input
          type="text"
          value={localQuery}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Поиск блюд..."
          className="w-full pl-12 pr-10 py-3 rounded-xl bg-white border border-border text-text placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
        <AnimatePresence>
          {localQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-neutral"
            >
              <X className="w-4 h-4 text-text-light" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Search suggestions could go here */}
    </div>
  );
}
