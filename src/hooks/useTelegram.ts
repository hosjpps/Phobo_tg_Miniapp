import { useEffect, useCallback, useState } from 'react';
import {
  isTelegramWebApp,
  getTelegramWebApp,
  initTelegramWebApp,
  hapticFeedback,
  getTelegramUser,
  getColorScheme,
} from '@/utils/telegram';
import { useUserStore } from '@/store/userStore';

export function useTelegram() {
  const [isReady, setIsReady] = useState(false);
  const setTelegramUser = useUserStore((state) => state.setTelegramUser);

  useEffect(() => {
    if (isTelegramWebApp()) {
      initTelegramWebApp();

      const user = getTelegramUser();
      if (user) {
        setTelegramUser({
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          username: user.username,
          languageCode: user.language_code,
          isPremium: user.is_premium,
          photoUrl: user.photo_url,
        });
      }

      setIsReady(true);
    } else {
      // Running outside Telegram - set mock user for development
      setTelegramUser({
        id: 123456789,
        firstName: 'Test',
        lastName: 'User',
        username: 'testuser',
      });
      setIsReady(true);
    }
  }, [setTelegramUser]);

  const webApp = getTelegramWebApp();

  return {
    isReady,
    isTelegram: isTelegramWebApp(),
    webApp,
    colorScheme: getColorScheme(),
    haptic: hapticFeedback,
  };
}

export function useBackButton(onBack: () => void) {
  useEffect(() => {
    const webApp = getTelegramWebApp();
    if (!webApp) return;

    webApp.BackButton.show();
    webApp.BackButton.onClick(onBack);

    return () => {
      webApp.BackButton.offClick(onBack);
      webApp.BackButton.hide();
    };
  }, [onBack]);
}

export function useMainButton(
  text: string,
  onClick: () => void,
  options: {
    isVisible?: boolean;
    isEnabled?: boolean;
    color?: string;
    textColor?: string;
    showProgress?: boolean;
  } = {}
) {
  const {
    isVisible = true,
    isEnabled = true,
    color = '#FF8C42',
    textColor = '#FFFFFF',
    showProgress = false,
  } = options;

  useEffect(() => {
    const webApp = getTelegramWebApp();
    if (!webApp) return;

    const mainButton = webApp.MainButton;

    if (isVisible) {
      mainButton.setParams({
        text,
        color,
        text_color: textColor,
        is_active: isEnabled,
        is_visible: true,
      });
      mainButton.show();

      if (showProgress) {
        mainButton.showProgress();
      } else {
        mainButton.hideProgress();
      }

      mainButton.onClick(onClick);
    } else {
      mainButton.hide();
    }

    return () => {
      mainButton.offClick(onClick);
      mainButton.hide();
    };
  }, [text, onClick, isVisible, isEnabled, color, textColor, showProgress]);
}

export function useHapticFeedback() {
  const impact = useCallback((style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'medium') => {
    hapticFeedback.impact(style);
  }, []);

  const notification = useCallback((type: 'error' | 'success' | 'warning') => {
    hapticFeedback.notification(type);
  }, []);

  const selectionChanged = useCallback(() => {
    hapticFeedback.selectionChanged();
  }, []);

  return {
    impact,
    notification,
    selectionChanged,
  };
}

export function useClosingConfirmation(enabled: boolean) {
  useEffect(() => {
    const webApp = getTelegramWebApp();
    if (!webApp) return;

    if (enabled) {
      webApp.enableClosingConfirmation();
    } else {
      webApp.disableClosingConfirmation();
    }
  }, [enabled]);
}
