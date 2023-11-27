import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = Cookies.get("userInfo")
  ? JSON.parse(Cookies.get("userInfo"))
  : {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      const { user, access_token: token } = action.payload;

      state.token = token;
      state.user = user;
      Cookies.set("userInfo", JSON.stringify({ token, user }));
    },

    userLogout: (state, action) => {
      state = {};
      Cookies.remove("userInfo");
    },
  },
});

export const { userLogin, userLogout } = authSlice.actions;

export default authSlice.reducer;