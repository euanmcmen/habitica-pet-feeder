import React from "react";
import { Row, Alert } from "react-bootstrap";
import FeedLog from "./feedLog/FeedLog";

const FeedingComplete = () => {
  return (
    <>
      <Row>
        <Alert variant="success">Your pets have been fed!</Alert>
      </Row>
      <br />
      <Row style={{ textAlign: "center" }}>
        <p>Your pets have been fed and grown into mounts.</p>
        <p>Thank you for using this application!</p>
      </Row>
      <br />
      <Row style={{ textAlign: "center" }}>
        <p>
          Please see below for a breakdown of which pets were fed which foods.
        </p>
      </Row>
      <FeedLog includeFed={true} />
    </>
  );
};

export default FeedingComplete;
