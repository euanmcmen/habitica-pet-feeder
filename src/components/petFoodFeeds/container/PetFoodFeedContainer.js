import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import PetFoodFeedCarouselList from "../PetFoodFeedCarouselList";
import PetFoodFeedSummary from "../parts/summary/PetFoodFeedSummary";
import { PetFoodFeedProgressBar } from "../parts/progressBar/PetFoodFeedProgressBar";
import { PetFoodFeedInfo } from "../../info/PetFoodFeedInfo";
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
import LogoutControl from "../../login/LogoutControl";

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
          console.log(res);
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
              <LogoutControl />
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
          <LogoutControl />
          <br />
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

          <br />

          <Modal
            show={isFeedingPets || isFeedingPet}
            onHide={handleModelHide}
            dialogClassName="modal-90w-80w"
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
