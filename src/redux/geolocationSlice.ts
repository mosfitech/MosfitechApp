// src/redux/geolocationSlice.ts
import { createSlice } from '@reduxjs/toolkit';

export const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState: {
    active: false,
  },
  reducers: {
    setGeolocationActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setGeolocationActive } = geolocationSlice.actions;

export const selectGeolocationActive = (state:any) => state.geolocation.active;

export default geolocationSlice.reducer;
