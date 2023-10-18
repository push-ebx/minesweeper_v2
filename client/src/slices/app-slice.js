import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appearance: "dark",
  isLoaded: false
};

const appSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {
    setAppearance: (state, action) => {
      state.appearance = action.payload;
    },
    toggleIsLoaded: (state) => {
      state.isLoaded = !state.isLoaded
    }
  },
});

export const {
  setAppearance,
  toggleIsLoaded
} = appSlice.actions;
export default appSlice.reducer;