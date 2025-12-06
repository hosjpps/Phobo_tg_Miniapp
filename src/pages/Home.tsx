import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { PageWrapper, FloatingCartButton } from '@/components/layout/Layout';
import { SearchBar, CategoryFilter, MenuGrid } from '@/components/menu';
import { useCart, useTelegram } from '@/hooks';
import { useAppStore } from '@/store';
import { ROUTES } from '@/constants/routes';

export default function Home() {
  const navigate = useNavigate();
  const { isReady } = useTelegram();
  const { itemsCount, totalPrice } = useCart();
  const { resetFilters } = useAppStore();

  // Reset filters when coming back to home
  useEffect(() => {
    return () => {
      // Don't reset if navigating to dish detail
    };
  }, []);

  const handleCartClick = () => {
    navigate(ROUTES.CART);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <PageWrapper>
        {/* Search */}
        <div className="mb-4">
          <SearchBar />
        </div>

        {/* Categories */}
        <div className="mb-6">
          <CategoryFilter />
        </div>

        {/* Menu Grid */}
        <MenuGrid isLoading={!isReady} />
      </PageWrapper>

      {/* Floating Cart Button */}
      <FloatingCartButton
        itemsCount={itemsCount}
        totalPrice={totalPrice}
        onClick={handleCartClick}
      />
    </div>
  );
}
