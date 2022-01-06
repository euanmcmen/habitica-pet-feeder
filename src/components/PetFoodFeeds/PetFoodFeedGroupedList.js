import { groupPetFoodFeedsByPetName } from "../../logic/groupPetFoodFeedsByPetName";
import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import PetFoodFeedGroupedRowListItem from "./PetFoodFeedGroupedRowListItem";

const PetFoodFeedGroupedList = (props) => {
  const [groupedPetFoodFeeds, setGroupedPetFoodFeeds] = useState([]);

  useEffect(() => {
    const groupedResult = groupPetFoodFeedsByPetName(props.petFoodFeeds);
    setGroupedPetFoodFeeds(groupedResult);
  }, [props.petFoodFeeds]);

  return (
    <>
      <ListGroup variant="flush">
        {groupedPetFoodFeeds.map((groupedPetFoodFeed) =>
          PetFoodFeedGroupedRowListItem(groupedPetFoodFeed)
        )}
      </ListGroup>
    </>
  );
};

export default PetFoodFeedGroupedList;
