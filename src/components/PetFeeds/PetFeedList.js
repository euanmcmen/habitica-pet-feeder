import PetFeed from "./PetFeedRow";
import { Collapse, Button, ListGroup } from "react-bootstrap";
import { useState } from "react";

const PetFeedList = (props) => {
  const [expanded, setExpanded] = useState(true);

  const showPetFeeds = () => (
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
    </div>
  );

  const showEmptyPetFeeds = () => (
    <div>
      <p>No pet feed data.</p>
      <p>You may not have any pets which can be fed, or food for your pets.</p>
    </div>
  );

  return props.petFeeds.length > 0 ? showPetFeeds() : showEmptyPetFeeds();
};

export default PetFeedList;
