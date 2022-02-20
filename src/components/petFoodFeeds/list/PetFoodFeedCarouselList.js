import { Col, Row, Carousel } from "react-bootstrap";
import PetFoodFeedCarouselListItem from "./PetFoodFeedCarouselListItem";

const PetFoodFeedCarouselList = (props) => {
  return (
    <>
      <Row>
        <Col>
          <Carousel
            indicators={false}
            variant="dark"
            activeIndex={props.petFoodFeedIndex}
          >
            {props.petFoodFeeds.map((petFoodFeed) =>
              PetFoodFeedCarouselListItem(petFoodFeed)
            )}
            <Carousel.Item>
              <Row>
                <Col>
                  <h3 style={{ textAlign: "center" }}>
                    All pets have been fed!
                  </h3>
                </Col>
              </Row>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </>
  );
};

export default PetFoodFeedCarouselList;
