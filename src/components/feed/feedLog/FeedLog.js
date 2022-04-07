import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, ListGroup } from "react-bootstrap";
import { getFriendlyName } from "../../../logic/petFoodFeedFunctions";

const FeedLog = (props) => {
  const petFoodFeeds = useSelector((state) => state.petFoodFeed.feeds);

  const displayInFriendlyWay = (petFoodFeed) => {
    var petFriendlyName = getFriendlyName(petFoodFeed.petFullName);
    var foodFriendlyName = getFriendlyName(petFoodFeed.foodFullName);
    var fedQuantity = petFoodFeed.feedQuantity;

    var tensePart = petFoodFeed.isFed ? "was" : "will be";
    var fedPart = petFoodFeed.willSatisfyPet ? "satisfied after" : "fed";
    var errorMessage = "could not be fed";

    var actionMessage = petFoodFeed.hasError
      ? `${errorMessage}`
      : `${tensePart} ${fedPart}`;

    return `${petFriendlyName} ${actionMessage} ${fedQuantity} portions of ${foodFriendlyName}.`;
  };

  return (
    <>
      <Row>
        {props.includeNotFed && (
          <Col>
            <h3>Not Fed</h3>
            <ListGroup variant="flush">
              {petFoodFeeds
                .filter((petFoodFeed) => !petFoodFeed.isFed)
                .map((petFoodFeed) => (
                  <ListGroup.Item
                    key={petFoodFeed.petFullName + petFoodFeed.foodFullName}
                  >
                    <span>{displayInFriendlyWay(petFoodFeed)}</span>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Col>
        )}
        {props.includeFed && (
          <Col>
            <h3>Fed</h3>
            <ListGroup variant="flush">
              {petFoodFeeds
                .filter((petFoodFeed) => petFoodFeed.isFed)
                .map((petFoodFeed) => (
                  <ListGroup.Item
                    key={petFoodFeed.petFullName + petFoodFeed.foodFullName}
                  >
                    <span>{displayInFriendlyWay(petFoodFeed)}</span>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Col>
        )}
      </Row>
    </>
  );
};

export default FeedLog;
