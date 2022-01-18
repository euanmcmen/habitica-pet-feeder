import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup, Button, ProgressBar } from "react-bootstrap";
import PetFoodFeedGroupedList from "../PetFoodFeedGroupedList";

import {
  getNumberOfPetsFed,
  getNumberOfPetsFedFully,
  getNumberOfFoodsFed,
} from "../../../logic/petFoodFeedSummaryFunctions";

const PetFoodFeedContainer = (props) => {
  const [summary, setSummary] = useState({});

  const [petFoodFeedsFed, setPetFoodFeedsFed] = useState([]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setSummary({
      numberOfPetsFed: getNumberOfPetsFed(props.petFoodFeeds),
      numberOfPetsFedFully: getNumberOfPetsFedFully(props.petFoodFeeds),
      numberOfFoodsFed: getNumberOfFoodsFed(props.petFoodFeeds),
    });
  }, [props.petFoodFeeds]);

  const handleButtonPressed = (event) => {
    event.preventDefault();

    setPetFoodFeedsFed([...petFoodFeedsFed, props.petFoodFeeds[index]]);
    setIndex(index + 1);
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
