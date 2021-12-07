import { ListGroup } from "react-bootstrap";

const PetFeedSummary = (props) => {
  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item>
          TotalNumberOfPetsFed: {props.summary.totalNumberOfPetsFed}
        </ListGroup.Item>
        <ListGroup.Item>
          TotalNumberOfFoodsFed: {props.summary.totalNumberOfFoodsFed}
        </ListGroup.Item>
        <ListGroup.Item>
          TotalNumberOfSatisfiedPets: {props.summary.totalNumberOfSatisfiedPets}
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default PetFeedSummary;
