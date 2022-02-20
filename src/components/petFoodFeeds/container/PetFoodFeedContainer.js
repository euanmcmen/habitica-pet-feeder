import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import PetFoodFeedSummary from "../summary/PetFoodFeedSummary";
import PetFoodFeedInfo from "../../info/PetFoodFeedInfo";
import PetFoodFeedFetching from "../PetFoodFeedFetching";
import PetFoodFeedNoUser from "../PetFoodFeedNoUser";
import PetFoodFeedNoFeeds from "../PetFoodFeedNoFeeds";
import PetFoodFeedToggleButton from "../PetFoodFeedToggleButton";
import PetFoodFeedFeedingModel from "../PetFoodFeedFeedingModel";

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
  setFeedingComplete,
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

  const isFeedingComplete = useSelector(
    (state) => state.petFoodFeed.isFeedingComplete
  );

  //App States
  const [apiFetchState, setApiFetchState] = useState(0);
  //-1 -Error
  //0 - Fetch not started - Initial state
  //1 - Fetch Initiated
  //2 - Fetch completed.

  //
  // FETCH PETS
  //
  useEffect(() => {
    console.log("Hello 1");
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
              numberOfFeeds: res.body.petFoodFeeds.length,
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

  //
  // FEED PETS
  //
  useEffect(() => {
    console.log("Hello 2");
    if (
      isFeedingPets &&
      !isFeedingPet &&
      petFoodFeedIndex < petFoodFeeds.length
    ) {
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

  //
  // SET FEEDS COMPLETE
  //
  useEffect(() => {
    console.log("Hello 3");
    if (petFoodFeedIndex === petFoodFeeds.length && !isFeedingComplete) {
      dispatch(setFeedingComplete);
    }
  }, [petFoodFeeds, petFoodFeedIndex, isFeedingComplete, dispatch]);

  const startFeedingPets = () => {
    dispatch(setFeedingPets(true));
  };

  return (
    <>
      {petFoodFeeds.length === 0 && (
        <>
          {apiFetchState === 1 && <PetFoodFeedFetching />}
          {apiFetchState === -1 && <PetFoodFeedNoUser />}
          {apiFetchState === 2 && <PetFoodFeedNoFeeds />}
        </>
      )}
      {petFoodFeeds.length > 0 && apiFetchState === 2 && (
        <>
          <PetFoodFeedInfo />
          <br />
          <Row className="align-items-top">
            <Col>
              <h3>Pet Feeds</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <PetFoodFeedSummary />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <PetFoodFeedToggleButton
                isResumable={true}
                onButtonClicked={startFeedingPets}
              />
            </Col>
          </Row>

          <PetFoodFeedFeedingModel />
        </>
      )}
    </>
  );
};

export default PetFoodFeedContainer;
