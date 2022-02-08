import React from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { AppNavBar } from "./components/common/AppNavBar";
import { LoginInfo } from "./components/common/LoginInfo";
import LoginContainer from "./components/login/container/LoginContainer";
import PetFoodFeedContainer from "./components/petFoodFeeds/container/PetFoodFeedContainer";

function App() {
  const authToken = useSelector((state) => state.login.authToken);

  return (
    <>
      <AppNavBar />
      <Container>
        <LoginInfo />
      </Container>

      <br />

      <Container>
        {authToken === "" ? <LoginContainer /> : <PetFoodFeedContainer />}
      </Container>
    </>
  );
}

export default App;
