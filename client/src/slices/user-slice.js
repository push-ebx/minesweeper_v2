import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userID: null,
  balance: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setUserID: (state, action) => {
      state.userID = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = Math.floor(action.payload)
    },
    changeBalance: (state, action) => {
      state.balance += Math.floor(action.payload)
    }
  },
});

export const {
  setUserID,
  setBalance,
  changeBalance,
} = userSlice.actions;
export default userSlice.reducer;