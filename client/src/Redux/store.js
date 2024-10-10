// store.js
import { configureStore } from '@reduxjs/toolkit';
import authApi from './feature/auth/authApi'; // Adjust the path if necessary
import cartReducer from './feature/cart/cartfile'
import authReducer from './feature/auth/authSlice'
import productApi from './feature/product/productapi';
import reviewApi from './feature/reviews/reviews.api';

const store = configureStore({
  reducer: {
    // Register the authApi reducer here
    cart:cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth:authReducer,
    [productApi.reducerPath]:productApi.reducer,
    [reviewApi.reducerPath]:reviewApi.reducer,
  },
  // Add the authApi middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,productApi.middleware,reviewApi.middleware),


});

export default store;
