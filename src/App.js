import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PetFoodFeedList from "./components/PetFoodFeeds/PetFoodFeedList/PetFoodFeedList";
import PetFoodFeedSummary from "./components/PetFoodFeeds/PetFoodFeedSummary";
import LoginForm from "./components/Login/LoginForm";
import MainDisplay from "./components/Main/MainDisplay"

function App() {
  const [petFoodFeeds, setPetFoodFeeds] = useState([]);
  
  // const [hasPetFoodFeedsFetchError, setPetFoodFeedsFetchError] = useState(false);

  // const [authenticatedUser, setAuthenticatedUser] = useState(null);

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

    getPetFoodFeedsAsync(authUser)
      .then((data) => {
        setPetFoodFeeds(data);
        // setAuthenticatedUser(authUser);
        setFetchState(2)
      })
      .catch((error) => {
        console.log("whoopsie: ", error);
        setFetchState(-1)
      })
  };

  const getPetFoodFeedsAsync = async (authUser) => {
    var requestUrl =
      "https://habitica-pet-feeder-api.azurewebsites.net/api/PetFoodFeeds";

    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authUser),
    };

    var response = await fetch(requestUrl, requestOptions);

    var responseData = await response.json();

    return responseData;
  };

  const showMainDisplay = () => {
    if (fetchState === 0) return <p>...</p>;

    return <MainDisplay fetchState={fetchState} petFoodFeeds={petFoodFeeds} />
  }

  //Use a Bootstrap Accordian to get a nice containerised look?
  // https://react-bootstrap.github.io/components/accordion/
  

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Habitica Pet Feeder</h1>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <LoginForm onLoginSubmit={handleLoginSubmit} />
        </Col>
      </Row>
      <>{
        showMainDisplay()
      }
      </>
    </Container>
  );
}

export default App;
