import { Col, Row, Carousel } from "react-bootstrap";
import FeedCarouselListItem from "./FeedCarouselListItem";

const FeedCarouselList = (props) => {
  return (
    <>
      <Row>
        <Col>
          <Carousel
            indicators={false}
            controls={false}
            variant="dark"
            activeIndex={props.petFoodFeedIndex}
          >
            {props.petFoodFeeds.map((petFoodFeed) =>
              FeedCarouselListItem(petFoodFeed)
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

export default FeedCarouselList;
