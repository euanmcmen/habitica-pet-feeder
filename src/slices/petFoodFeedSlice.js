import { createSlice } from "@reduxjs/toolkit";

export const petFoodFeedSlice = createSlice({
  name: "petFoodFeed",
  initialState: {
    feeds: [],
    feedSummary: {},
    feedIndex: 0,
  },

  reducers: {
    setPetFoodFeeds: (state, action) => {
      state.feeds = action.payload;
    },

    setSummary: (state, action) => {
      state.feedSummary = action.payload;
    },

    setPetFedAtIndex: (state, action) => {
      state.feeds[action.payload].isFed = true;
      state.feedIndex = action.payload + 1;
    },
  },
});

export const { setPetFoodFeeds, setPetFedAtIndex, setSummary } =
  petFoodFeedSlice.actions;

export default petFoodFeedSlice.reducer;
