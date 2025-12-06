import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { CountBadge } from '@/components/ui/Badge';
import { useCartBadge, useHapticFeedback } from '@/hooks';
import { ROUTES } from '@/constants/routes';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showCart?: boolean;
  transparent?: boolean;
}

export function Header({
  title,
  showBack = false,
  showCart = true,
  transparent = false,
}: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount = useCartBadge();
  const { impact } = useHapticFeedback();

  const handleBack = () => {
    impact('light');
    navigate(-1);
  };

  const handleCartClick = () => {
    impact('light');
    navigate(ROUTES.CART);
  };

  const isCartPage = location.pathname === ROUTES.CART;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`
        sticky top-0 z-40 px-4 py-3
        ${transparent
          ? 'bg-transparent'
          : 'bg-background/95 backdrop-blur-sm border-b border-border/50'
        }
      `}
    >
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-3">
          {showBack ? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleBack}
              className="p-2 -ml-2 rounded-full hover:bg-neutral transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-text" />
            </motion.button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="font-bold text-text text-lg">PhoBo</span>
            </div>
          )}

          {title && showBack && (
            <h1 className="font-semibold text-text">{title}</h1>
          )}
        </div>

        {/* Right side */}
        {showCart && !isCartPage && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleCartClick}
            className="relative p-2 -mr-2 rounded-full hover:bg-neutral transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-text" />
            {cartCount && <CountBadge count={cartCount} />}
          </motion.button>
        )}
      </div>
    </motion.header>
  );
}
