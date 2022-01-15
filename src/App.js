import React, { useState } from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import PetFoodFeedGroupedList from "./components/PetFoodFeeds/PetFoodFeedGroupedList";
import PetFoodFeedSummary from "./components/PetFoodFeeds/PetFoodFeedSummary";

import LoginForm from "./components/Login/LoginForm";

function App() {
  const [petFoodFeeds, setPetFoodFeeds] = useState([]);

  const [fetchState, setFetchState] = useState(0);

  // -1 - Error
  // 0 - Fetch not started
  // 1 - Fetch started
  // 2 - Fetch complete

  const handleLoginSubmit = (userId, apiKey) => {
    setFetchState(1);

    const authUser = {
      apiUserId: userId,
      apiUserKey: apiKey,
    };

    getAuthorizationTokenAsync(authUser).then((token) => {
      getPetFoodFeedsAsync(token)
        .then((data) => {
          setPetFoodFeeds(data);
          setFetchState(2);
        })
        .catch((error) => {
          console.log("whoopsie: ", error);
          setFetchState(-1);
        });
    });
  };

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

  const getPetFoodFeedsAsync = async (authToken) => {
    var fetchUrl =
      "https://habitica-pet-feeder-api.azurewebsites.net/api/PetFoodFeeds/fetch";

    var fetchRequestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    };

    var fetchResponse = await fetch(fetchUrl, fetchRequestOptions);

    var fetchResponseData = await fetchResponse.json();

    return fetchResponseData;
  };

  const renderComponentIfFetchComplete = (componentToRender) => {
    if (fetchState === 0) return <></>;

    if (fetchState === 1) return <p>Fetching...</p>;

    if (fetchState === -1) return <p>An error occurred.</p>;

    return componentToRender;
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Habitica Pet Feeder</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Authentication</Accordion.Header>
              <Accordion.Body>
                <LoginForm onLoginSubmit={handleLoginSubmit} />
              </Accordion.Body>
            </Accordion.Item>
            {renderComponentIfFetchComplete(
              <>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Pet Food Feed Summary</Accordion.Header>
                  <Accordion.Body>
                    <PetFoodFeedSummary petFoodFeeds={petFoodFeeds} />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Pet Food Feeds</Accordion.Header>
                  <Accordion.Body>
                    <PetFoodFeedGroupedList petFoodFeeds={petFoodFeeds} />
                  </Accordion.Body>
                </Accordion.Item>
              </>
            )}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
