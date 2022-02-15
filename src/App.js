import React from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { AppNavBar } from "./components/common/AppNavBar";
import LoginContainer from "./components/login/container/LoginContainer";
import PetFoodFeedContainer from "./components/petFoodFeeds/container/PetFoodFeedContainer";

function App() {
  const authToken = useSelector((state) => state.apiConnection.authToken);

  return (
    <>
      <AppNavBar />

      <br />

      <Container>
        {authToken === "" ? <LoginContainer /> : <PetFoodFeedContainer />}
      </Container>
    </>
  );
}

export default App;
