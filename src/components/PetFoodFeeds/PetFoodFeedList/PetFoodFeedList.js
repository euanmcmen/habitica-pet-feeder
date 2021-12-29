import { Collapse, Button, ListGroup } from "react-bootstrap";
import { useState } from "react";
import PetFoodFeedRowListItem from "../PetFoodFeedRow/PetFoodFeedRowListItem";
import PetFoodFeedRowCard from "../PetFoodFeedRow/PetFoodFeedRowCard";

const PetFoodFeedList = (props) => {
  const [expanded, setExpanded] = useState(true);

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

  return (
    <div>
      <Button
        variant="success"
        size="sm"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Hide" : "Show"} Pet Feeds
      </Button>

      <Collapse in={expanded}>{showPetFoodFeedsInListItem()}</Collapse>
    </div>
  );
};

export default PetFoodFeedList;
