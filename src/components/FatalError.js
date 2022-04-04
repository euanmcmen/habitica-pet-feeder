import React from "react";
import { Row, Alert } from "react-bootstrap";

const FatalError = () => {
  return (
    <Row>
      <Alert variant="danger">Oof.</Alert>
    </Row>
  );
};

export default FatalError;
