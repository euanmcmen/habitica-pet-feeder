import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Modal, Alert } from "react-bootstrap";
import PetFoodFeedCarouselList from "./list/PetFoodFeedCarouselList";
import PetFoodFeedProgressBar from "./progressBar/PetFoodFeedProgressBar";
import PetFoodFeedToggleButton from "./PetFoodFeedToggleButton";

import { setFeedingPets } from "../../slices/petFoodFeedSlice";

const PetFoodFeedFeedingModel = () => {
  const dispatch = useDispatch();

  const petFoodFeeds = useSelector((state) => state.petFoodFeed.feeds);
  const petFoodFeedIndex = useSelector((state) => state.petFoodFeed.feedIndex);
  const isFeedingPets = useSelector((state) => state.petFoodFeed.isFeedingPets);
  const isFeedingPet = useSelector((state) => state.petFoodFeed.isFeedingPet);

  const stopFeedingPets = () => {
    dispatch(setFeedingPets(false));
  };

  return (
    <Modal
      show={isFeedingPets || isFeedingPet}
      onHide={stopFeedingPets}
      animation={false}
      backdrop="static"
      dialogClassName="custom-model"
    >
      <Modal.Header closeButton>
        <Modal.Title>Currently Feeding...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <br />
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
            <Alert>Waiting for current feed to finish...</Alert>
          )}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <PetFoodFeedToggleButton
          isResumable={true}
          onButtonClicked={stopFeedingPets}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default PetFoodFeedFeedingModel;
