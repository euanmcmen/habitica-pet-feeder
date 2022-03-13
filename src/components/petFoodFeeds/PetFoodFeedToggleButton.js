import React from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

const PetFoodFeedToggleButton = (props) => {
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

  return (
    <>
      <Button
        variant={getVariant()}
        onClick={props.onButtonClicked}
        disabled={isPausing()}
        hidden={shouldHide()}
        size={props.size}
      >
        {getTogglePetFoodFeedingButtonTextResumable()}
      </Button>
    </>
  );
};

export default PetFoodFeedToggleButton;
