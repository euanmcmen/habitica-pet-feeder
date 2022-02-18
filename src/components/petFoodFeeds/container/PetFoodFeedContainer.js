import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import PetFoodFeedCarouselList from "../list/PetFoodFeedCarouselList";
import PetFoodFeedSummary from "../summary/PetFoodFeedSummary";
import PetFoodFeedProgressBar from "../progressBar/PetFoodFeedProgressBar";
import PetFoodFeedInfo from "../../info/PetFoodFeedInfo";
import PetFoodFeedFetching from "../PetFoodFeedFetching";
import PetFoodFeedNoUser from "../PetFoodFeedNoUser";
import PetFoodFeedNoFeeds from "../PetFoodFeedNoFeeds";

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
  setFeedingPets,
  setFeedingPet,
} from "../../../slices/petFoodFeedSlice";

const PetFoodFeedContainer = (props) => {
  const dispatch = useDispatch();

  //API
  const authToken = useSelector((state) => state.apiConnection.authToken);

  const rateLimitInfo = useSelector(
    (state) => state.apiConnection.rateLimitInfo
  );

  //Pet Food Feeds
  const petFoodFeeds = useSelector((state) => state.petFoodFeed.feeds);
  const petFoodFeedIndex = useSelector((state) => state.petFoodFeed.feedIndex);
  const isFeedingPets = useSelector((state) => state.petFoodFeed.isFeedingPets);
  const isFeedingPet = useSelector((state) => state.petFoodFeed.isFeedingPet);

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
        });
    }
  }, [authToken, rateLimitInfo, apiFetchState, dispatch]);

  useEffect(() => {
    if (isFeedingPets && !isFeedingPet) {
      dispatch(setFeedingPet(true));

      feedPetFoodAsync(
        authToken,
        rateLimitInfo,
        petFoodFeeds[petFoodFeedIndex]
      ).then((res) => {
        dispatch(setRateLimitInfo(res.rateLimitInfo));

        dispatch(setPetFedAtIndex(petFoodFeedIndex));

        dispatch(setFeedingPet(false));
      });
    }
  }, [
    isFeedingPets,
    isFeedingPet,
    authToken,
    rateLimitInfo,
    petFoodFeeds,
    petFoodFeedIndex,
    dispatch,
  ]);

  const handleModelHide = () => {
    dispatch(setFeedingPets(false));
  };

  const handleTogglePetFoodFeedingClicked = (event) => {
    event.preventDefault();
    dispatch(setFeedingPets(true));
  };

  const getTogglePetFoodFeedingButtonText = () => {
    if (!isFeedingPets && isFeedingPet) return "Waiting...";
    return isFeedingPets ? "Pause Feeding" : "Start Feeding";
  };

  return (
    <>
      {petFoodFeeds.length === 0 && (
        <>
          {apiFetchState === 1 && <PetFoodFeedFetching />}
          {apiFetchState === -1 && <PetFoodFeedNoUser />}
          {apiFetchState === 2 && (
            <>
              <PetFoodFeedNoFeeds />
            </>
          )}
        </>
      )}
      {petFoodFeeds.length > 0 && apiFetchState === 2 && (
        <>
          <PetFoodFeedInfo />
          <br />
          <Row className="align-items-top">
            <Col>
              <h3>Status</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <PetFoodFeedSummary />
            </Col>
          </Row>
          <br />
          <Row>
            <PetFoodFeedProgressBar
              value={petFoodFeedIndex}
              max={petFoodFeeds.length}
            />
          </Row>
          <br />
          <Row>
            <Col>
              <Button
                variant="primary"
                onClick={handleTogglePetFoodFeedingClicked}
                disabled={!isFeedingPets && isFeedingPet}
              >
                {getTogglePetFoodFeedingButtonText()}
              </Button>
            </Col>
          </Row>

          <Modal
            show={isFeedingPets || isFeedingPet}
            onHide={handleModelHide}
            animation={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Pet Food Feeder</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row>
                  <Col>
                    <PetFoodFeedCarouselList
                      petFoodFeedIndex={petFoodFeedIndex}
                      petFoodFeeds={petFoodFeeds}
                    />
                  </Col>
                </Row>
                <br />
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleModelHide}>
                Stop
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export default PetFoodFeedContainer;
