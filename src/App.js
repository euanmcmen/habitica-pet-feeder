import React, { useState } from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import PetFoodFeedGroupedList from "./components/PetFoodFeeds/PetFoodFeedGroupedList";
import PetFoodFeedSummary from "./components/PetFoodFeeds/PetFoodFeedSummary";
import {
  getAuthorizationTokenAsync,
  getPetFoodFeedsAsync,
} from "./client/apiClient";
import LoginForm from "./components/Login/LoginForm";

function App() {
  const [petFoodFeeds, setPetFoodFeeds] = useState([]);

  const [fetchState, setFetchState] = useState(0);

  const [authToken, setAuthToken] = useState("");

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

    getAuthorizationTokenAsync(authUser)
      .then((token) => {
        setAuthToken(token);

        getPetFoodFeedsAsync(token).then((data) => {
          setPetFoodFeeds(data);
          setFetchState(2);
        });
      })
      .catch((error) => {
        console.log("whoopsie: ", error);
        setFetchState(-1);
      });
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
