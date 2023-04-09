import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    changeInfoAction: (state, action) => {},
  },
});

export const {} = profileSlice.actions;

export default profileSlice.reducer;
