import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Modal, Alert } from "react-bootstrap";
import FeedCarouselList from "../carousel/FeedCarouselList";
import FeedProgressBar from "../progressBar/FeedProgressBar";
import FeedToggleButton from "../toggleButton/FeedToggleButton";
import FeedingModelInfo from "./FeedingModelInfo";
import FeedingModelError from "./FeedingModelError";

const FeedingModel = () => {
  const petFoodFeeds = useSelector((state) => state.petFoodFeed.feeds);
  const petFoodFeedIndex = useSelector((state) => state.petFoodFeed.feedIndex);
  const isFeedingPets = useSelector((state) => state.petFoodFeed.isFeedingPets);
  const isFeedingPet = useSelector((state) => state.petFoodFeed.isFeedingPet);
  const isFeedingErrored = useSelector(
    (state) => state.petFoodFeed.isFeedingErrored
  );

  return (
    <Modal
      show={isFeedingPets || isFeedingPet}
      animation={false}
      backdrop="static"
      dialogClassName="custom-model"
    >
      <Modal.Header>
        <Modal.Title>Pet Food Feeder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <br />
          <Row>
            {!isFeedingErrored ? <FeedingModelInfo /> : <FeedingModelError />}
          </Row>
          <Row>
            <Col>
              <FeedCarouselList
                petFoodFeedIndex={petFoodFeedIndex}
                petFoodFeeds={petFoodFeeds}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <FeedProgressBar
                value={petFoodFeedIndex}
                max={petFoodFeeds.length}
              />
            </Col>
          </Row>
          <br />
          {!isFeedingPets && isFeedingPet && (
            <Alert>Waiting for this feed to finish...</Alert>
          )}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <FeedToggleButton isResumable={true} size={"md"} />
      </Modal.Footer>
    </Modal>
  );
};

export default FeedingModel;
