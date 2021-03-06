import React, { useState } from "react";
import { Form } from "react-bootstrap";
import LoginFormButton from "./LoginFormButton";

const LoginForm = (props) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setValidated(true);

    if (event.currentTarget.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    var inputs = getFormInputs(event);
    props.onLoginSubmit(inputs.userId, inputs.apiKey);
  };

  const getFormInputs = (event) => {
    const eventTargetArray = [...event.target];

    return {
      userId: eventTargetArray.find((x) => x.id === "formUserId").value,
      apiKey: eventTargetArray.find((x) => x.id === "formApiKey").value,
    };
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUserId">
          <Form.Label>User Id</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Used Id..."
            disabled={props.shouldDisableForm}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your User Id.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formApiKey">
          <Form.Label>API Key</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter API key..."
            disabled={props.shouldDisableForm}
          />
          <Form.Text className="text-muted">
            Your API Key will not be saved to any external database.
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            Please enter your API Key.
          </Form.Control.Feedback>
        </Form.Group>

        <LoginFormButton shouldDisableButton={props.shouldDisableForm} />
      </Form>
    </>
  );
};

export default LoginForm;
