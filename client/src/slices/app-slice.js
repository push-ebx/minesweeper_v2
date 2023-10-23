import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appearance: "dark",
  isLoaded: false,
  online: 0
};

const appSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {
    setAppearance: (state, action) => {
      state.appearance = action.payload;
    },
    setOnline: (state, action) => {
      state.online = action.payload;
    },
    toggleIsLoaded: (state) => {
      state.isLoaded = !state.isLoaded
    }
  },
});

export const {
  setAppearance,
  setOnline,
  toggleIsLoaded
} = appSlice.actions;
export default appSlice.reducer;