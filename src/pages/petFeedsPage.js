import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import PetFeedList from "../components/PetFeeds/PetFeedList";
import PetFeedSummary from "../components/PetFeeds/PetFeedSummary";

const PetFeedsPage = (props) => {
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
  const [isFetchInProgress, setFetchInProgress] = useState(false);

  const [summary, setSummary] = useState(null);

  const hasPetFeedSummary = () => summary !== undefined && summary !== null;

  useEffect(() => {
    setFetchInProgress(true);

    getPetFeeds()
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
    <>
      <br />
      <Row>
        <Col>{hasPetFeedSummary() && <PetFeedSummary summary={summary} />}</Col>
      </Row>
      <br />
      <Row className="text-center">
        <Col>{showPetFeeds()}</Col>
      </Row>
    </>
  );
};

export default PetFeedsPage;
