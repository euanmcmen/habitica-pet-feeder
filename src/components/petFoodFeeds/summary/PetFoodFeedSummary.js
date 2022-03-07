import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, ListGroup, OverlayTrigger } from "react-bootstrap";
import PetFoodFeedSummaryPopover from "./PetFoodFeedSummaryPopover";

import {
  getNumberOfPetsToBeFedFully,
  getNumberOfFoodsToBeFed,
  getUniquePetsToBeFed,
} from "../../../logic/petFoodFeedSummaryFunctions";

const PetFoodFeedSummary = () => {
  const [summary, setSummary] = useState(null);

  const petFoodFeeds = useSelector((state) => state.petFoodFeed.feeds);

  useEffect(() => {
    setSummary({
      numberOfFeeds: petFoodFeeds.length,
      petsToBeFed: getUniquePetsToBeFed(petFoodFeeds),
      numberOfPetsToBeFedFully: getNumberOfPetsToBeFedFully(petFoodFeeds),
      numberOfFoodsToBeFed: getNumberOfFoodsToBeFed(petFoodFeeds),
    });
  }, [petFoodFeeds]);

  return (
    <>
      {summary && (
        <ListGroup variant="flush">
          <ListGroup.Item>
            <span>Number of feeds: </span>
            <span>{summary.numberOfFeeds}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span>Number of pets to be fed: </span>
            <span>{summary.petsToBeFed.length}</span>
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={<PetFoodFeedSummaryPopover summary={summary} />}
            >
              <Button variant="info" size="sm" className="float-end">
                Expand
              </Button>
            </OverlayTrigger>
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
      )}
    </>
  );
};

export default PetFoodFeedSummary;
