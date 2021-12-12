import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import LoginPage from "./pages/loginPage";
import PetFeedsPage from "./pages/petFeedsPage";
import HomePage from "./pages/homePage";
import ROUTE_CONSTANTS from "./routeConstants";
import PetFeedList from "./components/PetFeeds/PetFeedList";
import PetFeedSummary from "./components/PetFeeds/PetFeedSummary";
import LoginForm from "./components/Login/loginForm";

function App() {
  const getPetFeedsAsync = async (authCredentials) => {
    var requestOptions = {
      method: "GET",
      headers: {
        "x-api-userid": "",
        "x-api-key": "",
      },
    };

    var requestUrl = "https://localhost:44354/api/PetFeeds";

    var response = await fetch(requestUrl, requestOptions);

    var data = await response.json();

    return data;
  };

  const [petFeeds, setPetFeeds] = useState([]);
  const [hasPetFeedsFetchError, setpetFeedsFetchError] = useState(false);
  const [isFetchInProgress, setFetchInProgress] = useState(false);

  const [summary, setSummary] = useState(null);

  const hasPetFeedSummary = () => summary !== undefined && summary !== null;

  useEffect(() => {
    setFetchInProgress(true);

    getPetFeedsAsync()
      .then((data) => {
        setPetFeeds(data.petFoodFeeds);
        setSummary(data.petFoodFeedSummary);
      })
      .catch((error) => {
        console.log("whoopsie: ", error);
        setpetFeedsFetchError(true);
      })
      .finally((response) => {
        setFetchInProgress(false);
      });
  }, []);

  const showPetFeeds = () => {
    //Show a loading page if the API is still working away.
    if (isFetchInProgress) return <p>Loading...</p>;

    //When the API finishes, it will either return:

    //...An error
    if (hasPetFeedsFetchError) return <p>Oh no...</p>;

    //...Or pet feeds including an empty set.
    return <PetFeedList petFeeds={petFeeds} />;
  };

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
          <LoginForm
        </Col>
      </Row>
      <Row>
        <Col>{hasPetFeedSummary() && <PetFeedSummary summary={summary} />}</Col>
      </Row>
      <br />
      <Row className="text-center">
        <Col>{showPetFeeds()}</Col>
      </Row>
    </Container>
  );
}

export default App;
