import PetFeed from "../PetFeeds/PetFeedRow";
import { Collapse, Button, ListGroup } from "react-bootstrap";
import { useState } from "react";

const PetFeedList = (props) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div>
      <Button
        variant="success"
        size="sm"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Hide" : "Show"} Pet Feeds
      </Button>

      <Collapse in={expanded}>
        <ListGroup variant="flush">
          {props.petFeeds.map((petFeed) => PetFeed(petFeed))}
        </ListGroup>
      </Collapse>

      {/* <Collapse in={expanded}>
        <table className="table">
          <thead>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
          </thead>
          <tbody>{props.petFeeds.map((petFeed) => PetFeed(petFeed))}</tbody>
        </table>
      </Collapse> */}
    </div>
  );
};

export default PetFeedList;
