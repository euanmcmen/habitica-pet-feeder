const throwUnsuccessfulResponseCode = (response) => {
  if (response.status !== 200) {
    throw new Error(response.status);
  }
};

const getBaseUrl = () => "https://habitica-pet-feeder-api.azurewebsites.net";

//const getBaseUrl = () => "https://localhost:44354";

export const getAuthorizationTokenAsync = async (authUser) => {
  var url = `${getBaseUrl()}/api/Auth/token`;

  var requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(authUser),
  };

  var response = await fetch(url, requestOptions);

  throwUnsuccessfulResponseCode(response);

  var responseTest = await response.text();

  return responseTest;
};

export const getUserPetFoodFeedsAsync = async (authToken) => {
  var url = `${getBaseUrl()}/api/PetFoodFeeds/fetch`;

  var requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": authToken,
    },
  };

  var response = await fetch(url, requestOptions);

  throwUnsuccessfulResponseCode(response);

  var responseData = await response.json();

  return responseData;
};

export const feedPetFoodAsync = async (
  authToken,
  rateLimitInfo,
  petFoodFeed
) => {
  var url = `${getBaseUrl()}/api/PetFoodFeeds/feed`;

  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": authToken,
      "X-Rate-Remaining": rateLimitInfo.rateLimitRemaining,
      "X-Rate-Reset": rateLimitInfo.rateLimitReset,
    },
    body: JSON.stringify(petFoodFeed),
  };

  var response = await fetch(url, requestOptions);

  throwUnsuccessfulResponseCode(response);

  var responseData = await response.json();

  return responseData;
};
