import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginContainer from "../../login/container/LoginContainer";
import FeedUserPetsContainer from "../../feed/container/FeedUserPetsContainer";
import FetchError from "../FetchError";

import {
  getAuthorizationTokenAsync,
  getUserPetFoodFeedsAsync,
} from "../../../client/apiClient";

import {
  setUserNameAndRateLimitInfo,
  setAuthToken,
} from "../../../slices/apiConnectionSlice";

import { setPetFoodFeeds } from "../../../slices/petFoodFeedSlice";

const FetchUserPetsContainer = () => {
  const dispatch = useDispatch();

  const authToken = useSelector((state) => state.apiConnection.authToken);

  const [isWaiting, setIsWaiting] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  const handleLoginSubmitSuccessAsync = async (authUser) => {
    setIsWaiting(true);
    setIsErrored(false);

    try {
      var token = await getAuthorizationTokenAsync(authUser);

      var userPetFoodFeedsResponse = await getUserPetFoodFeedsAsync(token);

      dispatchEvents(token, userPetFoodFeedsResponse);
    } catch {
      setIsErrored(true);
    } finally {
      setIsWaiting(false);
    }
  };

  const dispatchEvents = (token, userPetFoodFeedsResponse) => {
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
        <FeedUserPetsContainer />
      )}
      <br />
      {isErrored && (
        <>
          <FetchError />
        </>
      )}
    </>
  );
};

export default FetchUserPetsContainer;
