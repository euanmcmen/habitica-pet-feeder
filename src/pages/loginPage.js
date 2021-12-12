import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

const LoginPage = (props) => {
  const onSubmit = (event) => {};

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formUserId">
          <Form.Label>User Id</Form.Label>
          <Form.Control type="text" placeholder="Enter Used Id..." />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formApiKey">
          <Form.Label>API Key</Form.Label>
          <Form.Control type="password" placeholder="Enter API key..." />
          <Form.Text className="text-muted">
            Your API Key will not be saved to any external database.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit" onSubmit={onSubmit}>
          Feed Pets
        </Button>
      </Form>

      {/* <Row>
        <Link
          className="button button-primary"
          to={ROUTE_CONSTANTS.FEED_PETS_PAGE}
        >
          Feed Pets
        </Link>
      </Row> */}
    </>
  );
};

export default LoginPage;
