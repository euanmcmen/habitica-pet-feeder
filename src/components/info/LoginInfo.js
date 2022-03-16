import { Card } from "react-bootstrap";

const FetchInfo = () => {
  return (
    <Card border="info">
      <Card.Title>Info</Card.Title>
      <Card.Body>
        <p>
          This application uses your <strong>User ID</strong> and your{" "}
          <strong>API Key</strong> to communicate with Habitica on your behalf.
        </p>
        <p>
          Find this information on the Habitica website in the{" "}
          <a
            href="https://habitica.com/user/settings/api"
            target="_blank"
            rel="noreferrer"
          >
            Settings
          </a>{" "}
          page. Your API Key is not stored, and is only used for this stage of
          the application.
        </p>
        <p>
          Enter your User ID and API Key below, and press the button below to
          start feeding your pets!
        </p>
      </Card.Body>
    </Card>
  );
};

export default FetchInfo;
