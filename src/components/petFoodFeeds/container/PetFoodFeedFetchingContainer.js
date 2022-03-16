import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PetFoodFeedFetching from "../PetFoodFeedFetching";
import PetFoodFeedNoUser from "../PetFoodFeedNoUser";
import PetFoodFeedNoFeeds from "../PetFoodFeedNoFeeds";

import { getUserPetFoodFeedsAsync } from "../../../client/apiClient";

import { setUserNameAndRateLimitInfo } from "../../../slices/apiConnectionSlice";

import { setPetFoodFeeds } from "../../../slices/petFoodFeedSlice";

const PetFoodFeedFetchingContainer = () => {
  const dispatch = useDispatch();

  //API
  const authToken = useSelector((state) => state.apiConnection.authToken);

  const rateLimitInfo = useSelector(
    (state) => state.apiConnection.rateLimitInfo
  );

  //Api Fetch States
  const [apiFetchState, setApiFetchState] = useState(0);
  const API_FETCH_NOT_STARTED = 0;
  const API_FETCH_STARTED = 1;
  const API_FETCH_COMPLETE = 2;
  const API_FETCH_ERRORED = -1;

  //
  // FETCH PETS
  //
  useEffect(() => {
    if (apiFetchState === API_FETCH_NOT_STARTED) {
      setApiFetchState(API_FETCH_STARTED);
      // getUserPetFoodFeedsAsync(authToken)
      //   .then((res) => {
      //     setApiFetchState(API_FETCH_COMPLETE);

      //     dispatch(setPetFoodFeeds(res.body.petFoodFeeds));

      //     dispatch(
      //       setUserNameAndRateLimitInfo({
      //         userName: res.body.userName,
      //         rateLimitInfo: res.rateLimitInfo,
      //       })
      //     );
      //   })
      //   .catch((res) => {
      //     setApiFetchState(API_FETCH_ERRORED);
      //   });
    }
  }, [
    authToken,
    rateLimitInfo,
    apiFetchState,
    API_FETCH_NOT_STARTED,
    API_FETCH_STARTED,
    API_FETCH_COMPLETE,
    API_FETCH_ERRORED,
    dispatch,
  ]);

  return (
    <>
      {apiFetchState === API_FETCH_STARTED && <PetFoodFeedFetching />}
      {apiFetchState === API_FETCH_ERRORED && <PetFoodFeedNoUser />}
      {apiFetchState === API_FETCH_COMPLETE && <PetFoodFeedNoFeeds />}
    </>
  );
};

export default PetFoodFeedFetchingContainer;
