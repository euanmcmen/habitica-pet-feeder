import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  getAuthorizationTokenAsync,
  getPetFoodFeedsAsync,
} from "./client/apiClient";
import LoginForm from "./components/login/LoginForm";
import PetFoodFeedContainer from "./components/petFoodFeeds/container/PetFoodFeedContainer";

function App() {
  const [appState, setAppState] = useState(0);

  const [petFoodFeeds, setPetFoodFeeds] = useState([]);
  const [authToken, setAuthToken] = useState("");
  const [rateLimitRemaining, setRateLimitRemaining] = useState("30");

  // -1 - Error
  // 0 - Fetch not started
  // 1 - Fetch started
  // 2 - Fetch complete

  const handleLoginSubmit = (userId, apiKey) => {
    setAppState(1);

    const authUser = {
      apiUserId: userId,
      apiUserKey: apiKey,
    };

    getAuthorizationTokenAsync(authUser)
      .then((token) => {
        setAuthToken(token);

        getPetFoodFeedsAsync(token, rateLimitRemaining).then((res) => {
          setRateLimitRemaining(res.rateLimitRemaining);
          setPetFoodFeeds(res.response);
          setAppState(2);
        });
      })
      .catch((error) => {
        console.log("whoopsie: ", error);
        setAppState(-1);
      });
  };

  const handleRateLimitRemainingChanged = (newRateLimit) => {
    setRateLimitRemaining(newRateLimit);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Habitica Pet Feeder</h1>
        </Col>
        <Col>
          <span>{rateLimitRemaining}</span>
        </Col>
      </Row>
      {appState < 2 && (
        <Row>
          <Col>
            <LoginForm
              onLoginSubmit={handleLoginSubmit}
              shouldDisableButton={appState > 0}
            />
          </Col>
        </Row>
      )}
      {appState === 1 && (
        <Row>
          <Col>
            <span>Logging in...</span>
          </Col>
        </Row>
      )}
      {appState === 2 && (
        <PetFoodFeedContainer
          petFoodFeeds={petFoodFeeds}
          authToken={authToken}
          rateLimitRemaining={rateLimitRemaining}
          onRateLimitRemainingChanged={handleRateLimitRemainingChanged}
        />
      )}
    </Container>
  );
}

export default App;
