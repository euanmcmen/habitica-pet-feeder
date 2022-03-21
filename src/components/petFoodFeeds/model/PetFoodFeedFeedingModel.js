import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Modal, Alert } from "react-bootstrap";
import PetFoodFeedCarouselList from "../list/PetFoodFeedCarouselList";
import PetFoodFeedProgressBar from "../progressBar/PetFoodFeedProgressBar";
import PetFoodFeedToggleButton from "../toggleButton/PetFoodFeedToggleButton";
import PetFoodFeedFeedingModelInfo from "./PetFoodFeedFeedingModelInfo";
import PetFoodFeedFeedingModelError from "./PetFoodFeedFeedingModelError";

const PetFoodFeedFeedingModel = () => {
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
        <Modal.Title>Currently Feeding...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <br />
          <Row>
            {!isFeedingErrored ? (
              <PetFoodFeedFeedingModelInfo />
            ) : (
              <PetFoodFeedFeedingModelError />
            )}
          </Row>
          <Row>
            <Col>
              <PetFoodFeedCarouselList
                petFoodFeedIndex={petFoodFeedIndex}
                petFoodFeeds={petFoodFeeds}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <PetFoodFeedProgressBar
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
        <PetFoodFeedToggleButton isResumable={true} size={"md"} />
      </Modal.Footer>
    </Modal>
  );
};

export default PetFoodFeedFeedingModel;
