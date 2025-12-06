export const ROUTES = {
  HOME: '/',
  DISH: '/dish/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDER_SUCCESS: '/order-success/:id',
  ORDERS: '/orders',
  ORDER_DETAIL: '/orders/:id',
  PROFILE: '/profile',
  ADDRESSES: '/addresses',
  FAVORITES: '/favorites',
} as const;

export const getDishRoute = (id: string): string => `/dish/${id}`;
export const getOrderRoute = (id: string): string => `/orders/${id}`;
export const getOrderSuccessRoute = (id: string): string => `/order-success/${id}`;
