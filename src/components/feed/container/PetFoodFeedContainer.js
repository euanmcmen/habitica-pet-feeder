import React from "react";
import { useSelector } from "react-redux";
import PetFoodFeedFeedingContainer from "./PetFoodFeedFeedingContainer";
import PetFoodFeedComplete from "../PetFoodFeedComplete";
import PetFoodFeedNoFeeds from "../PetFoodFeedNoFeeds";

const PetFoodFeedContainer = () => {
  const petFoodFeeds = useSelector((state) => state.petFoodFeed.feeds);

  const isFeedingComplete = useSelector(
    (state) => state.petFoodFeed.isFeedingComplete
  );

  return (
    <>
      {petFoodFeeds.length === 0 && <PetFoodFeedNoFeeds />}
      {petFoodFeeds.length > 0 && (
        <>
          {!isFeedingComplete && <PetFoodFeedFeedingContainer />}
          {isFeedingComplete && <PetFoodFeedComplete />}
        </>
      )}
    </>
  );
};

export default PetFoodFeedContainer;
