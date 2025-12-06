import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Receipt, Heart, User } from 'lucide-react';
import { useHapticFeedback } from '@/hooks';
import { ROUTES } from '@/constants/routes';

const navItems = [
  { path: ROUTES.HOME, label: 'Меню', Icon: Home },
  { path: ROUTES.ORDERS, label: 'Заказы', Icon: Receipt },
  { path: ROUTES.FAVORITES, label: 'Избранное', Icon: Heart },
  { path: ROUTES.PROFILE, label: 'Профиль', Icon: User },
];

export function BottomNav() {
  const location = useLocation();
  const { selectionChanged } = useHapticFeedback();

  // Hide bottom nav on certain pages
  const hiddenPaths = ['/dish/', '/checkout', '/order-success'];
  const shouldHide = hiddenPaths.some((path) => location.pathname.includes(path));

  if (shouldHide) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border safe-area-pb">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ path, label, Icon }) => {
          const isActive = location.pathname === path;

          return (
            <NavLink
              key={path}
              to={path}
              onClick={() => selectionChanged()}
              className="relative flex flex-col items-center justify-center py-2 px-4 min-w-[64px]"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <Icon
                  className={`w-6 h-6 ${
                    isActive ? 'text-primary' : 'text-text-light'
                  }`}
                />
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.div>
              <span
                className={`text-xs mt-1 ${
                  isActive ? 'text-primary font-medium' : 'text-text-light'
                }`}
              >
                {label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
