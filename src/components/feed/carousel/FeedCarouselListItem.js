import { Col, Row, Image, Carousel, Spinner } from "react-bootstrap";

import { getFriendlyName } from "../../../logic/petFoodFeedFunctions";

const FeedCarouselListItem = (props) => {
  const feedQuantityBreakpoint = 9;

  const getFoodsArrayJsx = () => {
    if (props.feedQuantity > feedQuantityBreakpoint) {
      return (
        <>
          <span>
            <Image
              src={`https://habitica-assets.s3.amazonaws.com/mobileApp/images/Pet_Food_${props.foodFullName}.png`}
              alt={props.foodFullName}
              width={100}
              height={100}
            />
          </span>
          <span>x{props.feedQuantity}</span>
        </>
      );
    } else {
      return (
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
      );
    }
  };

  return (
    <Carousel.Item key={props.petFullName + props.foodFullName}>
      <br />
      <Row>
        <Col>
          <h3>{getFriendlyName(props.petFullName)}</h3>
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
          <>{getFoodsArrayJsx()}</>
        </Col>
      </Row>
      {!props.isFed && (
        <Row className="justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Row>
      )}
      <br />
    </Carousel.Item>
  );
};

export default FeedCarouselListItem;
