import { ListGroup } from "react-bootstrap";
import PetFoodFeedRowListItem from "../PetFoodFeedRow/PetFoodFeedRowListItem";

const PetFoodFeedList = (props) => {

  return (
    <>
      <ListGroup variant="flush">
        {props.petFoodFeeds.map((petFoodFeed) => PetFoodFeedRowListItem(petFoodFeed))}
      </ListGroup>
    </>
  );
};

export default PetFoodFeedList;
