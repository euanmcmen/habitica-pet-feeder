import { Col, Row, Image, Carousel } from "react-bootstrap";

const PetFoodFeedCarouselListItem = (props) => {
  return (
    <Carousel.Item key={props.petFullName + props.foodFullName}>
      <Row>
        <Col>
          <h3>{props.petFullName}</h3>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={2}>
          <Row>
            <Col>
              <Image
                src={`https://habitica-assets.s3.amazonaws.com/mobileApp/images/Pet-${props.petFullName}.png`}
                alt={props.petFullName}
                width={100}
                height={100}
              />
            </Col>
          </Row>
        </Col>
        <Col>
          <>
            <span>
              {[...Array(props.feedQuantity)].map((_, index) => (
                <Image
                  key={index}
                  src={`https://habitica-assets.s3.amazonaws.com/mobileApp/images/Pet_Food_${props.foodFullName}.png`}
                  alt={props.foodFullName}
                  width={100}
                  height={100}
                />
              ))}
            </span>
          </>
        </Col>
      </Row>
    </Carousel.Item>
  );
};

export default PetFoodFeedCarouselListItem;
