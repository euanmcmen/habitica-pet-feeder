import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ROUTE_CONSTANTS from "../routeConstants";

const HomePage = () => {
  return (
    <>
      <Row>
        <Col>
          <h1 className="text-center">Welcome to my Habitica Pet Feeder</h1>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Link to={ROUTE_CONSTANTS.LOGIN_PAGE}>Log In</Link>
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
