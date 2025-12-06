import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BottomNav } from '@/components/layout';
import { ToastProvider, Skeleton } from '@/components/ui';
import { useTelegram } from '@/hooks';
import { useAppStore } from '@/store';
import {
  Home,
  DishDetail,
  Cart,
  Checkout,
  OrderSuccess,
  Orders,
  OrderDetail,
  Profile,
  Addresses,
  Favorites,
} from '@/pages';
import { ROUTES } from '@/constants/routes';

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="space-y-4 w-full max-w-sm px-4">
        <Skeleton className="h-8 w-3/4 mx-auto" rounded="lg" />
        <Skeleton className="h-4 w-1/2 mx-auto" rounded="lg" />
        <div className="pt-8 space-y-3">
          <Skeleton className="h-32 w-full" rounded="xl" />
          <Skeleton className="h-32 w-full" rounded="xl" />
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const { isReady } = useTelegram();
  const setInitialized = useAppStore((state) => state.setInitialized);

  useEffect(() => {
    if (isReady) {
      setInitialized(true);
    }
  }, [isReady, setInitialized]);

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.DISH} element={<DishDetail />} />
          <Route path={ROUTES.CART} element={<Cart />} />
          <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
          <Route path={ROUTES.ORDER_SUCCESS} element={<OrderSuccess />} />
          <Route path={ROUTES.ORDERS} element={<Orders />} />
          <Route path={ROUTES.ORDER_DETAIL} element={<OrderDetail />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.ADDRESSES} element={<Addresses />} />
          <Route path={ROUTES.FAVORITES} element={<Favorites />} />
        </Routes>
      </Suspense>

      <BottomNav />
      <ToastProvider />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
