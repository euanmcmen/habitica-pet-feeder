import { Col, Row, Image, Card } from "react-bootstrap";

const PetFeedRowCard = (props) => {
  return (
    <Card key={`${props.petFullName}+${props.foodFullName}`}>
      <Card.Body>
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
      </Card.Body>
    </Card>
  );
};

export default PetFeedRowCard;
