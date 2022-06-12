import { Card } from "react-bootstrap";

const FeedInfo = () => {
  return (
    <Card border="info">
      <Card.Title>Info</Card.Title>
      <Card.Body>
        <p>Your pets can be fed! Perhaps even their favourite foods.</p>
        <p>
          Below is a summary of how many pets will be fed; how many pets will be
          fed fully and become mounts; and how many units of food will be fed
          across them.
        </p>
        <p>
          You can view some extra information using the buttons to the right of
          the summary.
        </p>
        <p>Press the "Start Feeding" button below to begin.</p>
      </Card.Body>
    </Card>
  );
};

export default FeedInfo;
