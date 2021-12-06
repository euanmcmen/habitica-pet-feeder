import React from "react";
import { Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import ROUTE_CONSTANTS from "../routeConstants";

const LoginPage = () => {
  return (
    <>
      <Row>
        <Col>
          <h1 className="text-center">Habitica Pet Feeder - Login</h1>
        </Col>
      </Row>
      <Row>
        <InputGroup className="mb-3">
          <InputGroup.Text>Username</InputGroup.Text>
          <FormControl />
        </InputGroup>
      </Row>
      <Row>
        <InputGroup className="mb-3">
          <InputGroup.Text>API Key</InputGroup.Text>
          <FormControl />
        </InputGroup>
      </Row>
      <Row>
        <Link to={ROUTE_CONSTANTS.FEED_PETS_PAGE}>Feed Pets</Link>
      </Row>
    </>
  );
};

export default LoginPage;
