import React from "react";
import { Button, Spinner } from "react-bootstrap";

const LoginFormButton = (props) => {
  return (
    <Button
      variant="primary"
      type="submit"
      disabled={props.shouldDisableButton}
    >
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
        hidden={!props.shouldDisableButton}
      />
      Log In
    </Button>
  );
};

export default LoginFormButton;
