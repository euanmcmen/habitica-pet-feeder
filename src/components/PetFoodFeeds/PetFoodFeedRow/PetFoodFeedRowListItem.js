import { Col, Row, ListGroup, Image } from "react-bootstrap";

const PetFoodFeedRowListItem = (props) => {
  const getVariantByFeedStatus = () => (props.willSatisfyPet ? "success" : "");

  return (
    <ListGroup.Item
      key={`${props.petFullName}+${props.foodFullName}`}
      variant={getVariantByFeedStatus()}
    >
      <Row className="align-items-center">
        <Col md={1}>
          <Image
            src={`https://habitica-assets.s3.amazonaws.com/mobileApp/images/Pet-${props.petFullName}.png`}
            alt={props.petFullName}
            width={75}
            height={75}
          />
        </Col>
        <Col md={4}>
          <h3>{props.petFullName}</h3>
        </Col>
        <Col>
          <span>
            {[...Array(props.feedQuantity)].map((element, index) => (
              <Image
                key={index}
                src={`https://habitica-assets.s3.amazonaws.com/mobileApp/images/Pet_Food_${props.foodFullName}.png`}
                alt={props.petFullName}
                width={75}
                height={75}
              />
            ))}
          </span>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default PetFoodFeedRowListItem;
