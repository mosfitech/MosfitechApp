import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user", // Ganti nama slice menjadi "user"
  initialState: {
    room: null as string | null,
    area: null as string | null,
    coordinate: null as number[] | null,
  },
  reducers: {
    setUserRoom: (state, action) => {
      state.room = action.payload;
    },
    setUserArea: (state, action) => {
      state.area = action.payload;
    },
    setUserCoordinate: (state, action) => {
      state.coordinate = action.payload; // Ganti "state.area" menjadi "state.coordinate"
    },
  },
});

export const { setUserRoom, setUserArea, setUserCoordinate } =
  userSlice.actions;

// Buat selector untuk mengambil data dari state
export const selectUserRoom = (state: any) => state.user.room;
export const selectUserArea = (state: any) => state.user.area;
export const selectUserCoordinate = (state: any) => state.user.coordinate;

export default userSlice.reducer;
