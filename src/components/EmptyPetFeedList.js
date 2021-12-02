import { ListGroup } from "react-bootstrap";

const EmptyPetFeedList = () => {
  return (
    <>
      <p>Nothing here! There might be:</p>
      <ListGroup variant="flush">
        <ListGroup.Item>No Pets</ListGroup.Item>
        <ListGroup.Item>No Food</ListGroup.Item>
        <ListGroup.Item variant="danger">No API</ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default EmptyPetFeedList;
