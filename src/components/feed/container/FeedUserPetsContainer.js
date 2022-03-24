import React from "react";
import { useSelector } from "react-redux";
import FeedingContainer from "./FeedingContainer";
import FeedingComplete from "../FeedingComplete";
import NoFeeds from "../FeedNoFeeds";

const FeedUserPetsContainer = () => {
  const petFoodFeeds = useSelector((state) => state.petFoodFeed.feeds);

  const isFeedingComplete = useSelector(
    (state) => state.petFoodFeed.isFeedingComplete
  );

  return (
    <>
      {petFoodFeeds.length === 0 && <NoFeeds />}
      {petFoodFeeds.length > 0 && (
        <>
          {!isFeedingComplete && <FeedingContainer />}
          {isFeedingComplete && <FeedingComplete />}
        </>
      )}
    </>
  );
};

export default FeedUserPetsContainer;
