import { Collapse, Button, ListGroup } from "react-bootstrap";
import { useState } from "react";
import PetFoodFeedRowListItem from "../PetFoodFeedRow/PetFoodFeedRowListItem";
import PetFoodFeedRowCard from "../PetFoodFeedRow/PetFoodFeedRowCard";

const PetFoodFeedList = (props) => {
  const [expanded, setExpanded] = useState(true);

  const showPetFoodFeeds = () => (
    <div>
      <Button
        variant="success"
        size="sm"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Hide" : "Show"} Pet Feeds
      </Button>

      {/* <Collapse in={expanded}>
        <ListGroup variant="flush">
          {props.petFeeds.map((petFeed) => PetFeedRowListItem(petFeed))}
        </ListGroup>
      </Collapse> */}

      <Collapse in={expanded}>{showPetFoodFeedsInListItem()}</Collapse>
    </div>
  );

  const showPetFoodFeedsInListItem = () => (
    <ListGroup variant="flush">
      {props.petFoodFeeds.map((petFoodFeed) =>
        PetFoodFeedRowListItem(petFoodFeed)
      )}
    </ListGroup>
  );

  const showPetFoodFeedsInCards = () => (
    <>
      {props.petFoodFeeds.map((petFoodFeed) => PetFoodFeedRowCard(petFoodFeed))}
    </>
  );

  const showEmptyPetFoodFeeds = () => (
    <div>
      <p>No pet feed data.</p>
      <p>You may not have any pets which can be fed, or food for your pets.</p>
    </div>
  );

  return props.petFoodFeeds.length > 0
    ? showPetFoodFeeds()
    : showEmptyPetFoodFeeds();
};

export default PetFoodFeedList;
