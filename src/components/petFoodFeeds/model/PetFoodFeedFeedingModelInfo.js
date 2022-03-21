import React from "react";
import { Row, Alert } from "react-bootstrap";

const PetFoodFeedFeedingModelInfo = () => {
  return (
    <Row>
      <Alert variant="info">Your pets are being fed!</Alert>
      <p>Please allow a few minutes for the process to complete.</p>
      <p>
        Use the 'Pause' button to pause feeding for any reason, and press
        'Resume' to pick up from where you left off.
      </p>
    </Row>
  );
};

export default PetFoodFeedFeedingModelInfo;
