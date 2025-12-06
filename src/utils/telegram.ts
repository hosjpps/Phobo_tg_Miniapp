declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

interface TelegramWebApp {
  ready: () => void;
  close: () => void;
  expand: () => void;
  enableClosingConfirmation: () => void;
  disableClosingConfirmation: () => void;
  openTelegramLink: (url: string) => void;
  openLink: (url: string, options?: { try_instant_view?: boolean }) => void;
  showPopup: (params: PopupParams, callback?: (id: string) => void) => void;
  showAlert: (message: string, callback?: () => void) => void;
  showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void;
  HapticFeedback: HapticFeedback;
  MainButton: MainButton;
  BackButton: BackButton;
  themeParams: ThemeParams;
  colorScheme: 'light' | 'dark';
  initData: string;
  initDataUnsafe: InitDataUnsafe;
  platform: string;
  version: string;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
}

interface PopupParams {
  title?: string;
  message: string;
  buttons?: PopupButton[];
}

interface PopupButton {
  id?: string;
  type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
  text?: string;
}

interface HapticFeedback {
  impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
  notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
  selectionChanged: () => void;
}

interface MainButton {
  text: string;
  color: string;
  textColor: string;
  isVisible: boolean;
  isActive: boolean;
  isProgressVisible: boolean;
  setText: (text: string) => void;
  onClick: (callback: () => void) => void;
  offClick: (callback: () => void) => void;
  show: () => void;
  hide: () => void;
  enable: () => void;
  disable: () => void;
  showProgress: (leaveActive?: boolean) => void;
  hideProgress: () => void;
  setParams: (params: MainButtonParams) => void;
}

interface MainButtonParams {
  text?: string;
  color?: string;
  text_color?: string;
  is_active?: boolean;
  is_visible?: boolean;
}

interface BackButton {
  isVisible: boolean;
  onClick: (callback: () => void) => void;
  offClick: (callback: () => void) => void;
  show: () => void;
  hide: () => void;
}

interface ThemeParams {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  link_color?: string;
  button_color?: string;
  button_text_color?: string;
  secondary_bg_color?: string;
}

interface InitDataUnsafe {
  query_id?: string;
  user?: TelegramUser;
  auth_date?: number;
  hash?: string;
}

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
}

export const isTelegramWebApp = (): boolean => {
  return typeof window !== 'undefined' && !!window.Telegram?.WebApp;
};

export const getTelegramWebApp = (): TelegramWebApp | null => {
  if (isTelegramWebApp()) {
    return window.Telegram!.WebApp!;
  }
  return null;
};

export const initTelegramWebApp = (): void => {
  const webApp = getTelegramWebApp();
  if (webApp) {
    webApp.ready();
    webApp.expand();
    webApp.enableClosingConfirmation();
  }
};

export const closeTelegramWebApp = (): void => {
  const webApp = getTelegramWebApp();
  if (webApp) {
    webApp.close();
  }
};

export const openTelegramLink = (url: string): void => {
  const webApp = getTelegramWebApp();
  if (webApp) {
    webApp.openTelegramLink(url);
  } else {
    window.open(url, '_blank');
  }
};

export const openExternalLink = (url: string, tryInstantView = false): void => {
  const webApp = getTelegramWebApp();
  if (webApp) {
    webApp.openLink(url, { try_instant_view: tryInstantView });
  } else {
    window.open(url, '_blank');
  }
};

export const shareUrl = (url: string, text?: string): void => {
  const webApp = getTelegramWebApp();
  const shareText = text ? `&text=${encodeURIComponent(text)}` : '';
  const shareLink = `https://t.me/share/url?url=${encodeURIComponent(url)}${shareText}`;

  if (webApp) {
    webApp.openTelegramLink(shareLink);
  } else {
    window.open(shareLink, '_blank');
  }
};

export const showTelegramAlert = (message: string, callback?: () => void): void => {
  const webApp = getTelegramWebApp();
  if (webApp) {
    webApp.showAlert(message, callback);
  } else {
    alert(message);
    callback?.();
  }
};

export const showTelegramConfirm = (
  message: string,
  callback: (confirmed: boolean) => void
): void => {
  const webApp = getTelegramWebApp();
  if (webApp) {
    webApp.showConfirm(message, callback);
  } else {
    const confirmed = confirm(message);
    callback(confirmed);
  }
};

export const hapticFeedback = {
  impact: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'medium'): void => {
    const webApp = getTelegramWebApp();
    if (webApp) {
      webApp.HapticFeedback.impactOccurred(style);
    }
  },
  notification: (type: 'error' | 'success' | 'warning'): void => {
    const webApp = getTelegramWebApp();
    if (webApp) {
      webApp.HapticFeedback.notificationOccurred(type);
    }
  },
  selectionChanged: (): void => {
    const webApp = getTelegramWebApp();
    if (webApp) {
      webApp.HapticFeedback.selectionChanged();
    }
  },
};

export const getTelegramUser = (): TelegramUser | null => {
  const webApp = getTelegramWebApp();
  return webApp?.initDataUnsafe?.user || null;
};

export const getThemeParams = (): ThemeParams => {
  const webApp = getTelegramWebApp();
  return webApp?.themeParams || {};
};

export const getColorScheme = (): 'light' | 'dark' => {
  const webApp = getTelegramWebApp();
  return webApp?.colorScheme || 'light';
};

export const getPlatform = (): string => {
  const webApp = getTelegramWebApp();
  return webApp?.platform || 'unknown';
};
