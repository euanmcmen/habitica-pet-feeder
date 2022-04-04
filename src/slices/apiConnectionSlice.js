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

    setUserNameAndRateLimitInfo: (state, action) => {
      state.userName = action.payload.userName;
      state.rateLimitInfo = action.payload.rateLimitInfo;
    },

    setRateLimitInfo: (state, action) => {
      state.rateLimitInfo = action.payload;
    },

    setHasFatalApiError: (state, action) => {
      state.hasFatalApiError = action.payload;
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
  setUserNameAndRateLimitInfo,
  setRateLimitInfo,
  setHasFatalApiError,
  clearApiConnection,
} = apiConnectionSlice.actions;

export default apiConnectionSlice.reducer;
