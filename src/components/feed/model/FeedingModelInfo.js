import React from "react";
import { Row, Alert } from "react-bootstrap";

const FeedingModelInfo = () => {
  return (
    <Row>
      <Alert variant="info">Your pets are being fed!</Alert>
      <p>
        Please allow a few minutes for the process to complete. It's strongly
        recommended you avoid interacting with Habitica during the feeding
        process.
      </p>
      <p>
        Use the 'Pause' button to pause feeding for any reason, and press
        'Resume' to pick up from where you left off.
      </p>
    </Row>
  );
};

export default FeedingModelInfo;
