import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { getAuthorizationTokenAsync } from "../../../client/apiClient";
import LoginForm from "../LoginForm";
import { setAuthToken } from "../../../slices/loginSlice";

const LoginContainer = (props) => {
  const dispatch = useDispatch();

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLoginSubmit = (userId, apiKey) => {
    setIsLoggingIn(true);

    const authUser = {
      apiUserId: userId,
      apiUserKey: apiKey,
    };

    getAuthorizationTokenAsync(authUser)
      .then((token) => {
        dispatch(setAuthToken(token));
        // props.onLoginSuccessful(token);
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
