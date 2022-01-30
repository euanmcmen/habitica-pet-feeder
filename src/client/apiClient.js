export const getAuthorizationTokenAsync = async (authUser) => {
  var url = "https://habitica-pet-feeder-api.azurewebsites.net/api/Auth/token";

  var requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(authUser),
  };

  var response = await fetch(url, requestOptions);

  var responseTest = await response.text();

  return responseTest;
};

export const getUserPetFoodFeedsAsync = async (authToken) => {
  var url =
    "https://habitica-pet-feeder-api.azurewebsites.net/api/PetFoodFeeds/fetch";

  var requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": authToken,
    },
  };

  var response = await fetch(url, requestOptions);

  var responseData = await response.json();

  return responseData;
};

export const feedPetFoodAsync = async (
  authToken,
  rateLimitInfo,
  petFoodFeed
) => {
  var url =
    "https://habitica-pet-feeder-api.azurewebsites.net/api/PetFoodFeeds/feed";

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

  var responseData = await response.json();

  return responseData;
};
