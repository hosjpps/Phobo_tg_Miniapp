import { useEffect, useCallback, useRef } from 'react';
import { getTelegramWebApp } from '@/utils/telegram';
import { COLORS } from '@/constants/config';

interface MainButtonOptions {
  text: string;
  onClick: () => void;
  isVisible?: boolean;
  isEnabled?: boolean;
  color?: string;
  textColor?: string;
  showProgress?: boolean;
}

export function useMainButtonSetup(options: MainButtonOptions) {
  const {
    text,
    onClick,
    isVisible = true,
    isEnabled = true,
    color = COLORS.secondary,
    textColor = '#FFFFFF',
    showProgress = false,
  } = options;

  const callbackRef = useRef(onClick);

  // Update callback ref when onClick changes
  useEffect(() => {
    callbackRef.current = onClick;
  }, [onClick]);

  const handleClick = useCallback(() => {
    callbackRef.current();
  }, []);

  useEffect(() => {
    const webApp = getTelegramWebApp();
    if (!webApp) return;

    const mainButton = webApp.MainButton;

    if (!isVisible) {
      mainButton.hide();
      return;
    }

    // Configure button
    mainButton.setParams({
      text,
      color,
      text_color: textColor,
      is_active: isEnabled && !showProgress,
      is_visible: true,
    });

    // Show/hide progress
    if (showProgress) {
      mainButton.showProgress(true);
    } else {
      mainButton.hideProgress();
    }

    // Enable/disable
    if (isEnabled && !showProgress) {
      mainButton.enable();
    } else {
      mainButton.disable();
    }

    // Show button
    mainButton.show();

    // Add click handler
    mainButton.onClick(handleClick);

    // Cleanup
    return () => {
      mainButton.offClick(handleClick);
    };
  }, [text, isVisible, isEnabled, color, textColor, showProgress, handleClick]);

  // Hide on unmount
  useEffect(() => {
    return () => {
      const webApp = getTelegramWebApp();
      if (webApp) {
        webApp.MainButton.hide();
      }
    };
  }, []);
}

// Hook for cart button
export function useCartMainButton(onCheckout: () => void, totalPrice: number, itemsCount: number) {
  useMainButtonSetup({
    text: `Оформить заказ - ${totalPrice}₽`,
    onClick: onCheckout,
    isVisible: itemsCount > 0,
    isEnabled: itemsCount > 0,
    color: COLORS.secondary,
  });
}

// Hook for checkout button
export function useCheckoutMainButton(
  onSubmit: () => void,
  isValid: boolean,
  isLoading: boolean,
  totalPrice: number
) {
  useMainButtonSetup({
    text: isLoading ? 'Оформление...' : `Оплатить ${totalPrice}₽`,
    onClick: onSubmit,
    isVisible: true,
    isEnabled: isValid && !isLoading,
    showProgress: isLoading,
    color: COLORS.primary,
  });
}

// Hook for add to cart button
export function useAddToCartButton(onAdd: () => void, price: number, quantity: number) {
  const totalPrice = price * quantity;

  useMainButtonSetup({
    text: `Добавить в корзину - ${totalPrice}₽`,
    onClick: onAdd,
    isVisible: true,
    isEnabled: quantity > 0,
    color: COLORS.secondary,
  });
}
