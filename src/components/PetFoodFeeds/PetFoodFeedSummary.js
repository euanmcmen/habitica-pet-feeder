import {
  getNumberOfPetsFed,
  getNumberOfPetsFedFully,
  getNumberOfFoodsFed,
} from "../../logic/petFoodFeedSummaryFunctions";

import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";

//Should accept the pet feeds structure fetched from the API, calculate the summary values, and store them.

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
          TotalNumberOfPetsFed: {summary.totalNumberOfPetsFed}
        </ListGroup.Item>
        <ListGroup.Item>
          TotalNumberOfFoodsFed: {summary.totalNumberOfFoodsFed}
        </ListGroup.Item>
        <ListGroup.Item>
          TotalNumberOfSatisfiedPets: {summary.totalNumberOfPetsFedFully}
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default PetFoodFeedSummary;
