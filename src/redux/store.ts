// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import geolocationReducer from './geolocationSlice';
import userRoomReducer from './userSlice'; // Perbaiki impor
import sosReducer from './sosSlice';
import broadcastReducer from './broadcastSlice'
export const store = configureStore({
  reducer: {
    geolocation: geolocationReducer,
    user: userRoomReducer,
    sos: sosReducer,
    broadcast: broadcastReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
