import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, ListGroup, Button, ProgressBar } from "react-bootstrap";
import PetFoodFeedCarouselList from "../PetFoodFeedCarouselList";

import {
  getUserPetFoodFeedsAsync,
  feedPetFoodAsync,
} from "../../../client/apiClient";

import {
  getNumberOfPetsToBeFed,
  getNumberOfPetsToBeFedFully,
  getNumberOfFoodsToBeFed,
} from "../../../logic/petFoodFeedSummaryFunctions";

import {
  setUserNameAndRateLimitInfo,
  setRateLimitInfo,
} from "../../../slices/apiConnectionSlice";

import {
  setPetFoodFeeds,
  setSummary,
  setPetFedAtIndex,
} from "../../../slices/petFoodFeedSlice";

const PetFoodFeedContainer = (props) => {
  const dispatch = useDispatch();

  //API
  const authToken = useSelector((state) => state.apiConnection.authToken);

  const userName = useSelector((state) => state.apiConnection.userName);

  const rateLimitInfo = useSelector(
    (state) => state.apiConnection.rateLimitInfo
  );

  //Pet Food Feeds
  const petFoodFeeds = useSelector((state) => state.petFoodFeed.feeds);
  const summary = useSelector((state) => state.petFoodFeed.feedSummary);
  const petFoodFeedIndex = useSelector((state) => state.petFoodFeed.feedIndex);

  const [feedNextPet, setFeedNextPet] = useState(true);
  const [isFeeding, setFeeding] = useState(false);

  //App States
  const [apiFetchState, setApiFetchState] = useState(0);
  //-1 -Error
  //0 - Fetch not started - Initial state
  //1 - Fetch Initiated
  //2 - Fetch completed.

  useEffect(() => {
    if (apiFetchState === 0) {
      setApiFetchState(1);
      getUserPetFoodFeedsAsync(authToken)
        .then((res) => {
          setApiFetchState(2);

          dispatch(setPetFoodFeeds(res.body.petFoodFeeds));

          dispatch(
            setUserNameAndRateLimitInfo({
              userName: res.body.userName,
              rateLimitInfo: res.rateLimitInfo,
            })
          );

          dispatch(
            setSummary({
              numberOfPetsToBeFed: getNumberOfPetsToBeFed(
                res.body.petFoodFeeds
              ),
              numberOfPetsToBeFedFully: getNumberOfPetsToBeFedFully(
                res.body.petFoodFeeds
              ),
              numberOfFoodsToBeFed: getNumberOfFoodsToBeFed(
                res.body.petFoodFeeds
              ),
            })
          );
        })
        .catch((res) => {
          setApiFetchState(-1);
          console.log(res);
        });
    }
  }, [authToken, rateLimitInfo, apiFetchState, dispatch]);

  useEffect(() => {
    if (isFeeding && feedNextPet) {
      setFeedNextPet(false);

      feedPetFoodAsync(
        authToken,
        rateLimitInfo,
        petFoodFeeds[petFoodFeedIndex]
      ).then((res) => {
        dispatch(setRateLimitInfo(res.rateLimitInfo));

        dispatch(setPetFedAtIndex(petFoodFeedIndex));

        setFeedNextPet(true);
      });
    }
  }, [
    isFeeding,
    feedNextPet,
    authToken,
    rateLimitInfo,
    petFoodFeeds,
    petFoodFeedIndex,
    dispatch,
  ]);

  const handleTogglePetFoodFeedingClicked = (event) => {
    event.preventDefault();
    setFeeding(!isFeeding);
  };

  const getTogglePetFoodFeedingButtonText = () => {
    if (!isFeeding && !feedNextPet) return "Waiting...";
    return isFeeding ? "Pause Feeding" : "Start Feeding";
  };

  return (
    <>
      {petFoodFeeds.length === 0 && (
        <>
          {apiFetchState === 1 && (
            <Row>
              <Col>
                <span>Fetching your pets and foods...</span>
              </Col>
            </Row>
          )}
          {apiFetchState === -1 && (
            <Row>
              <Col>
                <p>
                  No user information was found for your credentials. Click
                  below to log in again.
                </p>
                <p>
                  Note: Your user id and API key are different from your
                  username and password. Make sure you enter your user id and
                  API key.
                </p>
              </Col>
            </Row>
          )}
          {apiFetchState === 2 && (
            <>
              <Row className="align-items-top">
                <Col>
                  <h3>Username</h3>
                  <p>{userName}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>
                    Your API details were correct, but we couldn't figure out
                    your pet feeds.
                  </p>
                  <p>You may have no food or pets which can be fed.</p>
                  <p>
                    Note: Pets which have already grown into mounts and pets
                    which have not been hatched cannot be fed.
                  </p>
                </Col>
              </Row>
            </>
          )}
        </>
      )}
      {petFoodFeeds.length > 0 && apiFetchState === 2 && (
        <>
          <Row className="align-items-top">
            <Col>
              <h3>Username</h3>
              <p>{userName}</p>
            </Col>
          </Row>
          <Row className="align-items-top">
            <Col>
              <h3>Summary</h3>
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
                  <span>Number of pets to be fully fed: </span>
                  <span>{summary.numberOfPetsToBeFedFully}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span>Number of foods to be fed: </span>
                  <span>{summary.numberOfFoodsToBeFed}</span>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Button
                variant="secondary"
                onClick={handleTogglePetFoodFeedingClicked}
                disabled={!isFeeding && !feedNextPet}
              >
                {getTogglePetFoodFeedingButtonText()}
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
              <PetFoodFeedCarouselList
                petFoodFeedIndex={petFoodFeedIndex}
                petFoodFeeds={petFoodFeeds}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default PetFoodFeedContainer;
