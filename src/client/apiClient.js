const getAuthorizationTokenAsync = async (authUser) => {
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

const getPetFoodFeedsAsync = async (authToken, rateLimitRemaining) => {
  var url =
    "https://habitica-pet-feeder-api.azurewebsites.net/api/PetFoodFeeds/fetch";

  var requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": authToken,
      "X-Rate-Remaining": rateLimitRemaining,
    },
  };

  var response = await fetch(url, requestOptions);

  var responseData = await response.json();

  return responseData;
};

const feedPetFoodAsync = async (authToken, rateLimitRemaining, petFoodFeed) => {
  var url =
    "https://habitica-pet-feeder-api.azurewebsites.net/api/PetFoodFeeds/feed";

  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": authToken,
      "X-Rate-Remaining": rateLimitRemaining,
    },
    body: JSON.stringify(petFoodFeed),
  };

  var response = await fetch(url, requestOptions);

  var responseData = await response.json();

  return responseData;
};

module.exports = {
  getAuthorizationTokenAsync,
  getPetFoodFeedsAsync,
  feedPetFoodAsync,
};
