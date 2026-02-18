import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./Store";

const initialState = {
  userId: -1,
  roles: [
    {
      roleId: -1,
      title: "",
    },
  ],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userId = action.payload.userId;
      state.roles = action.payload.roles;
      //console.log(action.payload);
    },
    logout: (state, action) => {
      state.userId = -1;
      state.roles = [];
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
