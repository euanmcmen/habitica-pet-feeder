import React from "react";
import { Row, Alert } from "react-bootstrap";

const PetFoodFeedFeedingModelError = () => {
  return (
    <Row>
      <Alert variant="danger">An error occurred while feeding your pets.</Alert>
      <p>This is likely temporary, and your progress has been saved.</p>
      <p>Please close the pop-up with the 'Pause' button, and try again.</p>
    </Row>
  );
};

export default PetFoodFeedFeedingModelError;
