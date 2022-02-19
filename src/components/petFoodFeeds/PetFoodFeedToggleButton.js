import React from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

const PetFoodFeedToggleButton = (props) => {
  const isFeedingPets = useSelector((state) => state.petFoodFeed.isFeedingPets);
  const isFeedingPet = useSelector((state) => state.petFoodFeed.isFeedingPet);
  const petFoodFeedIndex = useSelector((state) => state.petFoodFeed.feedIndex);

  const isPausing = () => !isFeedingPets && isFeedingPet;

  const getVariant = () => (!isFeedingPets ? "primary" : "secondary");

  const PausingText = "Pausing...";
  const PauseText = "Pause";
  const StartText = "Start";
  const ResumeText = "Resume";
  const FeedingSuffixText = " Feeding";

  const getTogglePetFoodFeedingButtonTextResumable = () => {
    if (isPausing()) return PausingText;

    if (!props.isResumable || isFeedingPets) return PauseText;

    return (petFoodFeedIndex > 0 ? ResumeText : StartText) + FeedingSuffixText;
  };

  return (
    <>
      <Button
        variant={getVariant()}
        onClick={props.onButtonClicked}
        disabled={isPausing()}
      >
        {getTogglePetFoodFeedingButtonTextResumable()}
      </Button>
    </>
  );
};

export default PetFoodFeedToggleButton;
