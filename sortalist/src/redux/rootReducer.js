import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/user";

export const combineReducer = combineReducers({
  user: userSlice.reducer,
});

export const rootReducer = (state, action) => {
  if (action.type === "RESET") {
    state = undefined;
  }
  return combineReducer(state, action);
};
