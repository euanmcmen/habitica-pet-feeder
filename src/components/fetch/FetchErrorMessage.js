import React from "react";
import { Row, Alert } from "react-bootstrap";

const FetchErrorMessage = () => {
  return (
    <Row>
      <Alert variant="danger">
        No user information was found for your User ID and API Key. Please check
        and try again.
      </Alert>
    </Row>
  );
};

export default FetchErrorMessage;
