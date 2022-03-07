import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import PetFoodFeedSummary from "../summary/PetFoodFeedSummary";
import PetFoodFeedInfo from "../../info/PetFoodFeedInfo";
import PetFoodFeedFetching from "../PetFoodFeedFetching";
import PetFoodFeedNoUser from "../PetFoodFeedNoUser";
import PetFoodFeedNoFeeds from "../PetFoodFeedNoFeeds";
import PetFoodFeedToggleButton from "../PetFoodFeedToggleButton";
import PetFoodFeedFeedingModel from "../model/PetFoodFeedFeedingModel";

import {
  getUserPetFoodFeedsAsync,
  feedPetFoodAsync,
} from "../../../client/apiClient";

import {
  setUserNameAndRateLimitInfo,
  setRateLimitInfo,
} from "../../../slices/apiConnectionSlice";

import {
  setPetFoodFeeds,
  setPetFedAtIndex,
  setFeedingPets,
  setFeedingPet,
  setFeedingComplete,
} from "../../../slices/petFoodFeedSlice";

const PetFoodFeedContainer = () => {
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
            <PetFoodFeedToggleButton
              isResumable={true}
              onButtonClicked={startFeedingPets}
            />
          </Row>

          <PetFoodFeedFeedingModel />
        </>
      )}
    </>
  );
};

export default PetFoodFeedContainer;
