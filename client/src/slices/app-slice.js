import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appearance: "dark",
  userID: null,
  balance: 0,
  isLoaded: false
};

const appSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {
    setAppearance: (state, action) => {
      state.appearance = action.payload;
    },
    setUserID: (state, action) => {
      state.userID = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload
    },
    toggleIsLoaded: (state) => {
      state.isLoaded = !state.isLoaded
    }
  },
});

export const {
  setAppearance,
  setUserID,
  setBalance,
  toggleIsLoaded
} = appSlice.actions;
export default appSlice.reducer;