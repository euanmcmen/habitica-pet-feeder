import { groupPetFoodFeedsByPetName } from "../../logic/groupPetFoodFeedsByPetName";
import { useEffect, useState } from "react";
import { Col, Row, ListGroup } from "react-bootstrap";
import PetFoodFeedGroupedRowListItem from "./PetFoodFeedGroupedRowListItem";

const PetFoodFeedGroupedList = (props) => {
  // const [groupedPetFoodFeeds, setGroupedPetFoodFeeds] = useState([]);

  const [splitArray, setSplitArray] = useState({ left: [], right: [] });

  useEffect(() => {
    const groupedResult = groupPetFoodFeedsByPetName(props.petFoodFeeds);
    // setGroupedPetFoodFeeds(groupedResult);

    const temp = { left: [], right: [] };

    for (let i = 0; i < groupedResult.length; i++) {
      if (i % 2 === 0) {
        temp.left.push(groupedResult[i]);
      } else {
        temp.right.push(groupedResult[i]);
      }
    }

    console.log(temp);

    setSplitArray(temp);
  }, [props.petFoodFeeds]);

  return (
    <>
      <Row>
        <Col>
          <ListGroup variant="flush">
            {splitArray.left.map((groupedPetFoodFeed) =>
              PetFoodFeedGroupedRowListItem(groupedPetFoodFeed)
            )}
          </ListGroup>
        </Col>
        <Col>
          <ListGroup variant="flush">
            {splitArray.right.map((groupedPetFoodFeed) =>
              PetFoodFeedGroupedRowListItem(groupedPetFoodFeed)
            )}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default PetFoodFeedGroupedList;
