import React from "react";
import { Row, Alert } from "react-bootstrap";

const PetFoodFeedNoFeeds = () => {
  return (
    <>
      <Row>
        <Alert variant="success">All of your pets have been fed!</Alert>
      </Row>
      <br />
      <Row style={{ textAlign: "center" }}>
        <p>
          It appears all of your pets have been fully fed, and cannot be fed
          further.
        </p>
      </Row>
      <br />
      <Row style={{ textAlign: "center" }}>
        <p>This web application has nothing more to offer for you.</p>
        <p>Thank you for checking it out!</p>
      </Row>
      <br />
      <Row style={{ textAlign: "center", fontStyle: "italic" }}>
        <p>If you think this is incorrect, please contact me.</p>
      </Row>
    </>
  );
};

export default PetFoodFeedNoFeeds;
