import { createSlice } from "@reduxjs/toolkit";

const init = {
  isLoggedIn: false,
  user: null,
  token: null,
  mode: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: init,
  reducers: {
    userLogin: (state, { payload }) => {
      state.isLoggedIn = true;
      state.token = payload.token;
      state.user = payload.user;
    },
    modifyUser: (state, { payload }) => {
      state.user = payload.data;
    },

    userLogout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      localStorage.clear();
    },

    setMode: (state) => {
      state.mode = !state.mode;
    },
  },
});

export const { userLogin, userLogout, setMode, activeBranchSetup, modifyUser } =
  authSlice.actions;
export default authSlice.reducer;
