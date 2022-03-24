import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import FeedSummary from "../summary/FeedSummary";
import FeedInfo from "../FeedInfo";
import FeedToggleButton from "../toggleButton/FeedToggleButton";
import FeedingModel from "../model/FeedingModel";

import { feedPetFoodAsync } from "../../../client/apiClient";
import { setRateLimitInfo } from "../../../slices/apiConnectionSlice";

import {
  setPetFedAtIndex,
  setFeedingComplete,
  setFeedingErrored,
  stopFeedingPet,
  startFeedingPet,
} from "../../../slices/petFoodFeedSlice";

const FeedingContainer = () => {
  const dispatch = useDispatch();

  const authToken = useSelector((state) => state.apiConnection.authToken);

  const rateLimitInfo = useSelector(
    (state) => state.apiConnection.rateLimitInfo
  );

  const petFoodFeeds = useSelector((state) => state.petFoodFeed.feeds);
  const petFoodFeedIndex = useSelector((state) => state.petFoodFeed.feedIndex);
  const isFeedingPets = useSelector((state) => state.petFoodFeed.isFeedingPets);
  const isFeedingPet = useSelector((state) => state.petFoodFeed.isFeedingPet);
  const isFeedingComplete = useSelector(
    (state) => state.petFoodFeed.isFeedingComplete
  );
  const isFeedingErrored = useSelector(
    (state) => state.petFoodFeed.isFeedingErrored
  );

  //
  // FEED PETS
  //
  useEffect(() => {
    if (
      !isFeedingErrored &&
      isFeedingPets &&
      !isFeedingPet &&
      petFoodFeedIndex < petFoodFeeds.length
    ) {
      dispatch(startFeedingPet());

      feedPetFoodAsync(authToken, rateLimitInfo, petFoodFeeds[petFoodFeedIndex])
        .then((res) => {
          dispatch(setRateLimitInfo(res.rateLimitInfo));
          dispatch(setPetFedAtIndex(petFoodFeedIndex));
        })
        .catch((err) => {
          console.log(err);
          dispatch(setFeedingErrored(true));
        })
        .finally(() => {
          dispatch(stopFeedingPet());
        });
    }
  }, [
    isFeedingErrored,
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
      dispatch(setFeedingComplete(true));
    }
  }, [petFoodFeedIndex, petFoodFeeds.length, isFeedingComplete, dispatch]);

  return (
    <>
      <FeedInfo />
      <br />
      <Row className="align-items-top">
        <Col>
          <h3>Pet Feeds</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <FeedSummary />
        </Col>
      </Row>
      <br />
      <Row>
        <FeedToggleButton
          isResumable={true}
          size={"lg"}
          hideOnPausing={true}
          hideOnPausable={true}
        />
      </Row>

      <FeedingModel />
    </>
  );
};

export default FeedingContainer;
