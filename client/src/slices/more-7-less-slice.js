import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bet: 0,
  bets: [],
  dices: [],
  lost_time: 0,
  isStopGame: false,
  isGame: false,
  typeBet: '',
};

const More7LessSlice = createSlice({
  name: 'more7less',
  initialState,

  reducers: {
    setBet: (state, action) => {
      state.bet = action.payload;
    },
    setBets: (state, action) => {
      state.bets = action.payload
    },
    setDices: (state, action) => {
      state.dices = action.payload
    },
    setLostTime: (state, action) => {
      state.lost_time = action.payload
    },
    setIsStopGame: (state, action) => {
      state.isStopGame = action.payload
    },
    setIsGame: (state, action) => {
      state.isGame = action.payload
    },
    setTypeBet: (state, action) => {
      state.typeBet = action.payload
    }
  },
});

export const {
  setBet,
  setBets,
  setDices,
  setLostTime,
  setIsStopGame,
  setIsGame,
  setTypeBet,
} = More7LessSlice.actions;
export default More7LessSlice.reducer;