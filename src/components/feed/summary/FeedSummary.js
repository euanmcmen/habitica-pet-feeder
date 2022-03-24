import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import SummaryPetsControl from "./petsPopover/SummaryPetsControl";
import FeedLogOffCanvasControl from "./logPopup/SummaryFeedLogControl";

import {
  getNumberOfPetsToBeFedFully,
  getNumberOfFoodsToBeFed,
  getUniquePetsToBeFed,
} from "../../../logic/petFoodFeedSummaryFunctions";

const FeedSummary = () => {
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
            <FeedLogOffCanvasControl />
          </ListGroup.Item>
          <ListGroup.Item>
            <span>Number of pets to be fed: </span>
            <span>{summary.petsToBeFed.length}</span>
            <SummaryPetsControl petsToBeFed={summary.petsToBeFed} />
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

export default FeedSummary;
