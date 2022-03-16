import React from "react";
import { Row, Col } from "react-bootstrap";
import LoginForm from "../LoginForm";
import LoginInfo from "../../info/LoginInfo";

const LoginContainer = (props) => {
  const handleLoginSubmit = (userId, apiKey) => {
    const authUser = {
      apiUserId: userId,
      apiUserKey: apiKey,
    };

    props.onLoginSubmitSuccess(authUser);
  };

  return (
    <>
      <LoginInfo />
      <br />
      <Row>
        <Col>
          <LoginForm
            onLoginSubmit={handleLoginSubmit}
            shouldDisableForm={props.shouldDisableForm}
          />
        </Col>
      </Row>
    </>
  );
};

export default LoginContainer;
