import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup, Button, ProgressBar } from "react-bootstrap";
import PetFoodFeedGroupedList from "../PetFoodFeedGroupedList";

import {
  getNumberOfPetsFed,
  getNumberOfPetsFedFully,
  getNumberOfFoodsFed,
} from "../../../logic/petFoodFeedSummaryFunctions";

import { feedPetFoodAsync } from "../../../client/apiClient";

const PetFoodFeedContainer = (props) => {
  const [summary, setSummary] = useState({});

  const [petFoodFeedsFed, setPetFoodFeedsFed] = useState([]);

  useEffect(() => {
    setSummary({
      numberOfPetsFed: getNumberOfPetsFed(props.petFoodFeeds),
      numberOfPetsFedFully: getNumberOfPetsFedFully(props.petFoodFeeds),
      numberOfFoodsFed: getNumberOfFoodsFed(props.petFoodFeeds),
    });
  }, [props.petFoodFeeds]);

  const handleButtonPressed = (event) => {
    event.preventDefault();

    event.target.disabled = true;

    feedPetsAsync().then(() => {
      event.target.disabled = false;
      console.log("done");
    });
  };

  const feedPetsAsync = async () => {
    for (const petFoodFeed of props.petFoodFeeds) {
      const responseData = await feedPetFoodAsync(
        props.authToken,
        props.rateLimitRemaining,
        petFoodFeed
      );

      //response data is the updated rate limit.
      props.onRateLimitRemainingChanged(responseData.rateLimitRemaining);

      setPetFoodFeedsFed([...petFoodFeedsFed, petFoodFeed]);

      console.log(responseData);
      break;
    }
  };

  return (
    <>
      <Row>
        <Col>
          <>
            <ListGroup variant="flush">
              <ListGroup.Item>
                Number of pets to be fed: {summary.numberOfPetsFed}
              </ListGroup.Item>
              <ListGroup.Item>
                Number of foods to be fed: {summary.numberOfFoodsFed}
              </ListGroup.Item>
              <ListGroup.Item>
                Number of satisfied pets: {summary.numberOfPetsFedFully}
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
            disabled={props.shouldDisableButton}
            onClick={handleButtonPressed}
          >
            Feed Pets
          </Button>
        </Col>
        <Col>
          <Row>
            Pets Fed: {petFoodFeedsFed.length} / {summary.numberOfPetsFed}
          </Row>
          <br />
        </Col>
      </Row>
      <br />
      <Row>
        <ProgressBar
          now={petFoodFeedsFed.length}
          min={0}
          max={summary.numberOfPetsFed}
          label={`${petFoodFeedsFed.length} / ${summary.numberOfPetsFed}`}
        />
      </Row>
      <br />
      <Row>
        <Col>
          <PetFoodFeedGroupedList petFoodFeeds={props.petFoodFeeds} />
        </Col>
      </Row>
    </>
  );
};

export default PetFoodFeedContainer;
