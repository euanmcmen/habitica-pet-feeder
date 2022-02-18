import React from "react";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";

const PetFoodFeedSummary = () => {
  const summary = useSelector((state) => state.petFoodFeed.feedSummary);

  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <span>Number of pets to be fed: </span>
          <span>{summary.numberOfPetsToBeFed}</span>
        </ListGroup.Item>
        <ListGroup.Item>
          <span>Number of pets to be fully fed: </span>
          <span>{summary.numberOfPetsToBeFedFully}</span>
        </ListGroup.Item>
        <ListGroup.Item>
          <span>Number of foods to be fed: </span>
          <span>{summary.numberOfFoodsToBeFed}</span>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default PetFoodFeedSummary;
