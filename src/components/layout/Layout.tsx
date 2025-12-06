import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

interface LayoutProps {
  children?: React.ReactNode;
  showHeader?: boolean;
  showBottomNav?: boolean;
  headerProps?: {
    title?: string;
    showBack?: boolean;
    showCart?: boolean;
    transparent?: boolean;
  };
}

export function Layout({
  children,
  showHeader = true,
  showBottomNav = true,
  headerProps,
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {showHeader && <Header {...headerProps} />}

      <main className={`${showBottomNav ? 'pb-20' : ''}`}>
        {children || <Outlet />}
      </main>

      {showBottomNav && <BottomNav />}
    </div>
  );
}

// Page wrapper for consistent padding
interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function PageWrapper({ children, className = '', noPadding = false }: PageWrapperProps) {
  return (
    <div className={`${noPadding ? '' : 'px-4 py-4'} ${className}`}>
      {children}
    </div>
  );
}

// Floating cart button for menu page
interface FloatingCartButtonProps {
  itemsCount: number;
  totalPrice: number;
  onClick: () => void;
}

export function FloatingCartButton({
  itemsCount,
  totalPrice,
  onClick,
}: FloatingCartButtonProps) {
  if (itemsCount === 0) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 left-4 right-4 z-40 bg-secondary hover:bg-secondary-600 text-white py-4 px-6 rounded-2xl shadow-lg flex items-center justify-between transition-colors"
    >
      <span className="font-semibold">Корзина ({itemsCount})</span>
      <span className="font-bold">{totalPrice}₽</span>
    </button>
  );
}
