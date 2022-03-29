import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import OffCanvasControl from "./OffCanvasControl";
import PetNamesList from "./PetNamesList";
import FeedLog from "../feedLog/FeedLog";

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
            <OffCanvasControl placement="bottom" title="Feed Log">
              <FeedLog includeNotFed={true} includeFed={true} />
            </OffCanvasControl>
          </ListGroup.Item>
          <ListGroup.Item>
            <span>Number of pets to be fed: </span>
            <span>{summary.petsToBeFed.length}</span>
            <OffCanvasControl placement="end" title="Pets">
              <PetNamesList petsToBeFed={summary.petsToBeFed} />
            </OffCanvasControl>
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
