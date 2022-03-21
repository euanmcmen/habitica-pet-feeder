import { createSlice } from "@reduxjs/toolkit";

export const petFoodFeedSlice = createSlice({
  name: "petFoodFeed",
  initialState: {
    feeds: [],
    feedIndex: 0,
    isFeedingPets: false,
    isFeedingPet: false,
    isFeedingComplete: false,
    isFeedingErrored: false,
  },

  reducers: {
    setPetFoodFeeds: (state, action) => {
      state.feeds = action.payload;
    },

    setPetFedAtIndex: (state, action) => {
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
      state.isFeedingErrored = false;
    },

    setFeedingComplete: (state, action) => {
      state.isFeedingComplete = action.payload;
    },

    setFeedingErrored: (state, action) => {
      state.isFeedingErrored = action.payload;
    },

    clearPetFoodFeeds: (state) => {
      state.feeds = [];
      state.feedIndex = 0;
      state.isFeedingPets = false;
      state.isFeedingPet = false;
      state.isFeedingErrored = false;
      state.isFeedingComplete = false;
    },
  },
});

export const {
  setPetFoodFeeds,
  setPetFedAtIndex,
  startFeedingPets,
  startFeedingPet,
  stopFeedingPets,
  stopFeedingPet,
  setFeedingComplete,
  setFeedingErrored,
  clearPetFoodFeeds,
} = petFoodFeedSlice.actions;

export default petFoodFeedSlice.reducer;
