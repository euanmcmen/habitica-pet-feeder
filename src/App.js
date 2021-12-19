import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PetFeedList from "./components/PetFeeds/PetFeedList/PetFeedList";
import PetFeedSummary from "./components/PetFeeds/PetFeedSummary";
import LoginForm from "./components/Login/LoginForm";

function App() {
  const [petFeeds, setPetFeeds] = useState([]);
  const [hasPetFeedsFetchError, setpetFeedsFetchError] = useState(false);

  const [summary, setSummary] = useState(null);

  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const [isAuthenticating, setAuthenticating] = useState(false);

  const handleLoginSubmit = (userId, apiKey) => {
    setAuthenticating(true);

    const authUser = {
      apiUserId: userId,
      apiUserKey: apiKey,
    };

    getPetFeedsAsync(authUser)
      .then((data) => {
        console.log(data);
        setPetFeeds(data.petFoodFeeds);
        setSummary(data.petFoodFeedSummary);
        setAuthenticatedUser(authUser);
      })
      .catch((error) => {
        console.log("whoopsie: ", error);
        setpetFeedsFetchError(true);
      })
      .finally((response) => {
        setAuthenticating(false);
      });
  };

  const getPetFeedsAsync = async (authUser) => {
    var requestUrl = "https://localhost:44354/api/PetFeeds";

    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authUser),
    };

    var response = await fetch(requestUrl, requestOptions);

    var data = await response.json();

    return data;
  };

  const showPetFeeds = () => {
    if (authenticatedUser === null) return <p>...</p>;

    //Show a loading page if the API is still working away.
    if (isAuthenticating) return <p>Loading Pet Feeds...</p>;

    //When the API finishes, it will either return:

    //...An error
    if (hasPetFeedsFetchError) return <p>Unable to fetch Pet Feeds</p>;

    //...Or pet feeds including an empty set.
    return <PetFeedList petFeeds={petFeeds} />;
  };

  const showPetFeedSummary = () => {
    if (authenticatedUser === null) return <p>...</p>;

    //Show a loading page if the API is still working away.
    if (isAuthenticating) return <p>Loading Pet Feed Summary...</p>;

    //When the API finishes, it will either return:

    //...An error
    if (hasPetFeedsFetchError) return <p>Unable to fetch Pet Feed Summary</p>;

    //...Or pet feed summary.
    return <PetFeedSummary summary={summary} />;
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
        <Col>{showPetFeedSummary()}</Col>
      </Row>
      <br />
      <Row className="text-center">
        <Col>{showPetFeeds()}</Col>
      </Row>
    </Container>
  );
}

export default App;
