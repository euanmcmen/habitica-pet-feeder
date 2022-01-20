import { Col, Row, ListGroup, Image } from "react-bootstrap";

const PetFoodFeedGroupedRowListItem = (props) => {
  const getVariantByFeedStatus = () => (props.willSatisfyPet ? "success" : "");

  return (
    <ListGroup.Item key={props.petFullName} variant={getVariantByFeedStatus()}>
      <Row>
        <Col>
          <span>{props.petFullName}</span>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={1}>
          <Row>
            <Col>
              <Image
                src={`https://habitica-assets.s3.amazonaws.com/mobileApp/images/Pet-${props.petFullName}.png`}
                alt={props.petFullName}
                width={50}
                height={50}
              />
            </Col>
          </Row>
        </Col>
        <Col>
          <ListGroup variant="flush">
            {props.petFoodFeeds.map((petFoodFeed, index) => (
              <ListGroup.Item key={index} variant={getVariantByFeedStatus()}>
                <span>
                  {[...Array(petFoodFeed.feedQuantity)].map((_, index) => (
                    <Image
                      key={index}
                      src={`https://habitica-assets.s3.amazonaws.com/mobileApp/images/Pet_Food_${petFoodFeed.foodFullName}.png`}
                      alt={petFoodFeed.foodFullName}
                      width={50}
                      height={50}
                    />
                  ))}
                </span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default PetFoodFeedGroupedRowListItem;
