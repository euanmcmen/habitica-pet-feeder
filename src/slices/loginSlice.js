import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    authToken: "",
  },
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
  },
});

export const { setAuthToken } = loginSlice.actions;

export default loginSlice.reducer;
