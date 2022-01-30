import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup, Button, ProgressBar } from "react-bootstrap";
import PetFoodFeedGroupedList from "../PetFoodFeedGroupedList";

import {
  getUserPetFoodFeedsAsync,
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

  const [userName, setUserName] = useState("");

  const [rateLimitInfo, setRateLimitInfo] = useState({});

  const [petFoodFeedIndex, setPetFoodFeedIndex] = useState(0);

  const [feedNextPet, setFeedNextPet] = useState(true);

  const [isFeeding, setFeeding] = useState(false);

  useEffect(() => {
    if (petFoodFeeds.length === 0) {
      getUserPetFoodFeedsAsync(props.authToken).then((res) => {
        setPetFoodFeeds(res.body.petFoodFeeds);
        setUserName(res.body.userName);
        setRateLimitInfo(res.rateLimitInfo);
        setSummary({
          numberOfPetsToBeFed: getNumberOfPetsToBeFed(res.body.petFoodFeeds),
          numberOfPetsToBeFedFully: getNumberOfPetsToBeFedFully(
            res.body.petFoodFeeds
          ),
          numberOfFoodsToBeFed: getNumberOfFoodsToBeFed(res.body.petFoodFeeds),
        });
      });
    }
  }, [props.authToken, rateLimitInfo, petFoodFeeds.length]);

  useEffect(() => {
    if (isFeeding && feedNextPet) {
      setFeedNextPet(false);
      feedPetFoodAsync(
        props.authToken,
        rateLimitInfo,
        petFoodFeeds[petFoodFeedIndex]
      ).then((res) => {
        setRateLimitInfo(res.rateLimitInfo);

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
    rateLimitInfo,
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
        <Row className="align-items-top">
          <Col>
            <h3>Username</h3>
            <p>{userName}</p>
          </Col>
        </Row>
      )}
      {petFoodFeeds.length > 0 && (
        <>
          <Row className="align-items-top">
            <Col>
              <h3>Pets to be fed</h3>
            </Col>
          </Row>
          <Row>
            <Col>
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
                {isFeeding ? "Stop" : "Start"} Feeding Pets
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
