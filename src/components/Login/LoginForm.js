import React from "react";
import { Form, Button } from "react-bootstrap";

const LoginForm = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();

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
      <Form onSubmit={handleSubmit}>
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

        <Button
          variant="primary"
          type="submit"
          disabled={props.shouldDisableButton}
        >
          Continue
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
