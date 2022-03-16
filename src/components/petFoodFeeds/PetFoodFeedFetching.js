import React from "react";
import { Row, Alert, ProgressBar } from "react-bootstrap";

const PetFoodFeedFetching = () => {
  return (
    <>
      <Row>
        <Alert variant="info">Please wait.</Alert>
      </Row>
      <br />
      <Row style={{ textAlign: "center" }}>
        <p>
          The application is communicating with Habitica to fetch your pets and
          foods, and figuring out the best way to feed them.
        </p>
        <p>It will progress automatically.</p>
      </Row>
      <br />
      <Row>
        <ProgressBar animated now={100} />
      </Row>
    </>
  );
};

export default PetFoodFeedFetching;
