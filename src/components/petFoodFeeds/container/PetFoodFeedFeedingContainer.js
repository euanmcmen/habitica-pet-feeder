import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import PetFoodFeedSummary from "../summary/PetFoodFeedSummary";
import PetFoodFeedInfo from "../../info/PetFoodFeedInfo";
import PetFoodFeedToggleButton from "../PetFoodFeedToggleButton";
import PetFoodFeedFeedingModel from "../model/PetFoodFeedFeedingModel";

//TODO - Move all of the "valid" display logic for pet food feeds here.
//The other container -- perhaps rename to *FetchContainer -- should handle the initial API fetch, and display appropriate errors.
//If the app fetches successfully, display this container.  This should assume a populated collection of pet food feeds.
//Wire up dispatches and selectors etc...

//TODO - I also want to add a "complete" component.

import { feedPetFoodAsync } from "../../../client/apiClient";

import { setRateLimitInfo } from "../../../slices/apiConnectionSlice";

import {
  setPetFedAtIndex,
  setFeedingPets,
  setFeedingPet,
  setFeedingComplete,
} from "../../../slices/petFoodFeedSlice";

const PetFoodFeedFeedingContainer = () => {
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

  //Feeding complete.
  const isFeedingComplete = useSelector(
    (state) => state.petFoodFeed.isFeedingComplete
  );

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
      dispatch(setFeedingComplete());
    }
  }, [petFoodFeeds, petFoodFeedIndex, isFeedingComplete, dispatch]);

  const startFeedingPets = () => {
    dispatch(setFeedingPets(true));
  };

  return (
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
          size={"lg"}
          onButtonClicked={startFeedingPets}
          hideOnPausing={true}
          hideOnPausable={true}
        />
      </Row>

      <PetFoodFeedFeedingModel />
    </>
  );
};

export default PetFoodFeedFeedingContainer;
