import React, { useState } from "react";
import { useDispatch } from "react-redux";
import LoginContainer from "../../login/container/LoginContainer";
import FetchError from "../FetchError";

import {
  getAuthorizationTokenAsync,
  getUserPetFoodFeedsAsync,
} from "../../../client/apiClient";

import {
  setUserNameAndRateLimitInfo,
  setAuthToken,
  setHasFatalApiError,
} from "../../../slices/apiConnectionSlice";

import { setPetFoodFeeds } from "../../../slices/petFoodFeedSlice";

const FetchUserPetsContainer = () => {
  const dispatch = useDispatch();

  const [isWaiting, setIsWaiting] = useState(false);
  const [isAuthErrored, setIsAuthErrored] = useState(false);

  const handleLoginSubmitSuccessAsync = async (authUser) => {
    setIsWaiting(true);
    setIsAuthErrored(false);

    try {
      var token = await getAuthorizationTokenAsync(authUser);

      var userPetFoodFeedsResponse = await getUserPetFoodFeedsAsync(token);

      dispatchEvents(token, userPetFoodFeedsResponse);
    } catch (exception) {
      if (exception.message === "401") {
        setIsAuthErrored(true);
        setIsWaiting(false);
      } else {
        dispatch(setHasFatalApiError(true));
      }
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
      <LoginContainer
        onLoginSubmitSuccess={handleLoginSubmitSuccessAsync}
        shouldDisableForm={isWaiting}
      />
      <br />
      {isAuthErrored && (
        <>
          <FetchError />
        </>
      )}
    </>
  );
};

export default FetchUserPetsContainer;
