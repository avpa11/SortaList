import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: "",
  authData: null,
  profile: undefined,
  sessionId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUpUser(state, action) {
      state.authData = action.payload;
    },
    signOutUser(state) {
      state.authData = null;
      state.profile = undefined;
    },
    joinSession(state, action) {
      state.sessionId = action.payload;
    },
  },
});

export const { signUpUser, signOutUser, joinSession } = userSlice.actions;

export default userSlice;

export const getIsUserAuth = (state) =>
  state.user.authData === null ? false : true;

export const getUserID = (state) => state.user.authData.uid;

export const getIsUserAnonymous = (state) =>
  state.user.authData && state.user.authData.isAnonymous
    ? state.user.authData.isAnonymous
    : false;

export const getUserAuthData = (state) => state.user.authData;

export const getUserGameSession = (state) => state.user.sessionId;
