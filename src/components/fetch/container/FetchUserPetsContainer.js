import React, { useState } from "react";
import { useDispatch } from "react-redux";
import LoginContainer from "../../login/container/LoginContainer";
import FetchError from "../FetchError";

import {
  getAuthorizationTokenAsync,
  getUserPetFoodFeedsAsync,
} from "../../../client/apiClient";

import {
  setUserName,
  setRateLimitInfo,
  setAuthToken,
  setHasFatalApiError,
} from "../../../slices/apiConnectionSlice";

import { setPetFoodFeeds } from "../../../slices/petFoodFeedSlice";
import apiHttpResponseCodes from "../../../client/apiHttpResponseCodes";

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

      switch (userPetFoodFeedsResponse.httpStatus) {
        case apiHttpResponseCodes.Ok:
          dispatch(setAuthToken(token));
          dispatch(setPetFoodFeeds(userPetFoodFeedsResponse.body.petFoodFeeds));
          dispatch(setRateLimitInfo(userPetFoodFeedsResponse.rateLimitInfo));
          dispatch(setUserName(userPetFoodFeedsResponse.body.userName));
          break;
        case apiHttpResponseCodes.NotAuthorized:
          setIsAuthErrored(true);
          setIsWaiting(false);
          break;
        default:
          dispatch(setHasFatalApiError());
          break;
      }
    } catch (exception) {
      dispatch(setHasFatalApiError());
    }
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
