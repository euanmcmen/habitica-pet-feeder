import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getAuthorizationTokenAsync } from "./client/apiClient";
import LoginForm from "./components/login/LoginForm";
import PetFoodFeedContainer from "./components/petFoodFeeds/container/PetFoodFeedContainer";

function App() {
  const [loginState, setLoginState] = useState(0);

  const [authToken, setAuthToken] = useState("");

  // 0 - Not logged in.
  // 1 - Log in started
  // 2 - Log in complete.

  const handleLoginSubmit = (userId, apiKey) => {
    setLoginState(1);

    const authUser = {
      apiUserId: userId,
      apiUserKey: apiKey,
    };

    getAuthorizationTokenAsync(authUser)
      .then((token) => {
        setAuthToken(token);
        setLoginState(2);
      })
      .catch((error) => {
        console.log("whoopsie: ", error);
        setLoginState(0);
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Habitica Pet Feeder</h1>
        </Col>
      </Row>
      {loginState < 2 && (
        <Row>
          <Col>
            <LoginForm
              onLoginSubmit={handleLoginSubmit}
              shouldDisableButton={loginState > 0}
            />
          </Col>
        </Row>
      )}
      {loginState === 1 && (
        <Row>
          <Col>
            <span>Logging in...</span>
          </Col>
        </Row>
      )}
      {loginState > 1 && <PetFoodFeedContainer authToken={authToken} />}
    </Container>
  );
}

export default App;
