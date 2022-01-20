const getAuthorizationTokenAsync = async (authUser) => {
  var authUrl =
    "https://habitica-pet-feeder-api.azurewebsites.net/api/Auth/token";

  var authRequestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(authUser),
  };

  var authResponse = await fetch(authUrl, authRequestOptions);

  var authToken = await authResponse.text();

  return authToken;
};

const getPetFoodFeedsAsync = async (authToken, rateLimitRemaining) => {
  var fetchUrl =
    "https://habitica-pet-feeder-api.azurewebsites.net/api/PetFoodFeeds/fetch";

  var fetchRequestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": authToken,
      "X-Rate-Remaining": rateLimitRemaining,
    },
  };

  var fetchResponse = await fetch(fetchUrl, fetchRequestOptions);

  var fetchResponseData = await fetchResponse.json();

  return fetchResponseData;
};

module.exports = { getAuthorizationTokenAsync, getPetFoodFeedsAsync };
