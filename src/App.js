import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import PetFeedList from "./components/PetFeedList";

function App() {
  const getPetFeeds = async () => {
    var requestOptions = {
      method: "POST",
    };

    var requestUrl = "https://localhost:44354/api/PetFeeds";

    var response = await fetch(requestUrl, requestOptions);

    var data = await response.json();

    setBasicPetFeeds(data[0]);
    setRemainingPetFeeds(data[1]);
  };

  const [basicPetFeeds, setBasicPetFeeds] = useState([]);
  const [remainingPetFeeds, setRemainingPetFeeds] = useState([]);

  return (
    <>
      <Container>
        <Row>
          <h1 className="text-center">Welcome to my Habitica Pet Feeder App</h1>
        </Row>
        <br />
        <Row>
          <button onClick={() => getPetFeeds()}>Get Pet Feeds</button>
        </Row>
        <br />
        <Row>
          <h2 className="text-center">Basic Pet Feeds</h2>
        </Row>
        <Row className="text-center">
          <PetFeedList petFeeds={basicPetFeeds} />
        </Row>
        <Row>
          <h2 className="text-center">Remaining Pet Feeds</h2>
        </Row>
        <Row className="text-center">
          <PetFeedList petFeeds={remainingPetFeeds} />
        </Row>
      </Container>
    </>
  );
}

export default App;
