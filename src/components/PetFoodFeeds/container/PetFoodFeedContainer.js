import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup, Button, ProgressBar } from "react-bootstrap";
import PetFoodFeedGroupedList from "../PetFoodFeedGroupedList";

import {
  getPetFoodFeedsAsync,
  feedPetFoodAsync,
} from "../../../client/apiClient";

import {
  getNumberOfPetsToBeFed,
  getNumberOfPetsToBeFedFully,
  getNumberOfFoodsToBeFed,
} from "../../../logic/petFoodFeedSummaryFunctions";

const PetFoodFeedContainer = (props) => {
  const [summary, setSummary] = useState({});

  const [petFoodFeeds, setPetFoodFeeds] = useState([]);

  const [rateLimitRemaining, setRateLimitRemaining] = useState("30");

  const [petFoodFeedIndex, setPetFoodFeedIndex] = useState(0);

  const [feedNextPet, setFeedNextPet] = useState(true);

  const [isFeeding, setFeeding] = useState(false);

  useEffect(() => {
    if (petFoodFeeds.length === 0) {
      getPetFoodFeedsAsync(props.authToken, rateLimitRemaining).then((res) => {
        setPetFoodFeeds(res.response);
        setRateLimitRemaining(res.rateLimitRemaining);
        setSummary({
          numberOfPetsToBeFed: getNumberOfPetsToBeFed(res.response),
          numberOfPetsToBeFedFully: getNumberOfPetsToBeFedFully(res.response),
          numberOfFoodsToBeFed: getNumberOfFoodsToBeFed(res.response),
        });
      });
    }
  }, [props.authToken, rateLimitRemaining, petFoodFeeds.length]);

  useEffect(() => {
    if (isFeeding && feedNextPet && rateLimitRemaining !== 0) {
      setFeedNextPet(false);
      feedPetFoodAsync(
        props.authToken,
        rateLimitRemaining,
        petFoodFeeds[petFoodFeedIndex]
      ).then((responseData) => {
        setRateLimitRemaining(responseData.rateLimitRemaining);

        var petFoodFeedsTemp = [...petFoodFeeds];
        petFoodFeedsTemp[petFoodFeedIndex] = {
          ...petFoodFeedsTemp[petFoodFeedIndex],
          isFed: true,
        };
        setPetFoodFeeds(petFoodFeedsTemp);

        setPetFoodFeedIndex(petFoodFeedIndex + 1);
        setFeedNextPet(true);
      });
    }
  }, [
    props.authToken,
    rateLimitRemaining,
    petFoodFeeds,
    feedNextPet,
    petFoodFeedIndex,
    isFeeding,
  ]);

  const handleTogglePetFoodFeedingClicked = (event) => {
    event.preventDefault();

    setFeeding(!isFeeding);
  };

  return (
    <>
      {petFoodFeeds.length === 0 && (
        <Row>
          <Col>
            <span>Loading...</span>
          </Col>
        </Row>
      )}
      {petFoodFeeds.length > 0 && (
        <>
          <Row>
            <Col>
              <>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <span>Number of pets to be fed: </span>
                    <span>{summary.numberOfPetsToBeFed}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span>Number of foods to be fed: </span>
                    <span>{summary.numberOfFoodsToBeFed}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span>Number of pets to be fully fed: </span>
                    <span>{summary.numberOfPetsToBeFedFully}</span>
                  </ListGroup.Item>
                </ListGroup>
              </>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Button
                variant="secondary"
                // disabled={props.shouldDisableButton}
                onClick={handleTogglePetFoodFeedingClicked}
              >
                {isFeeding ? "Start" : "Stop"} Feeding Pets
              </Button>
            </Col>
          </Row>
          <br />
          <Row>
            <ProgressBar
              now={petFoodFeedIndex}
              min={0}
              max={petFoodFeeds.length}
              label={`${petFoodFeedIndex} / ${petFoodFeeds.length}`}
            />
          </Row>
          <br />
          <Row>
            <Col>
              <PetFoodFeedGroupedList petFoodFeeds={petFoodFeeds} />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default PetFoodFeedContainer;
