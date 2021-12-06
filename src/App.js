import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import LoginPage from "./pages/loginPage";
import PetFeedsPage from "./pages/petFeedsPage";
import HomePage from "./pages/homePage";
import ROUTE_CONSTANTS from "./routeConstants";

function App() {
  return (
    <Container>
      <Routes>
        <Route path={ROUTE_CONSTANTS.LOGIN_PAGE} element={<LoginPage />} />
        <Route
          path={ROUTE_CONSTANTS.FEED_PETS_PAGE}
          element={<PetFeedsPage />}
        />
        <Route path={ROUTE_CONSTANTS.HOME_PAGE} element={<HomePage />} />
      </Routes>
    </Container>
  );
}

export default App;
