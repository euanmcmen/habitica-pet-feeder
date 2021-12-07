import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import EmptyPetFeedList from "../components/PetFeedLists/EmptyPetFeedList";
import ErrorPetFeedList from "../components/PetFeedLists/ErrorPetFeedsList";
import PetFeedList from "../components/PetFeedLists/PetFeedList";
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
  const [hasPetFeedsFetchError, setpetFeedsFetchError] = useState(false);

  const [summary, setSummary] = useState(null);

  const hasPetFeeds = () => petFeeds !== undefined && petFeeds.length > 0;

  const hasPetFeedSummary = () => summary !== undefined && summary !== null;

  useEffect(() => {
    getPetFeeds()
      .then((data) => {
        console.log(data);

        setPetFeeds(data.petFoodFeeds);
        setSummary(data.petFoodFeedSummary);
      })
      .catch((error) => {
        console.log("whoopsie: ", error);
        setpetFeedsFetchError(true);
      });
  }, []);

  const showPetFeeds = () => {
    if (!hasPetFeedsFetchError) {
      return hasPetFeeds() ? (
        <PetFeedList petFeeds={petFeeds} />
      ) : (
        <EmptyPetFeedList />
      );
    } else {
      return <ErrorPetFeedList />;
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Habitica Pet Feeder - Pet Feeds</h1>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>{hasPetFeedSummary() && <PetFeedSummary summary={summary} />}</Col>
      </Row>
      <br />
      <Row className="text-center">
        <Col>{showPetFeeds()}</Col>
      </Row>
    </Container>
  );
};

export default PetFeedsPage;
