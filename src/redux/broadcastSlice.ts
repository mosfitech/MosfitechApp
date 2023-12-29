import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BroadcastState {
  message: any | null;
}

export const broadcastSlice = createSlice({
  name: 'broadcast',
  initialState: {
    message: null,
  } as BroadcastState,
  reducers: {
    setBroadcastMessage: (state, action: PayloadAction<any>) => {
      state.message = action.payload;
    },
  },
});

export const { setBroadcastMessage } = broadcastSlice.actions;

export const selectBroadcastMessage = (state: any) => state.broadcast.message;

export default broadcastSlice.reducer;
