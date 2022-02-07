import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { AppNavBar } from "./components/common/AppNavBar";
import { LoginInfo } from "./components/common/LoginInfo";
import LoginContainer from "./components/login/container/LoginContainer";
import PetFoodFeedContainer from "./components/petFoodFeeds/container/PetFoodFeedContainer";

function App() {
  const [authToken, setAuthToken] = useState("");

  const handleLoginSuccessful = (token) => {
    setAuthToken(token);
  };

  return (
    <>
      <AppNavBar />
      <Container>
        <LoginInfo />
      </Container>

      <br />

      <Container>
        {authToken === "" ? (
          <LoginContainer onLoginSuccessful={handleLoginSuccessful} />
        ) : (
          <PetFoodFeedContainer authToken={authToken} />
        )}
      </Container>
    </>
  );
}

export default App;
