import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { getAuthorizationTokenAsync } from "../../../client/apiClient";
import LoginForm from "../LoginForm";
import { setAuthToken } from "../../../slices/apiConnectionSlice";
import { LoginInfo } from "../../info/LoginInfo";

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
        setIsLoggingIn(false);
        dispatch(setAuthToken(token));
      })
      .catch((error) => {
        setIsLoggingIn(false);
      });
  };

  return (
    <>
      <LoginInfo />
      <br />
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
