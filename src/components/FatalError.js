import React from "react";
import { Row, Alert } from "react-bootstrap";

const FatalError = () => {
  return (
    <>
      <Row>
        <Alert variant="danger">An unexpected error occurred.</Alert>
      </Row>
      <Row style={{ textAlign: "center" }}>
        <p>
          The application has encountered an unrecoverable error and is unable
          to proceed.
        </p>
        <p>
          Please try reloading the page and logging in again. If you get this
          error consistently, the application may be experiencing technical
          issues.
        </p>
      </Row>
    </>
  );
};

export default FatalError;
