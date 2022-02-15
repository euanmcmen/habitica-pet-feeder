import { Card } from "react-bootstrap";

export const LoginInfo = () => {
  return (
    <Card border="info">
      <Card.Title>Info</Card.Title>
      <Card.Body>
        <p>
          Find your User Id and API Key on the Habitica website in the{" "}
          <a
            href="https://habitica.com/user/settings/api"
            target="_blank"
            rel="noreferrer"
          >
            Settings
          </a>{" "}
          page. Your API Key is not stored, and is only used for this stage of
          the app.
        </p>
        <p>
          Enter your details and press the button below to start feeding your
          pets!
        </p>
      </Card.Body>
    </Card>
  );
};
