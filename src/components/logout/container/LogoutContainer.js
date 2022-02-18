import React from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import LogoutButton from "../LogoutButton";

const LogoutContainer = (props) => {
  const userName = useSelector((state) => state.apiConnection.userName);

  return (
    <Row className="align-items-top">
      <Col md={1}>
        <LogoutButton />
      </Col>

      {userName !== "" && (
        <Col>
          <h3>@{userName}</h3>
        </Col>
      )}
    </Row>
  );
};

export default LogoutContainer;
