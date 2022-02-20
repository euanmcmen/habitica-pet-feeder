import { createSlice } from "@reduxjs/toolkit";

export const petFoodFeedSlice = createSlice({
  name: "petFoodFeed",
  initialState: {
    feeds: [],
    feedSummary: {},
    feedIndex: 0,
    isFeedingPets: false,
    isFeedingPet: false,
    isFeedingComplete: false,
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

    setFeedingPets: (state, action) => {
      state.isFeedingPets = action.payload;
    },

    setFeedingPet: (state, action) => {
      state.isFeedingPet = action.payload;
    },

    setFeedingComplete: (state) => {
      state.isFeedingComplete = true;
    },

    clearPetFoodFeeds: (state) => {
      state.feeds = [];
      state.feedSummary = {};
      state.feedIndex = 0;
      state.isFeeding = false;
      state.isFeedingPet = false;
      state.isFeedingComplete = false;
    },
  },
});

export const {
  setPetFoodFeeds,
  setPetFedAtIndex,
  setSummary,
  setFeedingPets,
  setFeedingPet,
  setFeedingComplete,
  clearPetFoodFeeds,
} = petFoodFeedSlice.actions;

export default petFoodFeedSlice.reducer;
