import {
  getNumberOfPetsFed,
  getNumberOfPetsFedFully,
  getNumberOfFoodsFed,
} from "../../logic/petFoodFeedSummaryFunctions";

import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";

const PetFoodFeedSummary = (props) => {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const totalNumberOfPetsFed = getNumberOfPetsFed(props.petFoodFeeds);

    const totalNumberOfPetsFedFully = getNumberOfPetsFedFully(
      props.petFoodFeeds
    );

    const totalNumberOfFoodsFed = getNumberOfFoodsFed(props.petFoodFeeds);

    setSummary({
      totalNumberOfPetsFed,
      totalNumberOfPetsFedFully,
      totalNumberOfFoodsFed,
    });
  }, [props.petFoodFeeds]);

  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item>
          Total Number Of Pets Fed: {summary.totalNumberOfPetsFed}
        </ListGroup.Item>
        <ListGroup.Item>
          Total Number Of Foods Fed: {summary.totalNumberOfFoodsFed}
        </ListGroup.Item>
        <ListGroup.Item>
          Total Number Of Satisfied Pets: {summary.totalNumberOfPetsFedFully}
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default PetFoodFeedSummary;
