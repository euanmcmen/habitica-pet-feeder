import React from "react";
import { useSelector } from "react-redux";
import FeedingContainer from "./FeedingContainer";
import FeedingComplete from "../FeedingComplete";
import NoFeedsWarning from "../../NoFeedsWarning";

const FeedUserPetsContainer = () => {
  const petFoodFeeds = useSelector((state) => state.petFoodFeed.feeds);

  const isFeedingComplete = useSelector(
    (state) => state.petFoodFeed.isFeedingComplete
  );

  return (
    <>
      {petFoodFeeds.length === 0 && <NoFeedsWarning />}
      {petFoodFeeds.length > 0 && (
        <>{isFeedingComplete ? <FeedingComplete /> : <FeedingContainer />}</>
      )}
    </>
  );
};

export default FeedUserPetsContainer;
