import { lazy } from 'react';

// Lazy load all pages for better performance
export const Home = lazy(() => import('./Home'));
export const DishDetail = lazy(() => import('./DishDetail'));
export const Cart = lazy(() => import('./Cart'));
export const Checkout = lazy(() => import('./Checkout'));
export const OrderSuccess = lazy(() => import('./OrderSuccess'));
export const Orders = lazy(() => import('./Orders'));
export const OrderDetail = lazy(() => import('./OrderDetail'));
export const Profile = lazy(() => import('./Profile'));
export const Addresses = lazy(() => import('./Addresses'));
export const Favorites = lazy(() => import('./Favorites'));
