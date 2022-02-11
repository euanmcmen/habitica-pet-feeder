import { configureStore } from "@reduxjs/toolkit";
import apiConnectionReducer from "../slices/apiConnectionSlice";
import petFoodFeedReducer from "../slices/petFoodFeedSlice";

export default configureStore({
  reducer: {
    apiConnection: apiConnectionReducer,
    petFoodFeed: petFoodFeedReducer,
  },
});
