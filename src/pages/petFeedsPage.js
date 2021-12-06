import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import EmptyPetFeedList from "../components/EmptyPetFeedList";
import PetFeedList from "../components/PetFeedList";
import PetFeedSummary from "../components/PetFeedSummary";

const PetFeedsPage = () => {
  const getPetFeeds = async () => {
    var requestOptions = {
      method: "GET",
    };

    var requestUrl = "https://localhost:44354/api/PetFeeds";

    var response = await fetch(requestUrl, requestOptions);

    var data = await response.json();

    return data;
  };

  const [petFeeds, setPetFeeds] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    getPetFeeds()
      .then((data) => {
        console.log(data);

        setPetFeeds(data.petFoodFeeds);
        setSummary(data.petFoodFeedSummary);
      })
      .catch((error) => {
        console.log("whoopsie: ", error);
      });
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Habitica Pet Feeder - Pet Feeds</h1>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          {summary !== undefined && summary !== null && (
            <PetFeedSummary summary={summary} />
          )}
        </Col>
      </Row>
      <br />
      <Row className="text-center">
        <Col>
          {petFeeds !== undefined && petFeeds.length > 0 ? (
            <PetFeedList petFeeds={petFeeds} />
          ) : (
            <EmptyPetFeedList />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PetFeedsPage;
