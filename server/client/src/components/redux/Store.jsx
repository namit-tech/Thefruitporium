import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/reducer/cartReducer';
import cartSyncMiddleware from '../redux/middleware/cartSyncMiddleware';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cartSyncMiddleware),
});

export default store;
