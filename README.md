# PhoBo Delivery - Telegram Mini App

Telegram Mini App для доставки вьетнамской кухни. Полнофункциональное приложение с каталогом блюд, корзиной, оформлением заказов и профилем пользователя.

## Технологии

- **React 18.2** + **TypeScript 5.0** (strict mode)
- **Vite 5** — сборка и dev-сервер
- **Tailwind CSS 3.4** — стилизация
- **Zustand** — управление состоянием с персистентностью
- **React Router v6** — маршрутизация
- **@telegram-apps/sdk-react** — интеграция с Telegram
- **Framer Motion** — анимации
- **react-hook-form + zod** — формы и валидация
- **Lucide React** — иконки
- **date-fns** — работа с датами

## Структура проекта

```
src/
├── api/                 # API клиент и методы
│   ├── client.ts        # Axios instance
│   ├── dishes.ts        # API блюд
│   ├── orders.ts        # API заказов
│   └── user.ts          # API пользователя
├── components/
│   ├── cart/            # Компоненты корзины
│   ├── dish/            # Компоненты блюда
│   ├── layout/          # Header, BottomNav, Layout
│   ├── menu/            # Каталог, фильтры, поиск
│   ├── order/           # Карточки заказов, статусы
│   └── ui/              # UI-kit (Button, Input, Card, Modal...)
├── constants/           # Конфигурация и роуты
├── data/                # Статические данные
│   ├── menu.ts          # 26 блюд с полным описанием
│   ├── categories.ts    # 8 категорий
│   └── promoCodes.ts    # Промокоды
├── hooks/               # React хуки
│   ├── useCart.ts       # Работа с корзиной
│   ├── useMainButton.ts # Telegram MainButton
│   ├── useOrders.ts     # Работа с заказами
│   └── useTelegram.ts   # Telegram SDK хуки
├── pages/               # Страницы приложения
│   ├── Home.tsx         # Главная с каталогом
│   ├── DishDetail.tsx   # Детальная страница блюда
│   ├── Cart.tsx         # Корзина
│   ├── Checkout.tsx     # Оформление заказа
│   ├── OrderSuccess.tsx # Успешный заказ
│   ├── Orders.tsx       # История заказов
│   ├── OrderDetail.tsx  # Детали заказа
│   ├── Profile.tsx      # Профиль
│   ├── Addresses.tsx    # Управление адресами
│   └── Favorites.tsx    # Избранное
├── store/               # Zustand stores
│   ├── cartStore.ts     # Состояние корзины
│   ├── userStore.ts     # Профиль, адреса, избранное
│   ├── orderStore.ts    # Заказы
│   └── appStore.ts      # Глобальное состояние
├── styles/
│   └── index.css        # Tailwind + кастомные стили
├── types/               # TypeScript типы
│   ├── dish.ts          # Типы блюд
│   ├── cart.ts          # Типы корзины
│   ├── order.ts         # Типы заказов
│   └── user.ts          # Типы пользователя
├── utils/               # Утилиты
│   ├── format.ts        # Форматирование цен, дат
│   ├── telegram.ts      # Telegram helpers
│   ├── validation.ts    # Zod схемы
│   └── storage.ts       # LocalStorage обёртка
├── App.tsx              # Корневой компонент с роутингом
└── main.tsx             # Entry point
```

## Установка и запуск

### Требования

- Node.js 18+
- npm 9+

### Установка зависимостей

```bash
npm install
```

### Режим разработки

```bash
npm run dev
```

Приложение будет доступно на `http://localhost:5173`

### Production сборка

```bash
npm run build
```

Собранные файлы будут в папке `dist/`

### Предпросмотр production сборки

```bash
npm run preview
```

### Линтинг

```bash
npm run lint
```

## Конфигурация

### Переменные окружения

Создайте файл `.env` на основе `.env.example`:

```env
VITE_API_URL=https://api.phobo.delivery
VITE_TELEGRAM_BOT_USERNAME=phobo_bot
```

### Tailwind тема

Кастомные цвета бренда настроены в `tailwind.config.js`:

- **Primary** (`#C41E3A`) — основной красный
- **Secondary** (`#FF8C42`) — оранжевый
- **Accent** (`#D4AF37`) — золотой
- **Success** (`#4CAF50`) — зелёный
- **Warning** (`#FF9800`) — жёлтый
- **Error** (`#F44336`) — красный

## Функциональность

### Каталог блюд
- 26 блюд вьетнамской кухни
- 8 категорий (Супы Фо, Закуски, Лапша, Рис, Салаты, Напитки, Десерты)
- Поиск по названию
- Фильтрация по категориям
- Бейджи: бестселлер, новинка, острое, вегетарианское

### Детальная страница блюда
- Полное описание и состав
- Пищевая ценность (КБЖУ)
- Выбор уровня остроты
- Дополнительные опции (добавки)
- Добавление в корзину

### Корзина
- Изменение количества
- Удаление позиций
- Применение промокодов
- Расчёт итоговой суммы с доставкой

### Промокоды
- `FIRST20` — 20% на первый заказ
- `PHOBO15` — 15% при заказе от 1000₽
- `FREE500` — бесплатная доставка
- `NEWYEAR25` — 25% при заказе от 1500₽

### Оформление заказа
- Выбор адреса доставки
- Выбор времени доставки
- Способ оплаты
- Комментарий к заказу

### История заказов
- Список всех заказов
- Статусы: новый, подтверждён, готовится, в пути, доставлен
- Детали каждого заказа
- Timeline статусов

### Профиль
- Имя и телефон
- Управление адресами
- Избранные блюда

## Интеграция с Telegram

Приложение использует [@telegram-apps/sdk-react](https://docs.telegram-mini-apps.com/) для:

- **MainButton** — основная кнопка действия
- **BackButton** — кнопка назад
- **HapticFeedback** — тактильная отдача
- **initData** — данные пользователя Telegram
- **themeParams** — цветовая тема Telegram

### Тестирование без Telegram

Приложение корректно работает в браузере без Telegram. SDK методы имеют fallback для dev-режима.

## Деплой

### Telegram BotFather

1. Создайте бота через [@BotFather](https://t.me/BotFather)
2. Включите Menu Button → Configure Menu Button
3. Укажите URL вашего приложения

### Хостинг

Приложение можно разместить на:

- **Vercel** — `vercel deploy`
- **Netlify** — drag & drop папки `dist/`
- **GitHub Pages** — через GitHub Actions
- **Cloudflare Pages** — подключение репозитория

### Требования к хостингу

- HTTPS обязателен для Telegram Mini Apps
- SPA режим (все запросы → index.html)

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск dev-сервера |
| `npm run build` | Production сборка |
| `npm run preview` | Предпросмотр сборки |
| `npm run lint` | Проверка ESLint |

## Лицензия

MIT
