import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userID: null,
  balance: 0,
  avatar_url: '',
  first_name: '',
  last_name: '',
  all_coin_lose: 0,
  all_coin_win: 0,
  all_games_lose: 0,
  all_games_win: 0
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
    },
    addAllCoinLose: (state, action) => {
      state.all_coin_lose += action.payload
    },
    addAllCoinWin: (state, action) => {
      state.all_coin_win += action.payload
    },
    addAllGamesLose: (state, action) => {
      state.all_games_lose += action.payload
    },
    addAllGamesWin: (state, action) => {
      state.all_games_win += action.payload
    },
    setAllCoinLose: (state, action) => {
      state.all_coin_lose = action.payload
    },
    setAllCoinWin: (state, action) => {
      state.all_coin_win = action.payload
    },
    setAllGamesLose: (state, action) => {
      state.all_games_lose = action.payload
    },
    setAllGamesWin: (state, action) => {
      state.all_games_win = action.payload
    },
  },
});

export const {
  setUserID,
  setBalance,
  changeBalance,
  setAvatar,
  setFirstName,
  setLastName,
  addAllCoinLose,
  addAllCoinWin,
  addAllGamesLose,
  addAllGamesWin,
  setAllCoinLose,
  setAllCoinWin,
  setAllGamesLose,
  setAllGamesWin,
} = userSlice.actions;
export default userSlice.reducer;