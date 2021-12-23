import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PetFoodFeedList from "./components/PetFoodFeeds/PetFoodFeedList/PetFoodFeedList";
import PetFoodFeedSummary from "./components/PetFoodFeeds/PetFoodFeedSummary";
import LoginForm from "./components/Login/LoginForm";

function App() {
  const [petFoodFeeds, setPetFoodFeeds] = useState([]);
  const [hasPetFoodFeedsFetchError, setPetFoodFeedsFetchError] =
    useState(false);

  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const [isAuthenticating, setAuthenticating] = useState(false);

  const handleLoginSubmit = (userId, apiKey) => {
    setAuthenticating(true);

    const authUser = {
      apiUserId: userId,
      apiUserKey: apiKey,
    };

    getPetFoodFeedsAsync(authUser)
      .then((data) => {
        console.log(data);
        setPetFoodFeeds(data);
        setAuthenticatedUser(authUser);
      })
      .catch((error) => {
        console.log("whoopsie: ", error);
        setPetFoodFeedsFetchError(true);
      })
      .finally((response) => {
        setAuthenticating(false);
      });
  };

  const getPetFoodFeedsAsync = async (authUser) => {
    var requestUrl =
      "https://habitica-pet-feeder-api.azurewebsites.net/api/PetFoodFeeds";

    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authUser),
    };

    var response = await fetch(requestUrl, requestOptions);

    var data = await response.json();

    return data;
  };

  const showPetFoodFeeds = () => {
    if (authenticatedUser === null) return <p>...</p>;

    //Show a loading page if the API is still working away.
    if (isAuthenticating)
      return <p>Calculating Pet Food Feeds for your pets...</p>;

    //When the API finishes, it will either return:

    //...An error
    if (hasPetFoodFeedsFetchError) return <p>An error occurred.</p>;

    //...Or pet feeds including an empty set.
    return <PetFoodFeedList petFoodFeeds={petFoodFeeds} />;
  };

  const showPetFoodFeedSummary = () => {
    if (authenticatedUser === null) return <p>...</p>;

    //Show a loading page if the API is still working away.
    if (isAuthenticating) return <p>Calculating Pet Food Feed summary...</p>;

    //When the API finishes, it will either return:

    //...An error
    if (hasPetFoodFeedsFetchError) return <p>An error occurred</p>;

    //...Or pet feed summary.
    return <PetFoodFeedSummary petFoodFeeds={petFoodFeeds} />;
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Habitica Pet Feeder</h1>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <LoginForm onLoginSubmit={handleLoginSubmit} />
        </Col>
      </Row>
      <Row>
        <Col>{showPetFoodFeedSummary()}</Col>
      </Row>
      <br />
      <Row className="text-center">
        <Col>{showPetFoodFeeds()}</Col>
      </Row>
    </Container>
  );
}

export default App;
