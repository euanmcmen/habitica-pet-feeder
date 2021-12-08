import { Col, Row, ListGroup, Badge, Figure, Image } from "react-bootstrap";

const PetFeed = (props) => {
  function getSatisfiedText(isSatisfied) {
    return isSatisfied ? "will be satisfied." : "will want more food.";
  }

  return (
    <ListGroup.Item key={`${props.petFullName}+${props.foodFullName}`}>
      <Row>
        <Col>
          <Image
            src={`https://habitica-assets.s3.amazonaws.com/mobileApp/images/Pet-${props.petFullName}.png`}
            alt={props.petFullName}
            width={100}
            height={100}
            roundedCircle
          />
        </Col>
        <Col>
          <Image
            src={`https://habitica-assets.s3.amazonaws.com/mobileApp/images/Pet_Food_${props.foodFullName}.png`}
            alt={props.petFullName}
            width={100}
            height={100}
            roundedCircle
          />
        </Col>
        <Col>
          <Badge variant="primary" pill>
            {props.feedQuantity}
          </Badge>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default PetFeed;
