
import { createSlice } from '@reduxjs/toolkit';

export const sosSlice = createSlice({
  name: 'sos',
  initialState: {
    active: false,
  },
  reducers: {
    sosActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { sosActive } = sosSlice.actions;

export const selectSOSActive = (state:any) => state.sos.active;

export default sosSlice.reducer;
