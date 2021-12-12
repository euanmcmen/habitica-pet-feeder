import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PetFeedList from "./components/PetFeeds/PetFeedList";
import PetFeedSummary from "./components/PetFeeds/PetFeedSummary";
import LoginForm from "./components/Login/LoginForm";

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

  const handlePetFeedFetch = () => {
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
  };

  // useEffect(() => {}, []);

  const showPetFeeds = () => {
    //Show a loading page if the API is still working away.
    if (isFetchInProgress) return <p>Loading Pet Feeds...</p>;

    //When the API finishes, it will either return:

    //...An error
    if (hasPetFeedsFetchError) return <p>Unable to fetch Pet Feeds</p>;

    //...Or pet feeds including an empty set.
    return <PetFeedList petFeeds={petFeeds} />;
  };

  const showPetFeedSummary = () => {
    //Show a loading page if the API is still working away.
    if (isFetchInProgress) return <p>Loading Pet Feed Summary...</p>;

    //When the API finishes, it will either return:

    //...An error
    if (hasPetFeedsFetchError) return <p>Unable to fetch Pet Feed Summary</p>;

    //...Or pet feed summary.
    return <PetFeedSummary summary={summary} />;
  };

  const handleLoginSubmit = (userId, apiKey) => {
    console.log("UserId: ", userId);
    console.log("API key: ", apiKey);
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
          <LoginForm onLoginSubmit={handleLoginSubmit} />
        </Col>
      </Row>
      {/* <Row>
        <Col>{showPetFeedSummary()}</Col>
      </Row>
      <br />
      <Row className="text-center">
        <Col>{showPetFeeds()}</Col>
      </Row> */}
    </Container>
  );
}

export default App;
