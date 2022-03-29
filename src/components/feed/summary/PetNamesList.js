import { ListGroup } from "react-bootstrap";
import { getFriendlyName } from "../../../logic/petFoodFeedFunctions";

const PetNamesList = (props) => {
  return (
    <ListGroup variant="flush">
      {props.petsToBeFed &&
        props.petsToBeFed.map((petFullName) => (
          <ListGroup.Item key={petFullName}>
            <span>{getFriendlyName(petFullName)}</span>
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};

export default PetNamesList;
