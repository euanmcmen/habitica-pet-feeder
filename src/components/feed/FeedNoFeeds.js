import React from "react";
import { Row, Alert } from "react-bootstrap";

const FeedNoFeeds = () => {
  return (
    <>
      <Row>
        <Alert variant="warning">None of your pets can be fed.</Alert>
      </Row>
      <br />
      <Row style={{ textAlign: "center" }}>
        <p>You may already have fully fed your pets.</p>
        <p>You may also have no pets or foods which can be fed.</p>
      </Row>
    </>
  );
};

export default FeedNoFeeds;
