import React from "react";
import { useSelector } from "react-redux";
import PetFoodFeedFetchingContainer from "./PetFoodFeedFetchingContainer";
import PetFoodFeedFeedingContainer from "./PetFoodFeedFeedingContainer";
import PetFoodFeedFedContainer from "./PetFoodFeedFedContainer";

const PetFoodFeedContainer = () => {
  const petFoodFeeds = useSelector((state) => state.petFoodFeed.feeds);

  const isFeedingComplete = useSelector(
    (state) => state.petFoodFeed.isFeedingComplete
  );

  return (
    <>
      {petFoodFeeds.length === 0 && <PetFoodFeedFetchingContainer />}
      {petFoodFeeds.length > 0 && (
        <>
          {!isFeedingComplete && <PetFoodFeedFeedingContainer />}
          {isFeedingComplete && <PetFoodFeedFedContainer />}
        </>
      )}
    </>
  );
};

export default PetFoodFeedContainer;
