import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginContainer from "../../login/container/LoginContainer";
import PetFoodFeedContainer from "../../petFoodFeeds/container/PetFoodFeedContainer";

import {
  getAuthorizationTokenAsync,
  getUserPetFoodFeedsAsync,
} from "../../../client/apiClient";

import {
  setUserNameAndRateLimitInfo,
  setAuthToken,
} from "../../../slices/apiConnectionSlice";

import { setPetFoodFeeds } from "../../../slices/petFoodFeedSlice";
import FetchError from "../FetchError";

const FetchUserPetsContainer = () => {
  const dispatch = useDispatch();

  const authToken = useSelector((state) => state.apiConnection.authToken);

  const [isWaiting, setIsWaiting] = useState(false);
  const [fetchErrored, setFetchErrored] = useState(false);

  const handleLoginSubmitSuccessAsync = async (authUser) => {
    setIsWaiting(true);
    setFetchErrored(false);

    try {
      var token = await getAuthorizationTokenAsync(authUser);

      var userPetFoodFeedsResponse = await getUserPetFoodFeedsAsync(token);

      handleDispatches(token, userPetFoodFeedsResponse);
    } catch {
      console.log("caught");
      setFetchErrored(true);
    } finally {
      setIsWaiting(false);
    }
  };

  const handleDispatches = (token, userPetFoodFeedsResponse) => {
    dispatch(setAuthToken(token));

    dispatch(setPetFoodFeeds(userPetFoodFeedsResponse.body.petFoodFeeds));

    dispatch(
      setUserNameAndRateLimitInfo({
        userName: userPetFoodFeedsResponse.body.userName,
        rateLimitInfo: userPetFoodFeedsResponse.rateLimitInfo,
      })
    );
  };

  return (
    <>
      {authToken === "" ? (
        <LoginContainer
          onLoginSubmitSuccess={handleLoginSubmitSuccessAsync}
          shouldDisableForm={isWaiting}
        />
      ) : (
        <PetFoodFeedContainer />
      )}
      <br />
      {fetchErrored && (
        <>
          <FetchError />
        </>
      )}
    </>
  );
};

export default FetchUserPetsContainer;
