import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

import {
  startFeedingPets,
  stopFeedingPets,
} from "../../../slices/petFoodFeedSlice";

const FeedToggleButton = (props) => {
  const dispatch = useDispatch();

  const isFeedingPets = useSelector((state) => state.petFoodFeed.isFeedingPets);
  const isFeedingPet = useSelector((state) => state.petFoodFeed.isFeedingPet);
  const petFoodFeedIndex = useSelector((state) => state.petFoodFeed.feedIndex);

  const isPausing = () => !isFeedingPets && isFeedingPet;

  const isPausable = () => !props.isResumable || isFeedingPets;

  const getVariant = () => (!isFeedingPets ? "primary" : "secondary");

  const shouldHide = () =>
    (props.hideOnPausing && isPausing()) ||
    (props.hideOnPausable && isPausable());

  const PausingText = "Pausing...";
  const PauseText = "Pause";
  const StartText = "Start";
  const ResumeText = "Resume";
  const FeedingSuffixText = " Feeding";

  const getTogglePetFoodFeedingButtonTextResumable = () => {
    if (isPausing()) return PausingText;

    if (isPausable()) return PauseText;

    return (petFoodFeedIndex > 0 ? ResumeText : StartText) + FeedingSuffixText;
  };

  const handleButtonClick = () => {
    if (isFeedingPets) {
      dispatch(stopFeedingPets());
    } else {
      dispatch(startFeedingPets());
    }
  };

  return (
    <>
      <Button
        variant={getVariant()}
        onClick={handleButtonClick}
        disabled={isPausing()}
        hidden={shouldHide()}
        size={props.size}
      >
        {getTogglePetFoodFeedingButtonTextResumable()}
      </Button>
    </>
  );
};

export default FeedToggleButton;
