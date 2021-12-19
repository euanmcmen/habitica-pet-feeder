import { Col, Row, ListGroup, Image } from "react-bootstrap";

const PetFeedRowListItem = (props) => {
  return (
    <ListGroup.Item
      key={`${props.petFullName}+${props.foodFullName}`}
      variant="primary"
    >
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Image
            src={`https://habitica-assets.s3.amazonaws.com/mobileApp/images/Pet-${props.petFullName}.png`}
            alt={props.petFullName}
            width={100}
            height={100}
            roundedCircle
          />
        </Col>
        <Col>
          <span>
            {[...Array(props.feedQuantity)].map((element, index) => (
              <Image
                key={index}
                src={`https://habitica-assets.s3.amazonaws.com/mobileApp/images/Pet_Food_${props.foodFullName}.png`}
                alt={props.petFullName}
                width={100}
                height={100}
                roundedCircle
              />
            ))}
          </span>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default PetFeedRowListItem;
