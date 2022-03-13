/*should render:

if pet food feeds collection is empty, return fetching container.

if pet food feed collection is not empty and feeding complete is false, return feeding container.

if pet food feed collection is not empty and feeding complete is true, return fed container

*/

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
