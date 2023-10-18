import { configureStore } from '@reduxjs/toolkit';
import appReducer from './app-slice';
import userReducer from './user-slice';
import more7lessReducer from './more-7-less-slice'

export default configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    more7less: more7lessReducer
  },
});