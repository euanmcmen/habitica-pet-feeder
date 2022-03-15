import React from "react";
import { Row, Alert } from "react-bootstrap";

const PetFoodFeedNoUser = () => {
  return (
    <>
      <Row>
        <Alert variant="danger">
          No user information was found for your credentials.
        </Alert>
      </Row>
      <br />
      <Row style={{ textAlign: "center" }}>
        <p>
          Your USER ID and API KEY are different from your website username and
          password. Make sure you enter your USER ID and API KEY.
        </p>
        <p>Please log out and try again.</p>
      </Row>
    </>
  );
};

export default PetFoodFeedNoUser;
