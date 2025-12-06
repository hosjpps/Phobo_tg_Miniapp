/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_TELEGRAM_BOT_TOKEN: string;
  readonly VITE_PAYMENT_PROVIDER_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
