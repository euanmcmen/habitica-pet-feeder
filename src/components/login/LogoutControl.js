import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";

import { clearApiConnection } from "../../slices/apiConnectionSlice";

import { clearPetFoodFeeds } from "../../slices/petFoodFeedSlice";

const LogoutControl = (props) => {
  const dispatch = useDispatch();

  const userName = useSelector((state) => state.apiConnection.userName);

  const handleLogoutButtonClick = (event) => {
    event.preventDefault();
    dispatch(clearApiConnection());
    dispatch(clearPetFoodFeeds());
  };

  return (
    <Row className="align-items-top">
      <Col md={1}>
        <Button
          variant="secondary"
          size="sm"
          style={{ textAlign: "left" }}
          onClick={handleLogoutButtonClick}
        >
          Log out
        </Button>
      </Col>
      <Col>
        <h3>Username</h3>
        <p>{userName}</p>
      </Col>
    </Row>
  );
};

export default LogoutControl;
