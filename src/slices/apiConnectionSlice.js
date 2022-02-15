import { createSlice } from "@reduxjs/toolkit";

export const apiConnectionSlice = createSlice({
  name: "apiConnection",
  initialState: {
    authToken: "",
    userName: "",
    rateLimitInfo: {},
  },
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },

    setUserNameAndRateLimitInfo: (state, action) => {
      state.userName = action.payload.userName;
      state.rateLimitInfo = action.payload.rateLimitInfo;
    },

    setRateLimitInfo: (state, action) => {
      state.rateLimitInfo = action.payload;
    },

    clearApiConnection: (state) => {
      state.authToken = "";
      state.userName = "";
      state.rateLimitInfo = {};
    },
  },
});

export const {
  setAuthToken,
  setUserNameAndRateLimitInfo,
  setRateLimitInfo,
  clearApiConnection,
} = apiConnectionSlice.actions;

export default apiConnectionSlice.reducer;
