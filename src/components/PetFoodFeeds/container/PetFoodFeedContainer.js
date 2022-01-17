import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup, Button } from "react-bootstrap";
import PetFoodFeedGroupedList from "../PetFoodFeedGroupedList";

import {
  getNumberOfPetsFed,
  getNumberOfPetsFedFully,
  getNumberOfFoodsFed,
} from "../../../logic/petFoodFeedSummaryFunctions";

const PetFoodFeedContainer = (props) => {
  const [summary, setSummary] = useState({});

  const [petFeedProgress, setPetFeedProgress] = useState(0);

  useEffect(() => {
    setSummary({
      numberOfPetsFed: getNumberOfPetsFed(props.petFoodFeeds),
      numberOfPetsFedFully: getNumberOfPetsFedFully(props.petFoodFeeds),
      numberOfFoodsFed: getNumberOfFoodsFed(props.petFoodFeeds),
    });
  }, [props.petFoodFeeds]);

  useEffect(() => {
    setTimeout(() => setPetFeedProgress(petFeedProgress + 1), 1000);
  });

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
          <div>
            <Button variant="secondary" disabled={props.shouldDisableButton}>
              Feed Pets
            </Button>
            <span>
              Pets Fed: {petFeedProgress} / {summary.numberOfPetsFed}
            </span>
          </div>
        </Col>
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
