import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userID: null,
  balance: 0,
  avatar_url: '',
  first_name: '',
  last_name: ''
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
    setAvatar: (state, action) => {
      state.avatar_url = action.payload
    },
    setFirstName: (state, action) => {
      state.first_name = action.payload
    },
    setLastName: (state, action) => {
      state.last_name = action.payload
    },
    changeBalance: (state, action) => {
      state.balance = +state.balance + Math.floor(action.payload)
    }
  },
});

export const {
  setUserID,
  setBalance,
  changeBalance,
  setAvatar,
  setFirstName,
  setLastName,
} = userSlice.actions;
export default userSlice.reducer;