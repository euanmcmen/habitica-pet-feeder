import React from "react";
import { useSelector } from "react-redux";
import { Row, Alert, ListGroup } from "react-bootstrap";
import { getFriendlyName } from "../../logic/petFoodFeedFunctions";

const PetFoodFeedComplete = () => {
  const petFoodFeeds = useSelector((state) => state.petFoodFeed.feeds);

  const displayInFriendlyWay = (petFoodFeed) => {
    var petFriendlyName = getFriendlyName(petFoodFeed.petFullName);
    var foodFriendlyName = getFriendlyName(petFoodFeed.foodFullName);
    var fedQuantity = petFoodFeed.feedQuantity;
    return `${petFriendlyName} was fed ${foodFriendlyName} ${fedQuantity} times.`;
  };

  return (
    <>
      <Row>
        <Alert variant="success">Your pets have been fed!</Alert>
      </Row>
      <br />
      <Row style={{ textAlign: "center" }}>
        <p>Your pets have been fed and grown into mounts.</p>
        <p>Thank you for using this application!</p>
      </Row>
      <br />
      <Row style={{ textAlign: "center" }}>
        <p>
          Please see below for a breakdown of which pets were fed which foods.
        </p>
      </Row>
      <Row>
        <ListGroup variant="flush">
          {petFoodFeeds.map((petFoodFeed) => (
            <ListGroup.Item
              key={petFoodFeed.petFullName + petFoodFeed.foodFullName}
            >
              <span>{displayInFriendlyWay(petFoodFeed)}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Row>
    </>
  );
};

export default PetFoodFeedComplete;
