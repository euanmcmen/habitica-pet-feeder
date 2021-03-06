import { createSlice } from "@reduxjs/toolkit";

export const petFoodFeedSlice = createSlice({
  name: "petFoodFeed",
  initialState: {
    feeds: [],
    feedIndex: 0,
    isFeedingPets: false,
    isFeedingPet: false,
    isFeedingComplete: false,
  },

  reducers: {
    setPetFoodFeeds: (state, action) => {
      state.feeds = action.payload;
    },

    setPetFeedCompleteAtIndex: (state, action) => {
      state.feeds[action.payload].isFed = true;
      state.feedIndex = action.payload + 1;
    },

    setPetFeedErrorAtIndex: (state, action) => {
      state.feeds[action.payload].hasError = true;
      state.feeds[action.payload].isFed = true;
      state.feedIndex = action.payload + 1;
    },

    startFeedingPets: (state) => {
      state.isFeedingPets = true;
    },

    startFeedingPet: (state) => {
      state.isFeedingPet = true;
    },

    stopFeedingPet: (state) => {
      state.isFeedingPet = false;
    },

    stopFeedingPets: (state) => {
      state.isFeedingPets = false;
    },

    setFeedingComplete: (state) => {
      state.isFeedingComplete = true;
    },

    clearPetFoodFeeds: (state) => {
      state.feeds = [];
      state.feedIndex = 0;
      state.isFeedingPets = false;
      state.isFeedingPet = false;
      state.isFeedingComplete = false;
    },
  },
});

export const {
  setPetFoodFeeds,
  setPetFeedCompleteAtIndex,
  setPetFeedErrorAtIndex,
  startFeedingPets,
  startFeedingPet,
  stopFeedingPets,
  stopFeedingPet,
  setFeedingComplete,
  clearPetFoodFeeds,
} = petFoodFeedSlice.actions;

export default petFoodFeedSlice.reducer;
