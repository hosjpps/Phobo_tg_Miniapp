import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2 } from 'lucide-react';
import { DishImage, DishInfo, SpiceLevelSelector, AddonsSelector, QuantitySelector } from '@/components/dish';
import { getDishById } from '@/data/menu';
import { useCart, useBackButton, useAddToCartButton, useHapticFeedback } from '@/hooks';
import { useUserStore } from '@/store';
import { formatPriceShort } from '@/utils/format';
import { shareUrl } from '@/utils/telegram';
import type { Addon, CartItemCustomizations } from '@/types';
import { ROUTES } from '@/constants/routes';

export default function DishDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { impact } = useHapticFeedback();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useUserStore();

  const dish = id ? getDishById(id) : undefined;

  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);

  const isLiked = dish ? isFavorite(dish.id) : false;

  // Calculate total price
  const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
  const totalPrice = dish ? (dish.price + addonsTotal) * quantity : 0;

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useBackButton(handleBack);

  const handleAddToCart = useCallback(() => {
    if (!dish) return;

    const customizations: CartItemCustomizations = {
      spiceLevel: dish.customizations.spiceLevel ? spiceLevel : undefined,
      addons: selectedAddons.length > 0 ? selectedAddons : undefined,
    };

    addToCart(dish, quantity, customizations);
    navigate(ROUTES.CART);
  }, [dish, quantity, spiceLevel, selectedAddons, addToCart, navigate]);

  useAddToCartButton(handleAddToCart, dish?.price || 0, quantity);

  const handleFavoriteClick = () => {
    if (dish) {
      toggleFavorite(dish.id);
      impact('light');
    }
  };

  const handleShare = () => {
    if (dish) {
      shareUrl(
        window.location.href,
        `${dish.name} - ${formatPriceShort(dish.price)} в PhoBo`
      );
    }
  };

  if (!dish) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-text-light">Блюдо не найдено</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Image */}
      <div className="relative">
        <DishImage
          src={dish.imageUrl}
          alt={dish.name}
          className="w-full h-72"
        />

        {/* Back button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleBack}
          className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 text-text" />
        </motion.button>

        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleFavoriteClick}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
          >
            <Heart
              className={`w-5 h-5 ${
                isLiked ? 'text-primary fill-primary' : 'text-text-light'
              }`}
            />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
          >
            <Share2 className="w-5 h-5 text-text-light" />
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        <DishInfo dish={dish} />

        {/* Customizations */}
        {dish.customizations.spiceLevel && (
          <SpiceLevelSelector value={spiceLevel} onChange={setSpiceLevel} />
        )}

        {dish.customizations.addons.length > 0 && (
          <AddonsSelector
            addons={dish.customizations.addons}
            selected={selectedAddons}
            onChange={setSelectedAddons}
          />
        )}

        {/* Quantity and Add to Cart */}
        <div className="bg-white rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-light mb-1">Количество</p>
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                min={1}
                size="md"
              />
            </div>
            <div className="text-right">
              <p className="text-sm text-text-light mb-1">Итого</p>
              <p className="text-2xl font-bold text-primary">
                {formatPriceShort(totalPrice)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
