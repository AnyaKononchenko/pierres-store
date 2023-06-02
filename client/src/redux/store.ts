import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import authReducer from 'features/authSlice';
import userReducer from 'features/userSlice';
import categoriesReducer from 'features/categoriesSlice';
import productsReducer from 'features/productsSlice';
import cartReducer from 'features/cartSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
