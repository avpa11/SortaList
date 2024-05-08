import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: "",
  authData: null,
  profile: undefined,
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
  },
});

export const { signUpUser, signOutUser } = userSlice.actions;

export default userSlice;

export const getIsUserAuth = (state) =>
  state.user.authData === null ? false : true;
