import { createSlice } from "@reduxjs/toolkit";

export const apiConnectionSlice = createSlice({
  name: "apiConnection",
  initialState: {
    authToken: "",
    userName: "",
    rateLimitInfo: {},
    hasFatalApiError: false,
  },
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },

    setUserName: (state, action) => {
      state.userName = action.payload;
    },

    setRateLimitInfo: (state, action) => {
      state.rateLimitInfo = action.payload;
    },

    setHasFatalApiError: (state) => {
      state.hasFatalApiError = true;
    },

    clearApiConnection: (state) => {
      state.authToken = "";
      state.userName = "";
      state.rateLimitInfo = {};
      state.hasFatalApiError = false;
    },
  },
});

export const {
  setAuthToken,
  setRateLimitInfo,
  setUserName,
  setHasFatalApiError,
  clearApiConnection,
} = apiConnectionSlice.actions;

export default apiConnectionSlice.reducer;
