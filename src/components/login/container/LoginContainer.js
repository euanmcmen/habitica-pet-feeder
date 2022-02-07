import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { getAuthorizationTokenAsync } from "../../../client/apiClient";
import LoginForm from "../LoginForm";

const LoginContainer = (props) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLoginSubmit = (userId, apiKey) => {
    setIsLoggingIn(true);

    const authUser = {
      apiUserId: userId,
      apiUserKey: apiKey,
    };

    getAuthorizationTokenAsync(authUser)
      .then((token) => {
        props.onLoginSuccessful(token);
      })
      .catch((error) => {})
      .finally(() => {
        setIsLoggingIn(false);
      });
  };

  return (
    <>
      <Row>
        <Col>
          <LoginForm
            onLoginSubmit={handleLoginSubmit}
            shouldDisableForm={isLoggingIn}
          />
        </Col>
      </Row>
      {isLoggingIn && (
        <Row>
          <Col>
            <span>Logging in...</span>
          </Col>
        </Row>
      )}
    </>
  );
};

export default LoginContainer;
