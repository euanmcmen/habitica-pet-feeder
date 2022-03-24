import React from "react";
import { ProgressBar } from "react-bootstrap";

const PetFoodFeedProgressBar = (props) => {
  return (
    <ProgressBar
      now={props.value}
      min={0}
      max={props.max}
      label={`${props.value} / ${props.max}`}
    />
  );
};

export default PetFoodFeedProgressBar;
