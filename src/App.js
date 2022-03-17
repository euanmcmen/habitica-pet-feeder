import React from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { AppNavBar } from "./components/nav/AppNavBar";
import LogoutContainer from "./components/logout/container/LogoutContainer";
import FetchUserPetsContainer from "./components/fetch/container/FetchUserPetsContainer";

function App() {
  const authToken = useSelector((state) => state.apiConnection.authToken);

  return (
    <>
      <AppNavBar />
      <br />

      {authToken !== "" && (
        <>
          <Container>
            <LogoutContainer />
          </Container>
          <br />
        </>
      )}

      <Container>
        <FetchUserPetsContainer />
      </Container>
    </>
  );
}

export default App;
