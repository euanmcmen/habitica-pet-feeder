import React from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { AppNavBar } from "./components/nav/AppNavBar";
import LogoutContainer from "./components/logout/container/LogoutContainer";
import FetchUserPetsContainer from "./components/fetch/container/FetchUserPetsContainer";
import FeedUserPetsContainer from "./components/feed/container/FeedUserPetsContainer";
import FatalError from "./components/FatalError";

function App() {
  const authToken = useSelector((state) => state.apiConnection.authToken);
  const hasFatalApiError = useSelector(
    (state) => state.apiConnection.hasFatalApiError
  );

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
        {hasFatalApiError && <FatalError />}
        {!hasFatalApiError && (
          <>
            {authToken === "" ? (
              <FetchUserPetsContainer />
            ) : (
              <FeedUserPetsContainer />
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default App;
