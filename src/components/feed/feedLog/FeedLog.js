import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, ListGroup } from "react-bootstrap";
import { getFriendlyName } from "../../../logic/petFoodFeedFunctions";

const PetFoodFeedLog = (props) => {
  const petFoodFeeds = useSelector((state) => state.petFoodFeed.feeds);

  const displayInFriendlyWay = (petFoodFeed, isPastTense) => {
    var petFriendlyName = getFriendlyName(petFoodFeed.petFullName);
    var foodFriendlyName = getFriendlyName(petFoodFeed.foodFullName);
    var fedQuantity = petFoodFeed.feedQuantity;
    var tenseWord = isPastTense ? "was" : "will be";
    var fedMessage = petFoodFeed.willSatisfyPet ? "satisfied after" : "fed";

    return `${petFriendlyName} ${tenseWord} ${fedMessage} ${fedQuantity} portions of ${foodFriendlyName}.`;
  };

  return (
    <Row>
      {props.includeNotFed && (
        <Col>
          <ListGroup variant="flush">
            {petFoodFeeds
              .filter((petFoodFeed) => !petFoodFeed.isFed)
              .map((petFoodFeed) => (
                <ListGroup.Item
                  key={petFoodFeed.petFullName + petFoodFeed.foodFullName}
                >
                  <span>{displayInFriendlyWay(petFoodFeed, false)}</span>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
      )}
      {props.includeFed && (
        <Col>
          <ListGroup variant="flush">
            {petFoodFeeds
              .filter((petFoodFeed) => petFoodFeed.isFed)
              .map((petFoodFeed) => (
                <ListGroup.Item
                  key={petFoodFeed.petFullName + petFoodFeed.foodFullName}
                >
                  <span>{displayInFriendlyWay(petFoodFeed, true)}</span>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
      )}
    </Row>
  );
};

export default PetFoodFeedLog;
