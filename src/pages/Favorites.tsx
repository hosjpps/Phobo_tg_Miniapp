import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { PageWrapper } from '@/components/layout/Layout';
import { MenuCard } from '@/components/menu';
import { EmptyState } from '@/components/ui';
import { useFavoriteIds } from '@/store';
import { useBackButton } from '@/hooks';
import { PHOBO_MENU } from '@/data/menu';
import { ROUTES } from '@/constants/routes';

export default function Favorites() {
  const navigate = useNavigate();
  const favoriteIds = useFavoriteIds();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useBackButton(handleBack);

  const favoriteDishes = useMemo(() => {
    return PHOBO_MENU.filter((dish) => favoriteIds.includes(dish.id));
  }, [favoriteIds]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Избранное" showBack />

      <PageWrapper>
        {favoriteDishes.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="Нет избранных блюд"
            description="Добавляйте понравившиеся блюда в избранное, нажимая на сердечко"
            actionLabel="Перейти в меню"
            onAction={() => navigate(ROUTES.HOME)}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {favoriteDishes.map((dish) => (
                <motion.div
                  key={dish.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <MenuCard dish={dish} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </PageWrapper>
    </div>
  );
}
